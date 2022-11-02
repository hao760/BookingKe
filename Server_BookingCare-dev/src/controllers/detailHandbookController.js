import detailHandbookService from "../services/detailHandbookService";

exports.createDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .createDetailHandbookService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 11 ~ exports.createDetailHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.updateDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .updateDetailHandbookService(req.body)
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

exports.deleteDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .deleteDetailHandbookService(req.query.id)
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

exports.getDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .getDetailHandbookService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 64 ~ exports.getDetailHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
exports.getListDetailHandbook = async (req, res) => {
  return await detailHandbookService
    .getListDetailHandbookService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 81 ~ exports.getListDetailHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getHandBookHome = async (req, res) => {
  return await detailHandbookService
    .getHandBookHomeService()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 99 ~ exports.getHandBookHome= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getRelatedHandbook = async (req, res) => {
  return await detailHandbookService
    .getRelatedHandbookService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookController.js ~ line 118 ~ exports.getRelatedHandbook= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
