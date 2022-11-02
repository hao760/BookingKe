import detailClinicService from "../services/detailClinicService";

exports.createDetailClinic = async (req, res) => {
  return await detailClinicService
    .createDetailClinicService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 131 ~ exports.createDetailClinic= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getDetailClinic = async (req, res) => {
  return await detailClinicService
    .getDetailClinicService(req.query.id)
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
