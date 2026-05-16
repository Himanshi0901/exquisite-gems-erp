const axios = require("axios");

const fs = require("fs");

const path = require("path");

const { v4: uuidv4 } =
  require("uuid");

const {
  createClient,
} = require("@supabase/supabase-js");

const Jewellery = require(
  "./models/Jewellery"
);

const sequelize = require(
  "./config/db"
);

const supabase =
  createClient(
    "https://vrrysszcawxuwyarzljv.supabase.co",
    "sb_publishable_XYkSkZBBdWiqgPkv9qc52A_68wbbrHB"
  );

const migrateImages =
  async () => {
    try {
      await sequelize.authenticate();

      console.log(
        "Database Connected"
      );

      const items =
        await Jewellery.findAll();

      for (const item of items) {
        if (!item.image)
          continue;

        try {
          console.log(
            `Migrating ${item.itemCode}`
          );

          const response =
            await axios({
              url: item.image,
              method: "GET",
              responseType:
                "arraybuffer",
            });

          const fileName = `${uuidv4()}.jpg`;

          const tempPath =
            path.join(
              __dirname,
              "temp.jpg"
            );

          fs.writeFileSync(
            tempPath,
            response.data
          );

          const fileBuffer =
            fs.readFileSync(
              tempPath
            );

          const { data, error } =
            await supabase.storage
              .from("jewellery-images")
              .upload(
                fileName,
                fileBuffer,
                {
                  contentType:
                    "image/jpeg",
                }
              );

          if (error) {
            console.log(error);

            continue;
          }

          const {
            data: publicUrlData,
          } =
            supabase.storage
              .from(
                "jewellery-images"
              )
              .getPublicUrl(
                fileName
              );

          await item.update({
            image:
              publicUrlData.publicUrl,
          });

          console.log(
            `Updated ${item.itemCode}`
          );
        } catch (err) {
          console.log(
            `Failed for ${item.itemCode}`
          );

          console.log(err.message);
        }
      }

      console.log(
        "Migration Completed"
      );

      process.exit();
    } catch (error) {
      console.log(error);
    }
  };

migrateImages();