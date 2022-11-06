import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

exports.handleUserLogin = async (email, password) => {
  try {
    let userData = {};
    const isExist = await checkUserEmail(email);
    if (isExist) {
      const user = await db.User.findOne({
        attributes: [
          "id",
          "roleId",
          "email",
          "password",
          "firstName",
          "lastName",
        ],
        where: { email: email },
      });
      if (user) {
        const check = await bcrypt.compareSync(password, user.password);
        if (check) {
          delete user.password; // delete password
          userData = {
            errCode: 0,
            message: "Ok",
            user: user,
          };
        } else {
          userData = {
            errCode: 3,
            message: "Wrong password",
          };
        }
      } else {
        userData = { errCode: 2, message: "User is not exist " };
      }
    } else {
      userData = { errCode: 1, message: "Email is not exist " };
    }
    return userData;
  } catch (error) {
    throw new Error(error.message);
  }
};

const checkUserEmail = async (email) => {
  const existUser = await db.User.findOne({ where: { email: email } }).catch(
    (err) => {
      throw new Error(err.message);
    }
  );
  if (existUser) return true;
  return false;
};

exports.getAllUsers = async (id) => {
  try {
    let users = {};
    if (id === "All") {
      users = await db.User.findAll({
        attributes: { exclude: ["password"] },
      });
      users.map((item) => {
        item.image = new Buffer.from(item.image, "base64").toString("binary");
        return item;
      });
    }
    if (id && id !== "All") {
      users = await db.User.findOne({
        where: { id: id },
        attributes: { exclude: ["password"] },
      });
      users.image = new Buffer.from(users.image, "base64").toString("binary");
    }
    return users;
  } catch (error) {
    return error;
  }
};

const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(e);
    }
  });
};

exports.createNewUsers = async (data) => {
  const hashPassword = await hashUserPassword(data.password);
  const check = await checkUserEmail(data.email);
  if (check) {
    return { errCode: 1, message: "Email is exist " };
  }
  return await db.User.create({
    email: data.email.trim(),
    password: hashPassword,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    address: data.address.trim(),
    phoneNumber: data.phoneNumber,
    gender: data.gender,
    image: data.image,
    roleId: data.roleId,
    positionId: data.positionId,
  })
    .then(() => {
      return {
        errCode: 0,
        message: "Ok",
      };
    })
    .catch((err) => err);
};
exports.updateUser = async (user) => {
  const checkUser = await checkExisUser(user.id);
  if (!checkUser) return { errCode: 1, message: "User not found" };
  return await db.User.update(
    {
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
      address: user.address.trim(),
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      roleId: user.roleId,
      positionId: user.positionId,
      image: user.image ? user.image : image,
      /*       email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      image: data.image,
      roleId: data.roleId,
      positionId: data.positionId, */
    },
    {
      where: {
        id: user.id,
      },
    },
    {
      raw: true,
    }
  )
    .then(() => {
      return {
        errCode: 0,
        message: "User updated",
      };
    })
    .catch((ERR) => {
      console.log(
        "🚀 ~ file: userService.js ~ line 146 ~ exports.updateUser= ~ ERR",
        ERR
      );
      return {
        errCode: 1,
        message: "update user failed",
      };
    });
};
exports.deleteUser = async (userId) => {
  const checkUser = await checkExisUser(userId);
  if (!checkUser) return { errCode: 1, message: "User not found" };
  await db.User.destroy({
    where: {
      id: userId,
    },
  }).catch((err) => err);
  return { errCode: 0, message: "User deleted" };
};

const checkExisUser = async (id) => {
  const existUser = await db.User.findOne({ where: { id: id } }).catch(
    (err) => {
      throw new Error(err.message);
    }
  );
  if (existUser) return true;
  return false;
};

exports.getAllCodeService = async (type) => {
  try {
    const data = await db.Allcode.findAll({
      where: { type: type },
      attributes: { exclude: ["createdAt"] },
    });
    return {
      errCode: 0,
      message: "get all code succeed",
      data,
    };
  } catch (error) {
    console.log(
      "🚀 ~ file: userService.js ~ line 159 ~ exports.getAllCodeService= ~ error",
      error
    );
    return {
      errCode: -1,
      message: "sever error",
    };
  }
};

exports.updatePass = async (email,password) => {
  // const checkUser = await checkExisUser(user.id);
  const newPassword= await hashUserPassword(password)
  console.log("pass:",newPassword,email)
  // return {
  //   pass: pass,
  //   email: email,
  //       };

  // if (!checkUser) return { errCode: 1, message: "User not found" };
  return await db.User.update(
    {
      password:newPassword,
    },
    {
      where: {
        email: email,
      },
    },
    {
      raw: true,
    }
  )
    .then(() => {
      return {
        errCode: 0,
        message: "User updated",
      };
    })
    .catch((ERR) => {
      console.log(
        "🚀 ~ file: userService.js ~ line 146 ~ exports.updateUser= ~ ERR",
        ERR
      );
      return {
        errCode: 1,
        message: "update user failed",
      };
    });
};