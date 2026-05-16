require("dotenv").config();

const express = require("express");

const multer = require("multer");

const XLSX = require("xlsx");

const fs = require("fs");

const path = require("path");

const mime = require("mime-types");

const {
  createClient,
} = require("@supabase/supabase-js");

const Jewellery = require("../models/Jewellery");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

const supabase =
  createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

router.post(
  "/",
  upload.single("file"),
  async (req, res) => {
    try {
      const workbook =
        XLSX.readFile(
          req.file.path
        );

      const sheetName =
        workbook.SheetNames[0];

      const data =
        XLSX.utils.sheet_to_json(
          workbook.Sheets[
            sheetName
          ]
        );

      console.log(
        "HEADERS:",
        Object.keys(data[0])
      );

      for (const row of data) {
        const cleanedRow = {};

        Object.keys(row).forEach(
          (key) => {
            cleanedRow[
              key.trim()
            ] = row[key];
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

        const existing =
          await Jewellery.findOne({
            where: {
              skuStNo:
                cleanedRow[
                  "SKU/St.No"
                ],
            },
          });

        if (existing)
          continue;

        const sku =
          String(
            cleanedRow[
              "SKU/St.No"
            ]
          )
            .split("/")[0]
            .trim();

        const imageFolder =
          path.join(
            __dirname,
            "../jewellery-images"
          );

        let imageUrl = "";

        const possibleExtensions =
          [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
          ];

        let foundImage =
          null;

        for (const ext of possibleExtensions) {
          const imagePath =
            path.join(
              imageFolder,
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

        if (foundImage) {
          const fileBuffer =
            fs.readFileSync(
              foundImage
            );

          const fileName = `${sku}-${Date.now()}.${foundImage
            .split(".")
            .pop()}`;

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

          if (!error) {
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

        await Jewellery.create({
          srNo:
            cleanedRow[
              "SrNo"
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

          image: imageUrl,

          status:
            "IN_STOCK",

          // AUTO TRACK OUT DATE

          outDate:
            new Date(),
        });
      }

      res.json({
        message:
          "Import Successful",
      });
    } catch (error) {
      console.log(
        "FULL IMPORT ERROR:"
      );

      console.log(error);

      res.status(500).json({
        error:
          error.message ||
          "Import Failed",
      });
    }
  }
);

module.exports = router;