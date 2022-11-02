import { result } from "lodash";
import userService from "../services/userService";

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing input parameters",
    });
  }
  const userData = await userService.handleUserLogin(email, password);
  console.log("handle login");
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};

exports.handleGetAllUers = async (req, res) => {
  const { id } = req.query;
  const users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    message: "ok",
    user: users,
  });

  // const { id } = req.body;
  // console.log(
  //   "🚀 ~ file: userController.js ~ line 23 ~ exports.handleGetAllUers= ~ req.bod",
  //   id
  // );
  // const users = await userService.getAllUsers(id);
  // return res.status(200).json({
  //   errCode: 0,
  //   message: "ok",
  //   user: users,
  // });
};

exports.handleCreateNewUser = async (req, res) => {
  if (!req.body.email)
    return res.status(200).json({
      errCode: 1,
      message: "missing input parameters",
    });
  console.log("handle get all users");
  const message = await userService.createNewUsers(req.body);
  return res.status(200).json(message);
};

exports.handleEditUser = async (req, res) => {
  const { id, gender, roleId, positionId } = req.body;
  if (!id || !gender || !roleId || !positionId) {
    return res.status(200).json({
      errCode: 1,
      message: "missing input parameters",
    });
  }
  return await userService
    .updateUser(req.body)
    .then((result) => {
      console.log("handle edit user");
      return res.status(200).json(result);
    })
    .catch(() => {
      return {
        errCode: -1,
        message: "error from sever",
      };
    });
};

exports.handleDeleteUser = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "missing input parameters",
    });
  }
  console.log("handle get delete user");
  const message = await userService.deleteUser(id);
  return res.status(200).json(message);
};

exports.getAllCode = async (req, res) => {
  const type = req.query.type;
  if (!type)
    return res.status(200).json({
      errCode: 1,
      message: "missing input parameters",
    });
  console.log("handle get all code");
  const message = await userService.getAllCodeService(type);
  return res.status(200).json(message);
  // return await userService.getAllCodeService(type).then((message) => {
  //   return res.status(200).json(message);
  // });
};
