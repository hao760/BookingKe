import express from "express";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController.js";
import detailClinicController from "../controllers/detailClinicController";
import detailSpecialtyController from "../controllers/detailSpecialtyController";
import handbookController from "../controllers/handbookController";
import detailHandbookController from "../controllers/detailHandbookController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);
  // doctor
  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/top-all-doctor", doctorController.getAllDoctor);
  router.post("/api/save-info-doctor", doctorController.postInfoDoctor);
  router.post("/api/save-sub-info-doctor", doctorController.postSubInfoDoctor);
  router.get("/api/get-detail-doctor", doctorController.getDetailDoctor);
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule", doctorController.getSchedule);
  router.get("/api/get-extra-info-doctor", doctorController.getExtraInfoDoctor);
  router.get("/api/get-list-patient", doctorController.getListPatient);

  // send remedy
  router.post("/api/send-remedy", doctorController.postSendSemedy);

  // patient
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppoinment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppoinment
  );

  // clinic
  router.post("/api/create-clinic", clinicController.createClinic);
  router.get("/api/get-clinic", clinicController.getDetailClinic);
  // update clinic
  router.put("/api/update-detail-clinic", clinicController.updateDetailClinic);
  router.delete("/api/delete-clinic", clinicController.deleteClinic);
  // get list clinic for manage doctor
  router.get("/api/get-list-clinic", clinicController.getListClinic);
  router.get("/api/get-list-home-clinic", clinicController.getListClinicHome);
  //get list doctor clinic from home
  router.get(
    "/api/get-list-doctor-clinic",
    clinicController.getListDoctorClinic
  );

  // specialty
  router.post("/api/create-specialty", specialtyController.createSpecialty);
  router.get("/api/get-specialty", specialtyController.getSpecialties);
  router.get("/api/get-detail-specialty", specialtyController.getSpecialty);
  router.get(
    "/api/get-doctor-specialty",
    specialtyController.getDoctorSpecialty
  );
  //get list specialty by clinicId
  router.get(
    "/api/get-list-specialty-by-clinicId",
    specialtyController.getListSpecialtyByClinicId
  );
  router.delete("/api/delete-specialty", specialtyController.deleteSpecialty);
  router.put("/api/update-specialty", specialtyController.updateSpecialty);
  // without col image
  router.get("/api/get-list-specialty", specialtyController.getListSpecialty);

  /*  detail clinic */
  router.post(
    "/api/create-detail-clinic",
    detailClinicController.createDetailClinic
  );
  router.get("/api/get-detail-clinic", detailClinicController.getDetailClinic);

  /* detail specialty */
  router.post(
    "/api/create-detail-specialty",
    detailSpecialtyController.createDetailSpecialty
  );

  router.get(
    "/api/get-detailSpecialty",
    detailSpecialtyController.getDetailSpecialty
  );

  /* handbook */
  router.post("/api/create-handbook", handbookController.createHandbook);

  router.get("/api/get-list-handbook-name", handbookController.getListNameHandbook);
  router.get("/api/get-handbook", handbookController.getHandBook);
  router.get("/api/get-list-handbook", handbookController.getListHandBook);
  router.put("/api/update-handbook", handbookController.updateHandbook);
  router.delete("/api/delete-handbook", handbookController.deleteHandbook);

  /* detail handbook */
  router.post(
    "/api/create-detail-handbook",
    detailHandbookController.createDetailHandbook
  );
  router.get(
    "/api/get-detail-handbook",
    detailHandbookController.getDetailHandbook
  );
  router.get(
    "/api/get-handbook-home",
    detailHandbookController.getHandBookHome
  );
  router.get(
    "/api/get-list-detail-handbook",
    detailHandbookController.getListDetailHandbook
  );
  router.put(
    "/api/update-detail-handbook",
    detailHandbookController.updateDetailHandbook
  );
  router.delete(
    "/api/delete-detail-handbook",
    detailHandbookController.deleteDetailHandbook
  );
  // get reference handbook 
    router.get(
      "/api/get-related-handbook",
      detailHandbookController.getRelatedHandbook
    );
  return app.use("/", router);
};

module.exports = initWebRoutes;
