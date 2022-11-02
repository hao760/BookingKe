import specialtyService from "../services/specialtyService";

exports.createSpecialty = async (req, res) => {
  const data = req.body;
  return await specialtyService
    .createSpecialtyService(data)
    .then((result) => {
      console.log("create specialty");
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 11 ~ exports.createSpecialty= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getSpecialties = async (req, res) => {
  return await specialtyService
    .getSpecialtiesService()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 32 ~ exports.getSpecialty= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getListSpecialty = async (req, res) => {
  return await specialtyService
    .getListSpecialtyService()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 51 ~ exports.getListSpecialty= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getSpecialty = async (req, res) => {
  return await specialtyService
    .getDetailSpecialtyService(req.query.specialtyId)
    .then((result) => {
      console.log("get specialty");
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 72 ~ exports.getDetailSpecialty= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getDoctorSpecialty = async (req, res) => {
  return await specialtyService
    .getDoctorSpecialtyService(req.query)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 90 ~ exports.getDoctorSpecialty= ~ e",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getListSpecialtyByClinicId = async (req, res) => {
  return await specialtyService
    .getListSpecialtyByClinicIdService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 108 ~ exports.getListSpecialtyByClinicId= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.deleteSpecialty = async (req, res) => {
  return await specialtyService
    .deleteSpecialtyService(req.query.id)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 125 ~ exports.deleteSpecialty ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.updateSpecialty = async (req, res) => {
  return await specialtyService
    .updateSpecialtyService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyController.js ~ line 144 ~ exports.updateSpecialty= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
