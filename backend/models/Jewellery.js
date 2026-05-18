const { DataTypes } =
  require("sequelize");

const sequelize =
  require("../config/db");

const Jewellery =
  sequelize.define(
    "Jewellery",
    {
      srNo: {
        type: DataTypes.STRING,
      },

      dlcNo: {
        type: DataTypes.STRING,
      },

      clientName: {
        type: DataTypes.STRING,
      },

      skuStNo: {
        type: DataTypes.STRING,

        unique: true,
      },

      item: {
        type: DataTypes.STRING,
      },

      metal: {
        type: DataTypes.STRING,
      },

      hsn: {
        type: DataTypes.STRING,
      },

      pcs: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.TEXT,
      },

      grossWeight: {
        type: DataTypes.FLOAT,
      },

      netWeight: {
        type: DataTypes.FLOAT,
      },

      metalValue: {
        type: DataTypes.FLOAT,
      },

      diamondWeight: {
        type: DataTypes.FLOAT,
      },

      diamondValue: {
        type: DataTypes.FLOAT,
      },

      csWeight: {
        type: DataTypes.FLOAT,
      },

      csValue: {
        type: DataTypes.FLOAT,
      },

      otherWeight: {
        type: DataTypes.FLOAT,
      },

      otherValue: {
        type: DataTypes.FLOAT,
      },

      labourValue: {
        type: DataTypes.FLOAT,
      },

      amount: {
        type: DataTypes.FLOAT,
      },

      image: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.STRING,

        defaultValue:
          "IN_STOCK",
      },

      // SENT DATE

      sentDate: {
        type: DataTypes.DATE,

        defaultValue:
          DataTypes.NOW,
      },

      // AUTO EXPIRY DATE
      // 6 months after sent date

      expiryDate: {
        type: DataTypes.DATE,
      },
    }
  );

module.exports = Jewellery;