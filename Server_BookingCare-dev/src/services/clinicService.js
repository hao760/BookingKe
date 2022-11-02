import db from "../models/index";
import _ from "lodash";

exports.createClinicService = async (data) => {
  if (
    !data.name ||
    !data.address ||
    !data.contentMarkdown ||
    !data.contentHTML ||
    !data.image ||
    !data.logo
  )
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Clinic.create({
    name: data.name.trim(),
    address: data.address.trim(),
    introduceMarkdown: data.contentMarkdown,
    introduceHTML: data.contentHTML,
    image: data.image,
    logo: data.logo,
  })
    .then(() => {
      console.log("create a new clinic");
      return {
        errCode: 0,
        message: "create a new clinic succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "create a new clinic failed",
      };
    });
};

exports.getDetailClinicService = async (id) => {
  if (!id)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Clinic.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { id: id },
  })
    .then((result) => {
      console.log("get detail clinic succeed");
      if (!result) result = {};
      else {
        result.image = new Buffer.from(result.image, "base64").toString(
          "binary"
        );
        if (result.logo)
          result.logo = new Buffer.from(result.logo, "base64").toString(
            "binary"
          );
      }
      return {
        errCode: 0,
        message: "get detail clinic succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: clinicService.js ~ line 63 ~ exports.getDetailClinicService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get detail clinic failed",
      };
    });
};

exports.getListClinicService = async () => {
  return await db.Clinic.findAll({
    attributes: ["name", "id"],
  })
    .then((result) => {
      console.log("get list clinic succeed");
      return {
        errCode: 0,
        message: "get list clinic succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list clinic failed",
      };
    });
};

exports.getListClinicHomeService = async () => {
  return await db.Clinic.findAll({
    attributes: { exclude: ["createdAt", "updatedAt", "logo"] },
  })
    .then((result) => {
      if (!result) {
        result = {};
      } else if (result && result.length > 0) {
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      console.log("get list clinic  home succeed");
      return {
        errCode: 0,
        message: "get list clinic home succeed",
        data: result,
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "get list clinic home failed",
      };
    });
};

exports.getListDoctorClinicService = async (data) => {
  const { provinceId, clinicId } = data;
  let result = {};
  try {
    if (!clinicId) {
      return {
        errCode: 1,
        message: "Missing parameter",
      };
    }
    if (provinceId !== "all")
      result = await db.Doctor_Info.findAll({
        where: { provinceId: provinceId, clinicId: clinicId },
        attributes: { exclude: ["clinicId", "createdAt", "updatedAt"] },
      });
    else {
      result = await db.Doctor_Info.findAll({
        where: { clinicId: clinicId },
        attributes: { exclude: ["provinceId", "createdAt", "updatedAt"] },
      });
    }
    console.log("get list doctor clinic succeed");
    return {
      errCode: 0,
      message: "get list doctor clinic succeed",
      data: result,
    };
  } catch (error) {
    return {
      errCode: 1,
      message: "get list doctor clinic failed",
    };
  }
};

exports.updateDetailClinicService = async (data) => {
  if (
    !data.name ||
    !data.address ||
    !data.contentMarkdown ||
    !data.contentHTML ||
    !data.image ||
    !data.logo ||
    !data.id
  )
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Clinic.update(
    {
      introduceHTML: data.contentHTML,
      introduceMarkdown: data.contentMarkdown,
      name: data.name.trim(),
      image: data.image,
      address: data.address.trim(),
      logo: data.logo,
    },
    { where: { id: data.id } }
  )
    .then(() => {
      console.log("updated clinic succeed");
      return {
        errCode: 0,
        message: "updated clinic succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "updated clinic failed",
      };
    });
};

exports.deleteClinicService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Clinic.destroy({ where: { id: id } })
    .then(() => {
      console.log("delete clinic succeed");
      return {
        errCode: 0,
        message: "delete clinic succeed",
      };
    })
    .catch((err) => {
      return {
        errCode: 1,
        message: "delete clinic failed",
      };
    });
};
