import axios from "../axios";

const handleLoginApiService = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsersService = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`);
  // return axios.get(`/api/get-all-user`, {
  //   data: {
  //     id: inputId,
  //   },
  // });
};

const createNewUserService = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

const deleteUserService = (userId) => {
  return axios.delete(`/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};

const editUserService = (user) => {
  return axios.put(`/api/edit-user`, user);
};

const getAllCodeService = (type) => {
  return axios.get(`/api/allcode?type=${type}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = () => {
  return axios.get(`/api/top-all-doctor`);
};

const postDetailDoctorService = (data) => {
  return axios.post(`/api/save-info-doctor`, data);
};
const postSubDetailDocTorService = (data) => {
  return axios.post(`/api/save-sub-info-doctor`, data);
};

const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleService = (doctorId, date) => {
  /*   return axios.get(`/api/get-schedule`, {
    data: {
      doctorId,
      date,
    },
  }); */
  return axios.get(`/api/get-schedule?doctorId=${doctorId}&date=${date}`);
};
const getExtraInfoDoctorService = (id) => {
  return axios.get(`/api/get-extra-info-doctor?id=${id}`);
};

const postBookAppointmentService = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBooingService = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const postASpecialty = (data) => {
  return axios.post(`/api/create-specialty`, data);
};

const getSpecialties = () => {
  return axios.get(`/api/get-specialty`);
};

const getListSpecialty = () => {
  return axios.get(`/api/get-list-specialty`);
};
const getSpecialty = (specialtyId) => {
  return axios.get(`/api/get-detail-specialty?specialtyId=${specialtyId}`);
};
const getListDoctorSpecialty = (data) => {
  return axios.get(
    `/api/get-doctor-specialty?specialtyId=${data.specialtyId}&provinceId=${data.provinceId}`
  );
};

const createANewClinic = (data) => {
  return axios.post(`/api/create-clinic`, data);
};

const getListClinic = () => {
  return axios.get(`/api/get-list-clinic`);
};
const getListClinicHomeService = () => {
  return axios.get(`/api/get-list-home-clinic`);
};
const getClinic = (id) => {
  return axios.get(`/api/get-clinic?id=${id}`);
};
const getListDoctorClinic = (data) => {
  return axios.get(
    `/api/get-list-doctor-clinic?provinceId=${data.provinceId}&clinicId=${data.clinicId}`
  );
};
const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSemery = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

const updateClinic = (data) => {
  return axios.put(`/api/update-detail-clinic`, data);
};

const deleteClinicService = (id) => {
  return axios.delete(`/api/delete-clinic?id=${id}`);
};

const getListSpecialtyByClinicIdService = (id) => {
  return axios.get(`/api/get-list-specialty-by-clinicId?id=${id}`);
};

const deleteSpecialtyService = (id) => {
  return axios.delete(`/api/delete-specialty?id=${id}`);
};

const updateSpecialtyService = (data) => {
  return axios.put(`/api/update-specialty`, data);
};

const createDetailClinicService = (data) => {
  return axios.post(`/api/create-detail-clinic`, data);
};

const getDetailClinicService = (id) => {
  return axios.get(`/api/get-detail-clinic?id=${id}`);
};

const createDetailSpecialty = (data) => {
  return axios.post(`/api/create-detail-specialty`, data);
};

const getDetailSpecialty = (id) => {
  return axios.get(`/api/get-detailSpecialty?specialtyId=${id}`);
};

const createAHandbook = (data) => {
  return axios.post(`/api/create-handbook`, data);
};
const getAHandbook = (id) => {
  return axios.get(`/api/get-handbook?id=${id}`);
};
const getListHandbook = () => {
  return axios.get(`/api/get-list-handbook`);
};
const editHandbook = (data) => {
  return axios.put(`/api/update-handbook`, data);
};

const deleteHandbook = (id) => {
  return axios.delete(`/api/delete-handbook?id=${id}`);
};

const createDetailHandbook = (data) => {
  return axios.post(`/api/create-detail-handbook`, data);
};

const getDetailHandbook = (id) => {
  return axios.get(`/api/get-detail-handbook?id=${id}`);
};
const getListDetailHandbookService = (id) => {
  return axios.get(`/api/get-list-detail-handbook?id=${id}`);
};
const updateDetailHandbook = (data) => {
  return axios.put(`/api/update-detail-handbook`, data);
};
const deleteDetailHandbook = (id) => {
  return axios.delete(`/api/delete-detail-handbook?id=${id}`);
};
const getHandBookHome = () => {
  return axios.get(`/api/get-handbook-home`);
};
const getRelatedHandbook = (id) => {
  return axios.get(`/api/get-related-handbook?id=${id}`);
};

export {
  getRelatedHandbook,
  getHandBookHome,
  getListDetailHandbookService,
  deleteDetailHandbook,
  updateDetailHandbook,
  getDetailHandbook,
  createDetailHandbook,
  deleteHandbook,
  editHandbook,
  getAHandbook,
  getListHandbook,
  createAHandbook,
  getDetailSpecialty,
  createDetailSpecialty,
  deleteSpecialtyService,
  getDetailClinicService,
  createDetailClinicService,
  updateSpecialtyService,
  handleLoginApiService,
  getAllUsersService,
  createNewUserService,
  getListSpecialtyByClinicIdService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorService,
  postDetailDoctorService,
  getDetailInfoDoctor,
  saveBulkScheduleDoctor,
  getScheduleService,
  postSubDetailDocTorService,
  getExtraInfoDoctorService,
  postBookAppointmentService,
  postVerifyBooingService,
  postASpecialty,
  getSpecialties,
  getListSpecialty,
  getSpecialty,
  getListDoctorSpecialty,
  createANewClinic,
  getListClinic,
  getListClinicHomeService,
  getClinic,
  getListDoctorClinic,
  getAllPatientForDoctor,
  postSemery,
  updateClinic,
  deleteClinicService,
};
