import db from "../models/index";
import _ from "lodash";

exports.createDetailClinicService = async (data) => {
  try {
    if (!data.id || !data.noteMarkdown || !data.noteHTML)
      return {
        errCode: 1,
        message: "Missing parameter",
      };
    const existedDetail = await db.detail_clinic.findOne({
      where: { clinicId: data.id },
    });
    if (!existedDetail)
      return await db.detail_clinic
        .create({
          clinicId: data.id,
          bookingMarkdown: data.bookingMarkdown ? data.bookingMarkdown : null,
          bookingHTML: data.bookingHTML ? data.bookingHTML : null,
          strengthMarkdown: data.strengthMarkdown
            ? data.strengthMarkdown
            : null,
          strengthHTML: data.strengthHTML ? data.strengthHTML : null,
          equipmentMarkdown: data.equipmentMarkdown
            ? data.equipmentMarkdown
            : null,
          equipmentHTML: data.equipmentHTML ? data.equipmentHTML : null,
          serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : null,
          serviceHTML: data.serviceHTML ? data.serviceHTML : null,
          locationMarkdown: data.locationMarkdown
            ? data.locationMarkdown
            : null,
          locationHTML: data.locationHTML ? data.locationHTML : null,
          examinationMarkdown: data.examinationMarkdown
            ? data.examinationMarkdown
            : null,
          examinationHTML: data.examinationHTML ? data.examinationHTML : null,
          noteMarkdown: data.noteMarkdown,
          noteHTML: data.noteHTML,
        })
        .then(() => {
          console.log("update detail clinic");
          return {
            errCode: 0,
            message: "update detail clinic succeed",
          };
        });
    else {
      return await db.detail_clinic
        .update(
          {
            bookingMarkdown: data.bookingMarkdown ? data.bookingMarkdown : null,
            bookingHTML: data.bookingHTML ? data.bookingHTML : null,
            introduceMarkdown: data.introduceMarkdown
              ? data.introduceMarkdown
              : null,
            introduceHTML: data.introduceHTML ? data.introduceHTML : null,
            strengthMarkdown: data.strengthMarkdown
              ? data.strengthMarkdown
              : null,
            strengthHTML: data.strengthHTML ? data.strengthHTML : null,
            equipmentMarkdown: data.equipmentMarkdown
              ? data.equipmentMarkdown
              : null,
            equipmentHTML: data.equipmentHTML ? data.equipmentHTML : null,
            serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : null,
            serviceHTML: data.serviceHTML ? data.serviceHTML : null,
            locationMarkdown: data.locationMarkdown
              ? data.locationMarkdown
              : null,
            locationHTML: data.locationHTML ? data.locationHTML : null,
            examinationMarkdown: data.examinationMarkdown
              ? data.examinationMarkdown
              : null,
            examinationHTML: data.examinationHTML ? data.examinationHTML : null,
            noteMarkdown: data.noteMarkdown,
            noteHTML: data.noteHTML,
            clinicId: data.id,
          },
          {
            where: {
              clinicId: data.id,
            },
          }
        )
        .then(() => {
          console.log("create new detail clinic");
          return {
            errCode: 0,
            message: "create new detail clinic succeed",
          };
        });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: detailClinicService.js ~ line 53 ~ exports.createDetailClinicService= ~ err",
      err
    );
    return {
      errCode: 1,
      message: "create new detail clinic failed",
    };
  }
};

exports.getDetailClinicService = async (clinicId) => {
  if (!clinicId) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.detail_clinic
    .findOne({
      where: { clinicId: clinicId },
      attributes: { exclude: ["createdAt", "updatedAt", "clinicId"] },
    })
    .then((result) => {
      console.log("get detail clinic succeed");
      return {
        errCode: 0,
        message: "get detail clinic succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailClinicService.js ~ line 64 ~ exports.getDetailClinicService= ~ err",
        err
      );

      return {
        errCode: 1,
        message: "get detail clinic failed",
      };
    });
};
