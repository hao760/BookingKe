import db from "../models/index";

exports.createHandbookService = async (data) => {
  if (!data.name)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Handbook.create({
    name: data.name.trim(),
    image: data.image ? data.image : "",
  })
    .then(() => {
      return {
        errCode: 0,
        message: "create handbook succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookService.js ~ line 20 ~ exports.createHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "create handbook failed",
      };
    });
};

exports.getHandbookService = async (id) => {
  if (!id)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Handbook.findOne({
    where: { id: id },
  })
    .then((result) => {
      return {
        errCode: 0,
        message: "get handbook succeed",
        data: result ? result : {},
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookService.js ~ line 48 ~ exports.getHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get handbook failed",
      };
    });
};

exports.getListHandbookService = async () => {
  return await db.Handbook.findAll()
    .then((result) => {
      return {
        errCode: 0,
        message: "get list handbook succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookService.js ~ line 69 ~ exports.getListHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get list handbook failed",
      };
    });
};

exports.updateHandbookService = async (data) => {
  if (!data.id || !data.name)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Handbook.update(
    { name: data.name, image: data.image ? data.image : "" },
    { where: { id: data.id } }
  )
    .then((result) => {
      return {
        errCode: 0,
        message: "update handbook succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookService.js ~ line 98 ~ exports.updateHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "update handbook failed",
      };
    });
};

exports.deleteHandbookService = async (id) => {
  if (!id)
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  return await db.Handbook.destroy({ where: { id: id } })
    .then((result) => {
      return {
        errCode: 0,
        message: "delete handbook succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookService.js ~ line 124 ~ exports.deleteHandbookService ~ err",
        err
      );
      return {
        errCode: 1,
        message: "delete handbook failed",
      };
    });
};

exports.getListNameHandbookService = async () => {
  return await db.Handbook.findAll({ attributes: ["name", "id"] })
    .then((result) => {
      console.log("get list handbook name succeed");
      return {
        errCode: 0,
        message: "get list handbook name succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: handbookService.js ~ line 146 ~ exports.deleteHandbookHomeService ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get list handbook name failed",
      };
    });
};
