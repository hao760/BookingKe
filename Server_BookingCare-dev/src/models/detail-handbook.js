"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Detail_handbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here - định danh các mối qhe
    }
  }
  Detail_handbook.init(
    {
      handbookId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      note: DataTypes.STRING,
      description: DataTypes.STRING,
      contentMarkdown: DataTypes.TEXT,
      contentHTML: DataTypes.TEXT,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Detail_handbook",
      freezeTableName: true,
    }
  );
  return Detail_handbook;
};
