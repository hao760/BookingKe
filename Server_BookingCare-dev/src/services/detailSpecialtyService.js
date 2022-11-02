import db from "../models/index";

exports.createDetailSpecialtyService = async (data) => {
  try {
    if (!data.clinicId || !data.specialtyId)
      return {
        errCode: 1,
        message: "Missing parameter",
      };
    const existedDetail = await db.Detail_specialty.findOne({
      where: { clinicId: data.clinicId, specialtyId: data.specialtyId },
    });
    if (!existedDetail) {
      return await db.Detail_specialty.create({
        clinicId: data.clinicId ? data.clinicId : null,
        specialtyId: data.specialtyId ? data.specialtyId : null,
        treatmentMarkdown: data.treatmentMarkdown
          ? data.treatmentMarkdown
          : null,
        treatmentHTML: data.treatmentHTML ? data.treatmentHTML : null,
        strengthMarkdown: data.strengthMarkdown ? data.strengthMarkdown : null,
        strengthHTML: data.strengthHTML ? data.strengthHTML : null,
        serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : null,
        serviceHTML: data.serviceHTML ? data.serviceHTML : null,
        examinationMarkdown: data.examinationMarkdown
          ? data.examinationMarkdown
          : null,
        examinationHTML: data.examinationHTML ? data.examinationHTML : null,
      }).then(() => {
        console.log("create detail specialty");
        return {
          errCode: 0,
          message: "create detail specialty succeed",
        };
      });
    }
    return await db.Detail_specialty.update(
      {
        treatmentMarkdown: data.treatmentMarkdown
          ? data.treatmentMarkdown
          : null,
        treatmentHTML: data.treatmentHTML ? data.treatmentHTML : null,
        strengthMarkdown: data.strengthMarkdown ? data.strengthMarkdown : null,
        strengthHTML: data.strengthHTML ? data.strengthHTML : null,
        serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : null,
        serviceHTML: data.serviceHTML ? data.serviceHTML : null,
        examinationMarkdown: data.examinationMarkdown
          ? data.examinationMarkdown
          : null,
        examinationHTML: data.examinationHTML ? data.examinationHTML : null,
      },
      {
        where: {
          clinicId: data.clinicId,
          specialtyId: data.specialtyId,
        },
      }
    ).then(() => {
      console.log("update detail specialty");
      return {
        errCode: 0,
        message: "update detail specialty succeed",
      };
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: detailSpecialtyService.js ~ line 66 ~ exports.createDetailSpecialtyService= ~ error",
      error
    );
    return {
      errCode: 1,
      message: "upload detail specialty failed",
    };
  }
};

exports.getDetailSpecialtyService = async (specialtyId) => {
  if (!specialtyId)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Detail_specialty.findOne({
    where: { specialtyId: specialtyId },
  })
    .then((result) => {
      console.log("get detail specialty succeed");
      return {
        errCode: 0,
        message: "get detail specialty succeed",
        data: result ? result : {},
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailSpecialtyService.js ~ line 90 ~ exports.getDetailSpecialtyService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get detail specialty failed",
      };
    });
};
