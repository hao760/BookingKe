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
