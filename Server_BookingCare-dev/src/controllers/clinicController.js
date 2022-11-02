import clinicService from "../services/clinicService";

exports.createClinic = async (req, res) => {
  return await clinicService
    .createClinicService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 12 ~ exports.createClinic=async ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getDetailClinic = async (req, res) => {
  return await clinicService
    .getDetailClinicService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("🚀 ~ file: clinicController.js ~ line 16 ~ err", err);
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.updateDetailClinic = async (req, res) => {
  return await clinicService
    .updateDetailClinicService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 43 ~ exports.updateDetailClinic= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.deleteClinic = async (req, res) => {
  return await clinicService
    .deleteClinicService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 61 ~ exports.deleteClinic ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getListClinic = async (req, res) => {
  return await clinicService
    .getListClinicService()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log("🚀 ~ file: clinicController.js ~ line 36 ~ err", err);
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getListClinicHome = async (req, res) => {
  return await clinicService
    .getListClinicHomeService()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 58 ~ exports.getListClinicHome= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getListDoctorClinic = async (req, res) => {
  return await clinicService
    .getListDoctorClinicService(req.query)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicController.js ~ line 78 ~ exports.getListDoctorClinic= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

