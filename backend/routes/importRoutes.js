require("dotenv").config();

const express =
  require("express");

const multer =
  require("multer");

const XLSX =
  require("xlsx");

const fs =
  require("fs");

const path =
  require("path");

const mime =
  require("mime-types");

const {
  createClient,
} = require("@supabase/supabase-js");

const Jewellery =
  require("../models/Jewellery");

const router =
  express.Router();

const upload =
  multer({
    dest: "temp/",
  });

const supabase =
  createClient(
    process.env
      .SUPABASE_URL,
    process.env
      .SUPABASE_KEY
  );

router.post(
  "/",

  upload.fields([
    {
      name: "excel",
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

      const imageFiles =
        req.files[
          "images"
        ] || [];

      const {
        clientName,
        dlcNo,
        dlcDate,
      } = req.body;

      /* REQUIRED VALIDATION */

      if (
        !clientName ||
        !dlcNo ||
        !dlcDate
      ) {
        return res
          .status(400)
          .json({
            error:
              "Client Name, DLC No and DLC Date are required",
          });
      }

      if (!excelFile) {
        return res
          .status(400)
          .json({
            error:
              "Excel file is required",
          });
      }

      if (
        imageFiles.length ===
        0
      ) {
        return res
          .status(400)
          .json({
            error:
              "Images are required",
          });
      }

      /* EXPIRY DATE */

      const expiryDate =
        new Date(
          dlcDate
        );

      expiryDate.setMonth(
        expiryDate.getMonth() +
          6
      );

      /* READ EXCEL */

      const workbook =
        XLSX.readFile(
          excelFile.path
        );

      const sheetName =
        workbook.SheetNames[0];

      const worksheet =
        workbook.Sheets[
          sheetName
        ];

      /* AUTO DETECT HEADER ROW */

      const allRows =
        XLSX.utils.sheet_to_json(
          worksheet,
          {
            header: 1,
          }
        );

      let headerRowIndex =
        -1;

      for (
        let i = 0;
        i <
        allRows.length;
        i++
      ) {
        const row =
          allRows[i].map(
            (cell) =>
              String(cell)
                .trim()
          );

        if (
          row.includes(
            "SKU/St.No"
          )
        ) {
          headerRowIndex =
            i;

          break;
        }
      }

      if (
        headerRowIndex ===
        -1
      ) {
        return res
          .status(400)
          .json({
            error:
              "Could not detect Excel header row.",
          });
      }

      /* GET HEADERS */

      const headers =
        allRows[
          headerRowIndex
        ].map((h) =>
          String(h)
            .replace(
              /\n/g,
              ""
            )
            .replace(
              /\r/g,
              ""
            )
            .replace(
              /\s+/g,
              " "
            )
            .trim()
        );

      /* GET DATA */

      const rawData =
        XLSX.utils.sheet_to_json(
          worksheet,
          {
            header: 1,

            range:
              headerRowIndex +
              1,

            defval: "",
          }
        );

      const data =
        rawData.map(
          (rowArray) => {
            const rowObj =
              {};

            headers.forEach(
              (
                header,
                index
              ) => {
                rowObj[
                  header
                ] =
                  rowArray[
                    index
                  ];
              }
            );

            return rowObj;
          }
        );

      if (
        !data ||
        data.length === 0
      ) {
        return res
          .status(400)
          .json({
            error:
              "Excel file is empty",
          });
      }

      /* REQUIRED COLUMNS */

      const requiredColumns =
        [
          "SrNo",
          "SKU/St.No",
          "Item",
          "Metal",
          "HSN",
          "Pcs/Pair",
          "Description",

          "G-Wt",
          "N-Wt",
          "Mt Value",

          "Diam Wt",
          "Diam Value",

          "CS Wt",
          "CS Value",

          "Oth Wt",
          "Oth Val",

          "Labour & Value Addition",

          "Amount",

          "Image",
        ];

      const missingColumns =
        requiredColumns.filter(
          (col) =>
            !headers.includes(
              col
            )
        );

      if (
        missingColumns.length >
        0
      ) {
        return res
          .status(400)
          .json({
            error:
              "Invalid Excel Format. Please use sample format.",
          });
      }

      /* TEMP IMAGE FOLDER */

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

      /* COPY IMAGES */

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

      /* GET ALL EXISTING ITEMS */

      const allExistingItems =
        await Jewellery.findAll({
          attributes: [
            "skuStNo",
            "image",
          ],
        });

      /* IMPORT LOOP */

      for (const row of data) {
        const cleanedRow =
          row;

        /* SKIP TOTAL ROW */

        const skuValue =
          cleanedRow[
            "SKU/St.No"
          ];

        if (
          !skuValue ||
          String(
            skuValue
          )
            .toUpperCase()
            .includes(
              "TOTAL"
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

        /* CHECK EXISTING SKU IMAGE */

        const matchedItem =
          allExistingItems.find(
            (item) => {
              const existingSku =
                String(
                  item.skuStNo
                )
                  .split(
                    "/"
                  )[0]
                  .trim();

              return (
                existingSku ===
                  sku &&
                item.image
              );
            }
          );

        if (
          matchedItem?.image
        ) {
          imageUrl =
            matchedItem.image;
        }

        /* FIND LOCAL IMAGE */

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

        /* IMAGE UPLOAD */

        if (
          foundImage &&
          !imageUrl
        ) {
          const fileBuffer =
            fs.readFileSync(
              foundImage
            );

          const extension =
            foundImage
              .split(".")
              .pop();

          const fileName =
            `${sku}-${Date.now()}.${extension}`;

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
          }
        }

        /* SAVE */

        await Jewellery.create({
          srNo:
            cleanedRow[
              "SrNo"
            ],

          dlcNo:
            dlcNo,

          clientName:
            clientName,

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
            Number(
              cleanedRow[
                "G-Wt"
              ] || 0
            ).toFixed(3),

          netWeight:
            Number(
              cleanedRow[
                "N-Wt"
              ] || 0
            ).toFixed(3),

          metalValue:
            Number(
              cleanedRow[
                "Mt Value"
              ] || 0
            ).toFixed(2),

          diamondWeight:
            Number(
              cleanedRow[
                "Diam Wt"
              ] || 0
            ).toFixed(3),

          diamondValue:
            Number(
              cleanedRow[
                "Diam Value"
              ] || 0
            ).toFixed(2),

          csWeight:
            Number(
              cleanedRow[
                "CS Wt"
              ] || 0
            ).toFixed(3),

          csValue:
            Number(
              cleanedRow[
                "CS Value"
              ] || 0
            ).toFixed(2),

          otherWeight:
            Number(
              cleanedRow[
                "Oth Wt"
              ] || 0
            ).toFixed(3),

          otherValue:
            Number(
              cleanedRow[
                "Oth Val"
              ] || 0
            ).toFixed(2),

          labourValue:
            Number(
              cleanedRow[
                "Labour & Value Addition"
              ] || 0
            ).toFixed(2),

          amount:
            Number(
              cleanedRow[
                "Amount"
              ] || 0
            ).toFixed(2),

          image:
            imageUrl,

          status:
            "IN_STOCK",

          dlcDate:
            dlcDate,

          expiryDate:
            expiryDate,
        });
      }

      /* CLEANUP */

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
      console.log(error);

      res.status(500).json({
        error:
          error.message ||
          "Import Failed",
      });
    }
  }
);

module.exports =
  router;