import db from "../models/index";
import _ from "lodash";

exports.createPacketService = async (data) => {
  return await db.Packet_examination.create({
    title: data.title,
    price: data.price,
    clinicId: data.clinicId,
    contentHTML: data.contentHTML,
    contentMarkdown: data.contentMarkdown,
    image:data.image,
    typepacket:data.type
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
  return await db.Packet_examination.findAll(
  //   {
  //   where: { clinicId: null },
  // }
  )
    .then((result) => {
      console.log("get list specialty succeed");
      return {
        errCode: 0,
        message: "get list specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log("err",err)
      return {
        errCode: 1,
        message: "get list specialty failed",
      };
    });
};
