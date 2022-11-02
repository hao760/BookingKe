import db from "../models/index";
import _ from "lodash";
import emailService from "../services/emailService";

require("dotenv").config();

exports.getTopDoctorHomeService = async (limit) => {
  return await db.User.findAll({
    limit: limit,
    where: { roleId: "R2" },
    order: [["createdAt", "DESC"]],
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    include: [
      {
        model: db.Allcode,
        as: "positionData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Allcode,
        as: "genderData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Doctor_Info,
        attributes: ["specialtyId"],
        include: [
          {
            model: db.Specialty,
            as: "doctorSpecialtyData",
            attributes: ["name"],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  })
    .then((result) => {
      if (result && result.length > 0) {
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      return {
        errCode: 0,
        message: "get top doctor succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: doctorService.js ~ line 64 ~ exports.getTopDoctorHomeService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get top doctor home failed",
      };
    });
};

exports.getAllDoctorService = async () => {
  return await db.User.findAll({
    where: { roleId: "R2" },
    // attributes: ["firstName", "lastName"],
    attributes: { exclude: ["password", "image"] },
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get all doctor succeed",
        data: result,
      };
    })
    .catch(() => {
      return {
        errCode: 1,
        message: "get all doctor failed",
        data: result,
      };
    });
};

exports.saveDetailDoctorService = async (data) => {
  try {
    if (!data.doctorId || !data.contentHTML || !data.contentMarkdown) {
      return res.status(200).json({
        errCode: 1,
        message: "Missing parameter",
      });
    }
    const existedDetail = await db.Detail_doctor.findOne({
      where: { doctorId: data.doctorId },
    });
    if (!existedDetail) {
      await db.Detail_doctor.create({
        detailHTML: data.contentHTML,
        detailMarkdown: data.contentMarkdown,
        doctorId: data.doctorId,
        description: data.description.trim(),
      });
    } else {
      await db.Detail_doctor.update(
        {
          detailHTML: data.contentHTML,
          detailMarkdown: data.contentMarkdown,
          description: data.description.trim(),
        },
        {
          where: {
            doctorId: data.doctorId,
          },
        }
      );
    }
    return {
      errCode: 0,
      message: "upload detail doctor succeed",
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: doctorService.js ~ line 88 ~ exports.saveDetailDoctorService= ~ error",
      error
    );
    return {
      errCode: 1,
      message: "update detail doctor failed",
    };
  }
};

exports.saveSubDetailDoctorService = async (data) => {
  try {
    const existedDetail = await db.Doctor_Info.findOne({
      where: { doctorId: data.doctorId },
      raw: false,
    });
    if (!existedDetail) {
      await db.Doctor_Info.create({
        doctorId: data.doctorId,
        priceId: data.selectedPrice,
        provinceId: data.selectedProvince,
        paymentId: data.selectedPayment,
        note: data.note,
        clinicId: data.clinicId,
        specialtyId: data.specialtyId,
      });
    } else {
      await db.Doctor_Info.update(
        {
          priceId: data.selectedPrice,
          provinceId: data.selectedProvince,
          paymentId: data.selectedPayment,
          note: data.note,
          clinicId: data.clinicId,
          specialtyId: data.specialtyId,
        },
        {
          where: {
            doctorId: data.doctorId,
          },
        }
      );
    }
    return {
      errCode: 0,
      message: "upload sub detail doctor succeed",
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: doctorService.js ~ line 124 ~ exports.saveSubDetailDoctorService= ~ error",
      error
    );
    return {
      errCode: 1,
      message: "update sub detail doctor failed",
    };
  }
};

exports.getDetaiDoctorService = async (id) => {
  return await db.User.findOne({
    where: { id: id },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: db.Detail_doctor,
        attributes: ["description", "detailHTML", "detailMarkdown"],
      },
      {
        model: db.Allcode,
        as: "positionData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Doctor_Info,
        attributes: { exclude: ["id", "doctorId", "createdAt", "updatedAt"] },
        include: [
          {
            model: db.Allcode,
            as: "priceTypeData",
            attributes: ["valueEN", "valueVI"],
          },
          {
            model: db.Allcode,
            as: "provinceTypeData",
            attributes: ["valueEN", "valueVI"],
          },
          {
            model: db.Allcode,
            as: "paymentTypeData",
            attributes: ["valueEN", "valueVI"],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  })
    .then((result) => {
      if (result && result.image) {
        result.image = new Buffer.from(result.image, "base64").toString(
          "binary"
        );
      }
      if (!result) {
        result = {};
      }
      return {
        errCode: 0,
        message: "get detail doctor by id succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: doctorService.js ~ line 233 ~ exports.getDetaiDoctorService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get detail doctor by id failed",
      };
    });
};

exports.postBulkCreateScheduleService = async (data, doctorId, date) => {
  if (data && data.length > 0) {
    data.map((item) => {
      item.maxNumber = process.env.MAX_NUMBER_SCHEDULE;
      return item;
    });
  }
  // check existed cow -> will change database

  let existing = await db.Schedule.findAll({
    where: { doctorId: doctorId, date: date },
    attributes: ["timeType", "date", "doctorId", "maxNumber"],
    raw: true,
  });
  // if (existing && existing.length > 0) {
  //   existing = existing.map((item) => {
  //     item.date = new Date(item.date).getTime();
  //     return item;
  //   });
  // }
  let toCreate = _.differenceWith(data, existing, (a, b) => {
    return a.timeType === b.timeType && +a.date === +b.date;
  });
  if (toCreate && toCreate.length > 0)
    return await db.Schedule.bulkCreate(toCreate)
      .then(() => {
        return {
          errCode: 0,
          message: "create bulk doctor schedule time succeed",
        };
      })
      .catch((err) => {
        return {
          errCode: 1,
          message: "create bulk doctor schedule time failed",
        };
      });
};

exports.getScheduleService = async (doctorId, date) => {
  return await db.Schedule.findAll({
    where: {
      doctorId: doctorId,
      date: date,
    },
    include: [
      {
        model: db.Allcode,
        as: "timeTypeData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.User,
        as: "doctorData",
        attributes: ["firstName", "lastName"],
      },
    ],
    raw: false,
    nest: true,
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get schedule by doctor id & date succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get schedule by doctor id & date failed",
      };
    });
};

exports.getExtraInfoDoctorService = async (id) => {
  return await db.Doctor_Info.findOne({
    attributes: { exclude: ["id", "doctorId", "createdAt", "updatedAt"] },
    where: { doctorId: id },
    include: [
      {
        model: db.Allcode,
        as: "priceTypeData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Allcode,
        as: "provinceTypeData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Allcode,
        as: "paymentTypeData",
        attributes: ["valueEN", "valueVI"],
      },
      {
        model: db.Clinic,
        as: "clinicDataDoctor",
        attributes: ["address", "name"],
      },
    ],
    raw: true,
    nest: true,
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get extra info doctor by id succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get extra info doctor by id failed",
      };
    });
};

exports.getListPatientService = async (data) => {
  const date = data.date;
  const doctorId = data.doctorId;
  if (!date || !doctorId) {
    return {
      errCode: 1,
      message: "missing input parameters",
    };
  }
  return await db.Booking.findAll({
    where: { doctorId: doctorId, date: date, statusId: "S2" },
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: db.User,
        attributes: ["email", "address", "gender", "firstName"],
        as: "patientData",
        include: [
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEN", "valueVI"],
          },
        ],
      },
      {
        model: db.Allcode,
        as: "timeTypeDataPatient",
        attributes: ["valueEN", "valueVI"],
      },
    ],
    raw: true,
    nest: true,
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get list patient of doctor succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list patient of doctor failed",
      };
    });
};

exports.postSendSemedyService = async (data) => {
  const email = data.email;
  const doctorId = data.doctorId;
  const patientId = data.patientId;
  const timeType = data.timeType;
  // if (!email || !doctorId || !patientId || !timeType) {
  if (!doctorId || !patientId || !timeType) {
    return {
      errCode: 1,
      message: "missing input parameters",
    };
  }
  try {
    // update patient status
    let appointment = await db.Booking.findOne({
      where: {
        doctorId: doctorId,
        patientId: patientId,
        timeType: timeType,
        statusId: "S2",
      },
      raw: false,
    });
    if (appointment) {
      appointment.statusId = "S3";
      await appointment.save();
    }
    emailService.sendAttachment(data);
    return {
      errCode: 0,
      message: "handle confirm appointment succeed",
    };
    //sent email
  } catch (error) {
    console.log(
      "🚀 ~ file: doctorService.js ~ line 419 ~ exports.postSendSemedyService= ~ error",
      error
    );
    return {
      errCode: 1,
      message: "get remery failed",
    };
  }
};

async function sendMail(email) {
  await emailService
    .sendSimpleEmail(email)
    .then(() => {
      console.log("send maild succeed");
    })
    .catch((err) => console.log(err));
}
