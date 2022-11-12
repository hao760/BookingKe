import { createPacketService ,getDetailPacketService,getAllPacketService,getPacketByDanhMucService} from "../services/packetService";

exports.createPacket = async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing parameter",
    });
  }
  return await createPacketService(data)
    .then((result) => {
      console.log("result", result);
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("err", err);
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};


exports.getAllPacket = async (req, res) => {
  return await getAllPacketService()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 149 ~ exports.getDetailClinic= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getPacketByDanhMuc = async (req, res) => {
  let typepacket=req.query.typepacket;
  return await getPacketByDanhMucService(typepacket)
    .then((result) => {
      // console.log("data==============",result)
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 149 ~ exports.getDetailClinic= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getDetailPacket = async (req, res) => {
  let id=req.params.id;
  return await getDetailPacketService(id)
    .then((result) => {
      // console.log("data==============",result)
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 149 ~ exports.getDetailClinic= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};