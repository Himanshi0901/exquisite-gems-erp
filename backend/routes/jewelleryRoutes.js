require("dotenv").config();

const express = require("express");

const multer = require("multer");

const fs = require("fs");

const mime = require("mime-types");

const {
  createClient,
} = require("@supabase/supabase-js");

const Jewellery =
  require("../models/Jewellery");

const router =
  express.Router();

const upload = multer({
  dest: "uploads/",
});

const supabase =
  createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

router.get(
  "/",
  async (req, res) => {
    try {
      const items =
        await Jewellery.findAll({
          order: [
            ["srNo", "ASC"],
          ],
        });

      res.json(items);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Failed to fetch jewellery items",
      });
    }
  }
);

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {
    try {
      let imageUrl = "";

      if (req.file) {
        const fileBuffer =
          fs.readFileSync(
            req.file.path
          );

        const fileName = `${Date.now()}-${
          req.file.originalname
        }`;

        const { error } =
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
                    req.file.originalname
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
        }
      }

      /* DLC DATE */

      const dlcDate =
        new Date();

      /* EXPIRY DATE */

      const expiryDate =
        new Date();

      expiryDate.setMonth(
        expiryDate.getMonth() +
          6
      );

      const item =
        await Jewellery.create({
          ...req.body,

          image: imageUrl,

          dlcDate,

          expiryDate,
        });

      res.json(item);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Failed to create jewellery item",
      });
    }
  }
);

router.delete(
  "/:id",
  async (req, res) => {
    try {
      await Jewellery.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.json({
        message:
          "Deleted successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Delete failed",
      });
    }
  }
);

router.patch(
  "/:id/dubai",
  async (req, res) => {
    try {
      const today =
        new Date();

      const expiryDate =
        new Date();

      expiryDate.setMonth(
        expiryDate.getMonth() +
          6
      );

      await Jewellery.update(
        {
          status:
            "IN_DUBAI",

          dlcDate:
            today,

          expiryDate:
            expiryDate,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.json({
        message:
          "Sent to Dubai",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Update failed",
      });
    }
  }
);

router.patch(
  "/:id/sold",
  async (req, res) => {
    try {
      await Jewellery.update(
        {
          status: "SOLD",

          soldDate:
            new Date(),
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.json({
        message:
          "Marked as sold",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Update failed",
      });
    }
  }
);

router.patch(
  "/:id/returned",
  async (req, res) => {
    try {
      await Jewellery.update(
        {
          status:
            "RETURNED",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.json({
        message:
          "Marked as returned",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        error:
          "Update failed",
      });
    }
  }
);

module.exports = router;