"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class detail_clinic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here - định danh các mối qhe
    }
  }
  detail_clinic.init(
    {
      clinicId: DataTypes.STRING,
      bookingMarkdown: DataTypes.TEXT,
      bookingHTML: DataTypes.TEXT,
      strengthMarkdown: DataTypes.TEXT,
      strengthHTML: DataTypes.TEXT,
      equipmentMarkdown: DataTypes.TEXT,
      equipmentHTML: DataTypes.TEXT,
      serviceMarkdown: DataTypes.TEXT,
      serviceHTML: DataTypes.TEXT,
      locationMarkdown: DataTypes.TEXT,
      locationHTML: DataTypes.TEXT,
      examinationMarkdown: DataTypes.TEXT,
      examinationHTML: DataTypes.TEXT,
      noteHTML: DataTypes.TEXT,
      noteMarkdown: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "detail_clinic",
      freezeTableName: true,
    }
  );
  return detail_clinic;
};
