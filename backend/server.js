const express =
  require("express");

const cors =
  require("cors");

const importRoutes =
  require("./routes/importRoutes");

require("dotenv").config();

const sequelize =
  require("./config/db");

const Jewellery =
  require("./models/Jewellery");

const User =
  require("./models/User");

const jewelleryRoutes =
  require("./routes/jewelleryRoutes");

const authRoutes =
  require("./routes/authRoutes");

const startDubaiTracker =
  require(
    "./cron/dubaiTracker"
  );

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/jewellery",
  jewelleryRoutes
);

app.use(
  "/api/import",
  importRoutes
);

app.use(
  "/api/auth",
  authRoutes
);

app.get("/", (req, res) => {
  res.send(
    "Jewellery API Running"
  );
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Database Connected"
    );

    return sequelize.sync();
  })

  .then(() => {
    console.log(
      "Models Synced"
    );
  })

  .catch((err) => {
    console.log(err);
  });

const PORT =
  process.env.PORT ||
  5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );

  startDubaiTracker();
});