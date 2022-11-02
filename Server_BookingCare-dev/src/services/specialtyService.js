import db from "../models/index";

exports.createSpecialtyService = async (data) => {
  if (!data.contentHTML || !data.contentMarkdown || !data.name)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Specialty.create({
    name: data.name.trim(),
    image: data.image ? data.image : "",
    detailMarkdown: data.contentMarkdown,
    detailHTML: data.contentHTML,
    clinicId: data.clinicId ? data.clinicId : null,
  })
    .then(() => {
      return {
        errCode: 0,
        message: "create specialty succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: specialtyService.js ~ line 23 ~ exports.createSpecialtyService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "create specialty failed",
      };
    });
};

exports.getSpecialtiesService = async () => {
  return await db.Specialty.findAll({ where: { clinicId: null } })
    .then((result) => {
      if (result && result.length > 0) {
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      return {
        errCode: 0,
        message: "get list specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list specialty failed",
      };
    });
};

exports.getListSpecialtyService = async () => {
  return await db.Specialty.findAll({
    attributes: ["name", "id"],
    where: { clinicId: null },
  })
    .then((result) => {
      console.log("get list specialty succeed");
      return {
        errCode: 0,
        message: "get list specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list specialty failed",
      };
    });
};

exports.getDetailSpecialtyService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Specialty.findOne({
    attributes: { exclude: ["image", "createdAt", "updatedAt"] },
    where: { id: id },
    // raw: false,
    // nest: true,
    // include: [
    //   {
    //     model: db.Doctor_Info,
    //     as: "doctorSpecialtyData",
    //     attributes: { exclude: ["specialtyId", "createdAt", "updatedAt"] },
    //   },
    // ],
  })
    .then((result) => {
      console.log("get list succeed");
      return {
        errCode: 0,
        message: "get detail specialty succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "error from sever",
      };
    });
};

exports.getDoctorSpecialtyService = async (data) => {
  const { specialtyId, provinceId } = data;
  let result = {};
  try {
    if (!specialtyId) {
      return {
        errCode: 1,
        message: "Missing parameter",
      };
    }
    if (provinceId !== "all")
      result = await db.Doctor_Info.findAll({
        where: { specialtyId: specialtyId, provinceId: provinceId },
        attributes: { exclude: ["provinceId", "createdAt", "updatedAt"] },
      });
    else {
      result = await db.Doctor_Info.findAll({
        where: { specialtyId: specialtyId },
        attributes: { exclude: ["provinceId", "createdAt", "updatedAt"] },
      });
    }

    console.log("get list doctor spoecialty succeed");
    return {
      errCode: 0,
      message: "get list doctor specialty succeed",
      data: result,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: "get list doctor specialty failed",
    };
  }
};

exports.getListSpecialtyByClinicIdService = async (id) => {
  try {
    if (!id)
      return {
        errCode: 1,
        message: "Missing parameter",
      };
    let result;
    if (id === "All")
      result = await db.Specialty.findAll({ where: { clinicId: null } });
    else {
      result = await db.Specialty.findAll({ where: { clinicId: id } });
    }
    if (result && result.length > 0) {
      result.map((item) => {
        item.image = new Buffer.from(item.image, "base64").toString("binary");
        return item;
      });
    }
    return {
      errCode: 0,
      message: "get list specialty by clinicId succeed",
      data: result,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: specialtyService.js ~ line 175 ~ exports.getListSpecialtyByClinicIdService= ~ error",
      error
    );
    return {
      errCode: 1,
      message: "get list specialty by clinicId failed",
    };
  }
};

exports.deleteSpecialtyService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Specialty.destroy({ where: { id: id } })
    .then(() => {
      console.log("delete specialty succeed");
      return {
        errCode: 0,
        message: "delete specialty succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "delete specialty failed",
      };
    });
};

exports.updateSpecialtyService = async (data) => {
  try {
    if (!data.name || !data.contentMarkdown || !data.contentHTML) {
      return {
        errCode: 1,
        message: "Missing parameter",
      };
    }
    if (!data.idClinicEdit) {
      await db.Specialty.update(
        {
          name: data.name.trim(),
          image: data.image ? data.image : "",
          detailMarkdown: data.contentMarkdown,
          detailHTML: data.contentHTML,
        },
        { where: { id: data.idSpecialtyEdit } }
      );
    }
    if (data.idClinicEdit) {
      await db.Specialty.update(
        {
          name: data.name.trim(),
          image: data.image ? data.image : "",
          detailMarkdown: data.contentMarkdown,
          detailHTML: data.contentHTML,
        },
        { where: { clinicId: data.idClinicEdit, id: data.idSpecialtyEdit } }
      );
    }
    return {
      errCode: 0,
      message: "update specialty succeed",
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: specialtyService.js ~ line 249 ~ exports.updateSpecialtyService= ~ error",
      error
    );

    return {
      errCode: 1,
      message: "update specialty failed",
    };
  }
};
