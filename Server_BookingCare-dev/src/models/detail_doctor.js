"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail_doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Detail_doctor.belongsTo(models.User, { foreignKey: "doctorId" });
      // Detail_doctor.hasOne(models.Doctor_Info, { foreignKey: "doctorId" });
    }
  }
  Detail_doctor.init(
    {
      doctorId: DataTypes.INTEGER,
      detailHTML: DataTypes.TEXT("long"),
      detailMarkdown: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Detail_doctor",
      freezeTableName: true,
    }
  );
  return Detail_doctor;
};
