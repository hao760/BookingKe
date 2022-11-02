import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  // isLoadingGender: false,
  // isLoadingPosition: false,
  // isLoadingRole: false,
  users: [],
  listTopDoctor: [],
  listDoctor: [],
  detailDoctor: {},
  allScheduleTime: [],
  doctorSchedule: [],
  doctorPrice: [],
  doctorPayment: [],
  doctorProvince: [],
  extraInfoDoctor: {},
  statusVerify: false,
  listSpecialty: [],
  listSpecialtyAdmin: [],
  detailSpecialty: {},
  listDoctorSpecialty: [],
  listClinic: [],
  listClinicHome: [],
  listSpecialtyByClinic: [],
  detailClinic: {},
  listDetailHandbook: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // gender
    case actionTypes.FETCH_GENDER_START: {
      // state.isLoadingGender = true;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_GENDER_SUCCESS: {
      state.genders = action.data;
      // state.isLoadingGender = false;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_GENDER_FAILED: {
      state.genders = [];
      // state.isLoadingGender = false;
      return {
        ...state,
      };
    }
    // position
    case actionTypes.FETCH_POSITION_START: {
      state.isLoadingPosition = true;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_POSITION_SUCCESS: {
      state.positions = action.data;
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_POSITION_FAILED: {
      state.positions = [];
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    }
    //role
    case actionTypes.FETCH_ROLE_START: {
      state.isLoadingRole = true;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_ROLE_SUCCESS: {
      state.roles = action.data;
      state.isLoadingRole = false;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_ROLE_FAILED: {
      state.roles = [];
      state.isLoadingRole = false;
      return {
        ...state,
      };
    }
    // fetch all user
    case actionTypes.FETCH_ALL_USERS_SUCCESS: {
      state.users = action.users;
      return {
        ...state,
      };
    }
    case actionTypes.FETCH_ALL_USERS_FAILED: {
      state.roles = [];
      return {
        ...state,
      };
    }
    // fetch top doctor home
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS: {
      state.listTopDoctor = action.data;
      return { ...state };
    }
    case actionTypes.FETCH_TOP_DOCTORS_FAILED: {
      state.listTopDoctor = [];
      return {
        ...state,
      };
    }
    // fetch all doctor
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS: {
      state.listDoctor = action.data;
      return { ...state };
    }
    case actionTypes.FETCH_ALL_DOCTOR_FAILED: {
      state.listDoctor = [];
      return {
        ...state,
      };
    }
    // fetch detail doctor by id
    case actionTypes.GET_DETAIL_DOCTOR_SUCCESS: {
      state.detailDoctor = action.data;
      return { ...state };
    }
    case actionTypes.GET_DETAIL_DOCTOR_FAILED: {
      state.detailDoctor = {};
      return {
        ...state,
      };
    }
    /*    // fetch sub detail doctor by id
    case actionTypes.GET_SUB_DETAIL_DOCTOR_SUCCESS: {
      state.subDetailDoctor = action.data;
      return { ...state };
    }
    case actionTypes.GET_SUB_DETAIL_DOCTOR_FAILED: {
      state.subDetailDoctor = {};
      return {
        ...state,
      };
    } */

    // fetch all schedule time
    case actionTypes.GET_SCHEDULE_TIME_SUCCESS: {
      state.allScheduleTime = action.data;
      return { ...state };
    }
    case actionTypes.GET_SCHEDULE_TIME_FAILED: {
      state.allScheduleTime = [];
      return {
        ...state,
      };
    }
    // fetch schedule with doctor id . date
    case actionTypes.GET_SCHEDULE_WITH_CONDITIONAL_SUCCESS: {
      state.doctorSchedule = action.data;
      return { ...state };
    }
    case actionTypes.GET_SCHEDULE_WITH_CONDITIONAL_FAILED: {
      state.doctorSchedule = [];
      return {
        ...state,
      };
    }
    // fetch doctor price
    case actionTypes.GET_DOCTOR_PRICE_SUCCEED: {
      state.doctorPrice = action.data;
      return { ...state };
    }
    case actionTypes.GET_DOCTOR_PRICE_FAILED: {
      state.doctorPrice = [];
      return {
        ...state,
      };
    }
    // fetch doctor payment
    case actionTypes.GET_DOCTOR_PAYMENT_SUCCEED: {
      state.doctorPayment = action.data;
      return { ...state };
    }
    case actionTypes.GET_DOCTOR_PAYMENT_FAILED: {
      state.doctorPayment = [];
      return {
        ...state,
      };
    }
    // fetch doctor province
    case actionTypes.GET_DOCTOR_PROVINCE_SUCCEED: {
      state.doctorProvince = action.data;
      return { ...state };
    }
    case actionTypes.GET_DOCTOR_PROVINCE_FAILED: {
      state.doctorProvince = [];
      return {
        ...state,
      };
    }
    // fetch extra info doctor
    case actionTypes.GET_EXTRA_INFO_DOCTOR_SUCCEED: {
      state.extraInfoDoctor = action.data;
      return { ...state };
    }
    case actionTypes.GET_EXTRA_INFO_DOCTOR_FAILED: {
      state.extraInfoDoctor = [];
      return {
        ...state,
      };
    }
    // post verify booking
    case actionTypes.POST_VERIFY_BOOKING_APPOINTMENT_SUCCEED: {
      state.statusVerify = action.data;
      return { ...state };
    }
    case actionTypes.POST_VERIFY_BOOKING_APPOINTMENT_FAILED: {
      return {
        ...state,
      };
    }
    // get list specialty
    case actionTypes.GET_SPECIALTIES_SUCCEED: {
      state.listSpecialty = action.data;
      return { ...state };
    }
    case actionTypes.GET_SPECIALTIES_FAILED: {
      state.listSpecialty = [];
      return {
        ...state,
      };
    }
    // get list admin
    case actionTypes.GET_LIST_SPECIALTY_SUCCEED: {
      state.listSpecialtyAdmin = action.data;
      return { ...state };
    }
    case actionTypes.GET_LIST_SPECIALTY_FAILED: {
      state.listSpecialtyAdmin = [];
      return {
        ...state,
      };
    }
    // get detail specialty
    case actionTypes.GET_DETAIL_SPECIALTY_SUCCEED: {
      state.detailSpecialty = action.data;
      return { ...state };
    }
    case actionTypes.GET_DETAIL_SPECIALTY_FAILED: {
      return {
        ...state,
      };
    }
    // get list admin
    case actionTypes.GET_LIST_DOCTOR_SPECIALTY_SUCCEED: {
      state.listDoctorSpecialty = action.data;
      return { ...state };
    }
    case actionTypes.GET_LIST_DOCTOR_SPECIALTY_FAILED: {
      state.listDoctorSpecialty = [];
      return {
        ...state,
      };
    }
    // get list clinic admin
    case actionTypes.GET_LIST_CLINIC_SUCCEED: {
      state.listClinic = action.data;
      return { ...state };
    }
    case actionTypes.GET_LIST_CLINIC_FAILED: {
      state.listClinic = [];
      return {
        ...state,
      };
    }
    // get list clinic home
    case actionTypes.GET_LIST_CLINIC_HOME_SUCCEED: {
      state.listClinicHome = action.data;
      return { ...state };
    }
    case actionTypes.GET_LIST_CLINIC_HOME_FAILED: {
      state.listClinic = [];
      return {
        ...state,
      };
    }
    // get list specialty by clinicID
    case actionTypes.GET_LIST_SPECIALTY_BY_CLINICID_SUCCEED: {
      state.listSpecialtyByClinic = action.data;
      return { ...state };
    }
    case actionTypes.GET_LIST_SPECIALTY_BY_CLINICID_FAILED: {
      state.listSpecialtyByClinic = [];
      return {
        ...state,
      };
    }

    // get detail clinic
    case actionTypes.GET_DETAIL_CLINIC_SUCCEED: {
      state.detailClinic = action.data;
      return { ...state };
    }
    case actionTypes.GET_DETAIL_CLINIC_FAILED: {
      return {
        ...state,
      };
    }
    // get detail handbook
    case actionTypes.GET_LIST_DETAIL_HANDBOOK_SUCCEED: {
      state.listDetailHandbook = action.data;
      return { ...state };
    }
    case actionTypes.GET_LIST_DETAIL_HANDBOOK_FAILED: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};

export default adminReducer;
