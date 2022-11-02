import db from "../models/index";
import _ from "lodash";
import emailService from "../services/emailService";
import { v4 as uuidv4 } from "uuid";
uuidv4();
require("dotenv").config();

const buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking/?token=${token}&doctorId=${doctorId}`;
  return result;
};

exports.postBookAppoinmentService = async (data) => {
  return await db.User.findOrCreate({
    where: { email: data.email },
    defaults: {
      email: data.email.trim(),
      gender: data.gender,
      address: data.address.trim(),
      phoneNumber: data.phoneNumber.trim(),
      firstName: data.fullName.trim(),
      roleId: "R3",
    },
    raw: true,
  })
    .then((result) => {
      const token = uuidv4();
      sendMail({
        reciverEmail: data.email.trim(),
        patientName: data.fullName.trim(),
        time: data.timeString,
        doctorName: data.doctorName.trim(),
        language: data.language,
        redirectLink: buildUrlEmail(data.doctorId, token),
      });
      if (result && result[0]) {
        db.Booking.findOrCreate({
          where: { patientId: result[0].id },
          defaults: {
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: result[0].id,
            date: data.date,
            timeType: data.timeType,
            token: token,
          },
          raw: true,
        });
      }
    })
    .then(() => {
      return {
        errCode: 0,
        message: "post booking succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: patientService.js ~ line 45 ~ exports.postBookAppoinmentService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "post booking failed",
      };
    });
};

async function sendMail(email) {
  await emailService
    .sendSimpleEmail(email)
    .then(() => {
      console.log("send maild succeed");
    })
    .catch((err) => console.log(err));
}

exports.postVerifyBookAppoinmentService = async (data) => {
  try {
    const appointment = await db.Booking.findOne({
      where: {
        doctorId: data.doctorId,
        token: data.token,
        statusId: "S1",
      },
      raw: false,
    });
    if (appointment) {
      appointment.statusId = "S2";
      await appointment.save();
      return {
        errCode: 0,
        message: "verify appointment succeed",
      };
    }
    return {
      errCode: 2,
      message: "appointment has been actived or doeas not existed",
    };
  } catch (error) {
    console.log("🚀 ~ file: patientService.js ~ line 79 ~ error", error);
    return {
      errCode: 1,
      message: "verify booking failed",
    };
  }
};
