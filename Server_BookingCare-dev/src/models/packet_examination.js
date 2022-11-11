"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Packet_examination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
    }
  }
  Packet_examination.init(
    {
      title: DataTypes.STRING,
      contentMarkdown: DataTypes.TEXT("long"),
      contentHTML: DataTypes.TEXT("long"),
      price: DataTypes.STRING,
      clinicId: DataTypes.STRING,
      image: DataTypes.TEXT("long"),
      typepacket:DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Packet_examination",
      freezeTableName: true,
    }
  );
  return Packet_examination;
};
