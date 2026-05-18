require("dotenv").config();

const express = require("express");

const multer = require("multer");

const XLSX = require("xlsx");

const fs = require("fs");

const path = require("path");

const mime = require("mime-types");

const AdmZip =
  require("adm-zip");

const {
  createClient,
} = require("@supabase/supabase-js");

const Jewellery =
  require("../models/Jewellery");

const router =
  express.Router();

const upload = multer({
  dest: "temp/",
});

const supabase =
  createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

router.post(
  "/",

  upload.fields([
    {
      name: "excel",
      maxCount: 1,
    },

    {
      name: "zip",
      maxCount: 1,
    },

    {
      name: "images",
      maxCount: 500,
    },
  ]),

  async (req, res) => {
    try {
      const excelFile =
        req.files[
          "excel"
        ]?.[0];

      const zipFile =
        req.files[
          "zip"
        ]?.[0];

      const imageFiles =
        req.files[
          "images"
        ] || [];

      if (!excelFile) {
        return res
          .status(400)
          .json({
            error:
              "Excel file is required",
          });
      }

      const workbook =
        XLSX.readFile(
          excelFile.path
        );

      const sheetName =
        workbook.SheetNames[0];

      const data =
        XLSX.utils.sheet_to_json(
          workbook.Sheets[
            sheetName
          ]
        );

      /* ---------------- TEMP IMAGE FOLDER ---------------- */

      const extractPath =
        path.join(
          __dirname,
          "../temp/images"
        );

      if (
        !fs.existsSync(
          extractPath
        )
      ) {
        fs.mkdirSync(
          extractPath,
          {
            recursive: true,
          }
        );
      }

      /* ---------------- ZIP EXTRACTION ---------------- */

      if (zipFile) {
        const zip =
          new AdmZip(
            zipFile.path
          );

        zip.extractAllTo(
          extractPath,
          true
        );
      }

      /* ---------------- MANUAL IMAGE COPY ---------------- */

      for (const image of imageFiles) {
        const targetPath =
          path.join(
            extractPath,
            image.originalname
          );

        fs.copyFileSync(
          image.path,
          targetPath
        );
      }

      console.log(
        "HEADERS:",
        Object.keys(
          data[0] || {}
        )
      );

      /* ---------------- EXISTING SKU CACHE ---------------- */

      const existingItems =
        await Jewellery.findAll(
          {
            attributes: [
              "skuStNo",
            ],
          }
        );

      const existingSkuSet =
        new Set(
          existingItems.map(
            (i) =>
              i.skuStNo
          )
        );

      /* ---------------- IMPORT LOOP ---------------- */

      for (const row of data) {
        const cleanedRow =
          {};

        Object.keys(
          row
        ).forEach(
          (key) => {
            cleanedRow[
              key.trim()
            ] =
              row[key];
          }
        );

        if (
          !cleanedRow[
            "SKU/St.No"
          ]
        ) {
          console.log(
            "Missing SKU:",
            cleanedRow
          );

          continue;
        }

        if (
          existingSkuSet.has(
            cleanedRow[
              "SKU/St.No"
            ]
          )
        ) {
          continue;
        }

        const sku =
          String(
            cleanedRow[
              "SKU/St.No"
            ]
          )
            .split("/")[0]
            .trim();

        let imageUrl =
          "";

        const possibleExtensions =
          [
            ".jpg",
            ".jpeg",
            ".png",
          ];

        let foundImage =
          null;

        for (const ext of possibleExtensions) {
          const imagePath =
            path.join(
              extractPath,
              `${sku}${ext}`
            );

          if (
            fs.existsSync(
              imagePath
            )
          ) {
            foundImage =
              imagePath;

            break;
          }
        }

        /* ---------------- IMAGE UPLOAD ---------------- */

        if (
          foundImage
        ) {
          const fileBuffer =
            fs.readFileSync(
              foundImage
            );

          const extension =
            foundImage
              .split(".")
              .pop();

          const fileName = `${sku}-${Date.now()}.${extension}`;

          const {
            error,
          } =
            await supabase.storage
              .from(
                "jewellery-images"
              )
              .upload(
                fileName,
                fileBuffer,
                {
                  contentType:
                    mime.lookup(
                      foundImage
                    ),
                }
              );

          if (
            !error
          ) {
            const {
              data:
                publicUrlData,
            } =
              supabase.storage
                .from(
                  "jewellery-images"
                )
                .getPublicUrl(
                  fileName
                );

            imageUrl =
              publicUrlData.publicUrl;
          } else {
            console.log(
              "SUPABASE ERROR:",
              error
            );
          }
        } else {
          console.log(
            `Image not found for SKU: ${sku}`
          );
        }

        /* ---------------- DATES ---------------- */

        const sentDate =
          new Date();

        const expiryDate =
          new Date();

        expiryDate.setMonth(
          expiryDate.getMonth() +
            6
        );

        /* ---------------- SAVE ---------------- */

        await Jewellery.create(
          {
            srNo:
              cleanedRow[
                "SrNo"
              ],

            dlcNo:
              cleanedRow[
                "DLC No."
              ],

            clientName:
              cleanedRow[
                "Client Name"
              ],

            skuStNo:
              cleanedRow[
                "SKU/St.No"
              ],

            item:
              cleanedRow[
                "Item"
              ],

            metal:
              cleanedRow[
                "Metal"
              ],

            hsn:
              cleanedRow[
                "HSN"
              ],

            pcs:
              cleanedRow[
                "Pcs/Pair"
              ],

            description:
              cleanedRow[
                "Description"
              ],

            grossWeight:
              cleanedRow[
                "G-Wt"
              ],

            netWeight:
              cleanedRow[
                "N-Wt"
              ],

            metalValue:
              cleanedRow[
                "Mt Value"
              ],

            diamondWeight:
              cleanedRow[
                "Diam Wt"
              ],

            diamondValue:
              cleanedRow[
                "Diam Value"
              ],

            csWeight:
              cleanedRow[
                "CS Wt"
              ],

            csValue:
              cleanedRow[
                "CS Value"
              ],

            otherWeight:
              cleanedRow[
                "Oth Wt"
              ],

            otherValue:
              cleanedRow[
                "Oth Val"
              ],

            labourValue:
              cleanedRow[
                "Labour & Value Addition"
              ],

            amount:
              cleanedRow[
                "Amount"
              ],

            image:
              imageUrl,

            status:
              "IN_STOCK",

            sentDate,

            expiryDate,
          }
        );
      }

      /* ---------------- CLEANUP ---------------- */

      fs.rmSync(
        extractPath,
        {
          recursive: true,
          force: true,
        }
      );

      if (
        excelFile?.path &&
        fs.existsSync(
          excelFile.path
        )
      ) {
        fs.unlinkSync(
          excelFile.path
        );
      }

      if (
        zipFile?.path &&
        fs.existsSync(
          zipFile.path
        )
      ) {
        fs.unlinkSync(
          zipFile.path
        );
      }

      imageFiles.forEach(
        (file) => {
          if (
            fs.existsSync(
              file.path
            )
          ) {
            fs.unlinkSync(
              file.path
            );
          }
        }
      );

      res.json({
        message:
          "Import Successful",
      });
    } catch (error) {
      console.log(
        "FULL IMPORT ERROR:"
      );

      console.log(
        error
      );

      res.status(500).json(
        {
          error:
            error.message ||
            "Import Failed",
        }
      );
    }
  }
);

module.exports =
  router;