import detailSpecialtyService from "../services/detailSpecialtyService";

exports.createDetailSpecialty = async (req, res) => {
  return await detailSpecialtyService
    .createDetailSpecialtyService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailSpecialtyController.js ~ line 12 ~ exports.createDetailSpecialty= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
exports.getDetailSpecialty = async (req, res) => {
  return await detailSpecialtyService
    .getDetailSpecialtyService(req.query.specialtyId)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailSpecialtyController.js ~ line 27 ~ exports.getDetailSpecialty= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

