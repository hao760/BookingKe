import db from "../models/index";
import _ from "lodash";

exports.createPacketService = async (data) => {
  return await db.Packet_examination.create({
    title: data.title,
    price: data.price,
    clinicId: data.clinicId,
    contentHTML: data.contentHTML,
    contentMarkdown: data.contentMarkdown,
    image: data.image,
    typepacket: data.type,
    description: data.description,
  })
    .then(() => {
      return {
        errCode: 0,
        message: "Ok",
      };
    })
    .catch((err) => err);
};

exports.getAllPacketService = async () => {
  return await db.Packet_examination
    .findAll()
    //   {
    //   where: { clinicId: null },
    // }
    .then((result) => {
      console.log("get list specialty succeed");
      return {
        errCode: 0,
        message: "get list specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log("err", err);
      return {
        errCode: 1,
        message: "get list specialty failed",
      };
    });
};
// getPacketByDanhMucService(typepacket
exports.getPacketByDanhMucService = async (typepacket) => {
  return await db.Packet_examination.findAll({
    where: { typepacket: typepacket },
  })
    .then((result) => {
      console.log("get list specialty succeed");
      return {
        errCode: 0,
        message: "get list specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log("err", err);
      return {
        errCode: 1,
        message: "get list specialty failed",
      };
    });
};

exports.getDetailPacketService = async (id) => {
  if (!id)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Packet_examination.findOne({
    where: { id: id },
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get Packet_examination succeed",
        data: result ? result : {},
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: Packet_examination.js ~ line 48 ~ exports.Packet_examination= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get Packet_examination failed",
      };
    });
};

exports.deletePacketService = async (id) => {
  return await db.Packet_examination.destroy({ where: { id: id } })
    .then(() => {
      return {
        errCode: 0,
        message: "delete packet succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: packet.js ~ line 101 ~ exports.packet ~ err",
        err
      );
      return {
        errCode: 1,
        message: "delete packet  failed",
      };
    });
};

exports.updatePacketService = async (data) => {
  return await db.Packet_examination.update(
    {
      title: data.title,
      price: data.price,
      clinicId: data.clinicId,
      contentHTML: data.contentHTML,
      contentMarkdown: data.contentMarkdown,
      title:data.title,
      image:data.image,
      typepacket: data.type,
      description: data.description,
    },
    { where: { id: data.id } }
  )
    .then((result) => {
      return {
        errCode: 0,
        message: "update Packet succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: Packet.js ~ line 98 ~ exports.Packet= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "update Packet failed",
      };
    });
};
