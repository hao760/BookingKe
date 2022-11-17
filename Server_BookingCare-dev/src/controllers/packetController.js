import {
  createPacketService,
  getDetailPacketService,
  getAllPacketService,
  getPacketByDanhMucService,
  deletePacketService,
  updatePacketService,
} from "../services/packetService";

exports.createPacket = async (req, res) => {
  const data = req.body;
  if (
    !data.title ||
    !data.clinicId ||
    !data.price ||
    !data.type ||
    !data.image ||
    !data.contentHTML ||
    !data.contentMarkdown
  ) {
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
  let typepacket = req.query.typepacket;
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
  let id = req.params.id;
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

// deletePacket
exports.deletePacket = async (req, res) => {
  let id = req.query.id;
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await deletePacketService(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 30 ~ exports.getDetailHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

// updatePacket

exports.updatePacket = async (req, res) => {
  let data = req.body;
  if (
    !data.title ||
    !data.clinicId ||
    !data.price ||
    !data.type ||
    !data.image ||
    !data.contentHTML ||
    !data.contentMarkdown
  )
    return res.status(200).json({
      errCode: 1,
      message: "Missing parameter",
    });
  return await updatePacketService(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("🚀 ~ file: updatePacketService.js ~ line 65 ~", err);
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
