import handbookService from "../services/handbookService";

exports.createHandbook = async (req, res) => {
  const data = req.body;
  return await handbookService
    .createHandbookService(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookController.js ~ line 11 ~ exports.createHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getHandBook = async (req, res) => {
  const id = req.query.id;
  return await handbookService
    .getHandbookService(id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookController.js ~ line 30 ~ exports.getHandBook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getListHandBook = async (req, res) => {
  return await handbookService
    .getListHandbookService()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookController.js ~ line 48 ~ exports.getHandBook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
exports.updateHandbook = async (req, res) => {
  return await handbookService
    .updateHandbookService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookController.js ~ line 65 ~ exports.updateHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.deleteHandbook = async (req, res) => {
  return await handbookService
    .deleteHandbookService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookController.js ~ line 83 ~ exports.deleteHandbook ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getListNameHandbook = async (req, res) => {
  return await handbookService
    .getListNameHandbookService()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookController.js ~ line 102 ~ exports.getHandBookHome= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
