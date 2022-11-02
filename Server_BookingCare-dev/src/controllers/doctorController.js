import doctorService from "../services/doctorService";

exports.getTopDoctorHome = async (req, res) => {
  let limit = req.body.limit;
  if (!limit) limit = 10;
  try {
    const doctors = await doctorService.getTopDoctorHomeService(+limit);
    return res.status(200).json(doctors);
  } catch (error) {
    console.log("🚀 ~ file: doctorController.js ~ line 10 ~ exports.getTopDoctorHome= ~ error", error)
    return res.status(200).json({
      errCode: -1,
      message: "error from server",
    });
  }
};

exports.getAllDoctor = async (req, res) => {
  try {
    const data = await doctorService.getAllDoctorService();
    console.log("get all doctor from sever");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "error from sever",
    });
  }
};

exports.postInfoDoctor = async (req, res) => {
  try {
    const response = await doctorService.saveDetailDoctorService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      message: "error from sever",
    });
  }
};

exports.postSubInfoDoctor = async (req, res) => {
  const data = req.body;
  return await doctorService
    .saveSubDetailDoctorService(data)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch(() => {
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.getDetailDoctor = async (req, res) => {
  const id = req.query.id;
  if (!id)
    return res.status(200).json({
      errCode: 1,
      message: "Missing parameter",
    });
  else {
    await doctorService
      .getDetaiDoctorService(id)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch(() => {
        return res.status(200).json({
          errCode: -1,
          message: "error from sever",
        });
      });
  }
};

exports.bulkCreateSchedule = async (req, res) => {
  const data = req.body;
  if (!data)
    return res.status(200).json({
      errCode: 1,
      message: "Missing parameter",
    });
  else {
    return await doctorService
      .postBulkCreateScheduleService(data.result, data.doctorId, data.date)
      .then((result) => {
        console.log("create bulk schedule doctor time");
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: doctorController.js ~ line 89 ~ exports.bulkCreateSchedule= ~ err",
          err
        );
        return res.status(200).json({
          errCode: -1,
          message: "error from sever",
        });
      });
  }
};

exports.getSchedule = async (req, res) => {
  const { doctorId, date } = req.query;
  if (!doctorId || !date) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing parameter",
    });
  } else {
    return await doctorService
      .getScheduleService(doctorId, date)
      .then((result) => {
        console.log("get schedule by doctor id & date succeed");
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: doctorController.js ~ line 117 ~ exports.getSchedule= ~ err",
          err
        );
        return res.status(200).json({
          errCode: -1,
          message: "error from sever",
        });
      });
  }
};

exports.getExtraInfoDoctor = async (req, res) => {
  const id = req.query.id;
  if (!id)
    return res.status(200).json({
      errCode: 1,
      message: "Missing parameter",
    });
  else {
    await doctorService
      .getExtraInfoDoctorService(id)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        console.log(
          "🚀 ~ file: doctorController.js ~ line 157 ~ exports.getExtraInfoDoctor= ~ err",
          err
        );
        return res.status(200).json({
          errCode: -1,
          message: "error from sever",
        });
      });
  }
};
exports.getListPatient = async (req, res) => {
  return await doctorService
    .getListPatientService(req.query)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: doctorController.js ~ line 177 ~ exports.getListPatient= ~ err",
        err
      );
      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};

exports.postSendSemedy = async (req, res) => {
  return await doctorService
    .postSendSemedyService(req.body)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: doctorController.js ~ line 189 ~ exports.postSendSemedy= ~ err",
        err
      );

      return res.status(200).json({
        errCode: -1,
        message: "error from sever",
      });
    });
};
