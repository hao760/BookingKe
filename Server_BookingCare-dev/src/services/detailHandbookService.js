import db from "../models/index";

exports.createDetailHandbookService = async (data) => {
  if (
    !data.title ||
    !data.handbookId ||
    !data.note ||
    !data.description ||
    !data.contentMarkdown ||
    // !data.image ||
    !data.contentHTML
  ) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.create({
    handbookId: data.handbookId,
    title: data.title.trim(),
    note: data.note.trim(),
    description: data.description.trim(),
    contentMarkdown: data.contentMarkdown,
    contentHTML: data.contentHTML,
    image: data.image ? data.image : "",
  })
    .then(() => {
      return {
        errCode: 0,
        message: "create detail handbook succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 29 ~ exports.createDetailHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "create detail handbook failed",
      };
    });
};

exports.updateDetailHandbookService = async (data) => {
  if (
    !data.id ||
    // !data.image ||
    !data.title ||
    !data.note ||
    !data.description ||
    !data.contentMarkdown ||
    !data.contentHTML
  ) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.update(
    {
      title: data.title.trim(),
      note: data.note.trim(),
      description: data.description.trim(),
      contentMarkdown: data.contentMarkdown,
      contentHTML: data.contentHTML,
      image: data.image ? data.image : "",
    },
    { where: { id: data.id } }
  )
    .then(() => {
      return {
        errCode: 0,
        message: "update detail handbook succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 74 ~ exports.updateDetailHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "update detail handbook failed",
      };
    });
};

exports.deleteDetailHandbookService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.destroy({ where: { id: id } })
    .then(() => {
      return {
        errCode: 0,
        message: "delete detail handbook succeed",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 101 ~ exports.deleteDetailHandbookService ~ err",
        err
      );
      return {
        errCode: 1,
        message: "delete detail handbook failed",
      };
    });
};

exports.getDetailHandbookService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.findOne({ where: { id: id } })
    .then((result) => {
      if (result)
        result.image = new Buffer.from(result.image, "base64").toString(
          "binary"
        );
      return {
        errCode: 0,
        message: "get detail handbook succeed",
        data: result ? result : "",
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 126 ~ exports.getDetailHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get detail handbook failed",
      };
    });
};

exports.getListDetailHandbookService = async (id) => {
  if (!id) {
    return {
      errCode: 1,
      message: "Missing parameter",
    };
  }
  return await db.Detail_handbook.findAll({ where: { handbookId: id } })
    .then((result) => {
      if (result) {
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      console.log("get list detail handbook succeed");
      return {
        errCode: 0,
        message: "get list detail handbook succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 168 ~ exports.getListDetailHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get list detail handbook failed",
      };
    });
};

exports.getHandBookHomeService = async () => {
  return await db.Detail_handbook.findAll({
    limit: 4,
    attributes: ["image", "title"],
  })
    .then((result) => {
      if (result)
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      console.log("get handbook home succeed");
      return {
        errCode: 0,
        message: "get handbook home succeed",
        data: result ? result : {},
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailSpecialtyService.js ~ line 120 ~ exports.getHandBookHomeService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get handbook home failed",
      };
    });
};

exports.getRelatedHandbookService = async (handbookId) => {
  return await db.Detail_handbook.findAll(
    {
      limit: 6,
      attributes: ["image", "title"],
    },
    { where: { handbookId: handbookId } }
  )
    .then((result) => {
      if (result)
        result.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      console.log("get related handbook home succeed");
      return {
        errCode: 0,
        message: "get related handbook home succeed",
        data: result,
      };
    })
    .catch((err) => {
      console.log(
        "🚀 ~ file: detailHandbookService.js ~ line 232 ~ exports.getRelatedHandbookService= ~ err",
        err
      );
      return {
        errCode: 1,
        message: "get related handbook home failed",
      };
    });
};
