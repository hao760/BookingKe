"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail_specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here - định danh các mối qhe
    }
  }
  Detail_specialty.init(
    {
      clinicId: DataTypes.STRING,
      specialtyId: DataTypes.STRING,
      treatmentMarkdown: DataTypes.TEXT,
      treatmentHTML: DataTypes.TEXT,
      strengthMarkdown: DataTypes.TEXT,
      strengthHTML: DataTypes.TEXT,
      serviceMarkdown: DataTypes.TEXT,
      serviceHTML: DataTypes.TEXT,
      examinationMarkdown: DataTypes.TEXT,
      examinationHTML: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Detail_specialty",
      freezeTableName: true,
    }
  );
  return Detail_specialty;
};
