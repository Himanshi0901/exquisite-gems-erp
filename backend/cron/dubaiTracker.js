const cron = require("node-cron");

const Jewellery = require(
  "../models/Jewellery"
);

const startDubaiTracker = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log(
      "Running Dubai expiry check..."
    );

    try {
      const today = new Date();

      const dubaiItems =
        await Jewellery.findAll({
          where: {
            status: "IN_DUBAI",
          },
        });

      for (const item of dubaiItems) {
        if (!item.returnDeadline)
          continue;

        const deadline =
          new Date(
            item.returnDeadline
          );

        const diffTime =
          deadline - today;

        const daysLeft =
          Math.ceil(
            diffTime /
              (1000 *
                60 *
                60 *
                24)
          );

        if (daysLeft <= 0) {
          await item.update({
            status: "EXPIRED",
          });

          console.log(
            `${item.itemCode} marked EXPIRED`
          );
        }

        else if (
          daysLeft <= 5
        ) {
          console.log(
            `WARNING: ${item.itemCode} expires in ${daysLeft} days`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports =
  startDubaiTracker;