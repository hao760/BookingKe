import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import _ from "lodash";
import { USER_ROLE } from "../../../utils";
import { getScheduleService } from "../../../services/userService";
import moment from "moment";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      selectedDoctor: "",
      currentDate: "",
      allScheduleTime: [],
      errors: {},
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetchAllScheduleTime();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctors !== this.props.doctors) {
      let listDoctor = this.props.doctors;
      const dataSelect = this.buildDataInputSelect(listDoctor);
      this.setState({
        doctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let listDoctor = this.props.doctors;
      const dataSelect = this.buildDataInputSelect(listDoctor);
      this.setState({
        doctors: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      this.setState({
        allScheduleTime: data,
      });
    }
  }
  buildDataInputSelect = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.forEach((item) => {
        let lableVi = `${item.firstName} ${item.lastName}`;
        let lableEn = `${item.lastName} ${item.firstName}`;
        let object = {
          label: language === languages.VI ? lableVi : lableEn,
          value: item.id,
        };
        result.push(object);
      });
    }
    return result;
  };

  handleChange = async (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor, errors: {} });
  };

  fetchSchedule = async () => {
    if (this.state.currentDate === "" && this.state.selectedDoctor === "")
      return;
    let { userInfo } = this.props;
    let doctorId =
      userInfo?.roleId === USER_ROLE.DOCTOR
        ? userInfo.id
        : this.state.selectedDoctor.value;
    let date = new Date(this.state.currentDate).getTime();
    const res = await getScheduleService(doctorId, date);

    let { allScheduleTime } = this.state;
    if (res && res.errCode === 0) {
      let time = res.data;
      if (
        allScheduleTime &&
        allScheduleTime.length > 0 &&
        time &&
        time.length > 0
      ) {
        time.forEach((i) => {
          allScheduleTime.map((item) => {
            if (item.keyMap === i.timeType) item.isSelected = true;
            return item;
          });
        });
        this.setState({ allScheduleTime });
      }
    }
  };
  handleOnchangDatePicker = (date) => {
    let { allScheduleTime } = this.state;
    allScheduleTime.map((item) => {
      item.isSelected = false;
      return item;
    });
    this.setState({
      currentDate: date[0],
      errors: {},
      allScheduleTime,
    });
    this.fetchSchedule();
  };

  handleClickBtnTime = (time) => {
    let { allScheduleTime } = this.state;
    if (allScheduleTime && allScheduleTime.length > 0) {
      allScheduleTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({ allScheduleTime });
    }
  };

  checkValidate = () => {
    let errors = {};
    let { selectedDoctor, currentDate, allScheduleTime } = this.state;
    const { language } = this.props;
    if (language === "en") {
      // if (_.isEmpty(selectedDoctor)) {
      //   errors.selectedDoctor = "Doctor must be choosed!";
      // }

      if (!currentDate) {
        errors.currentDate = "Invalid Date!";
      }
      const selectedTime = allScheduleTime.filter(
        (item) => item.isSelected === true
      );
      if (_.isEmpty(selectedTime)) {
        errors.allScheduleTime = "Schedule is empty!";
      }
    } else {
      // if (_.isEmpty(selectedDoctor)) {
      //   errors.selectedDoctor = "Cần chọn bác sĩ!";
      // }

      if (!currentDate) {
        errors.currentDate = "Ngày không hợp lệ!";
      }
      const selectedTime = allScheduleTime.filter(
        (item) => item.isSelected === true
      );
      if (_.isEmpty(selectedTime)) {
        errors.allScheduleTime = "Lịch khám trống!";
      }
    }
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  handleSave = () => {
    const errors = this.checkValidate();
    const checkValidInPut = this.isValid(errors);
    if (!checkValidInPut) {
      this.setState({ errors });
      return;
    }
    let result = [];
    let { allScheduleTime, selectedDoctor, currentDate } = this.state;
    currentDate = new Date(currentDate).getTime();
    const selectedTime = allScheduleTime.filter(
      (item) => item.isSelected === true
    );
    let { userInfo } = this.props;
    let doctorId =
      userInfo.roleId === USER_ROLE.DOCTOR ? userInfo.id : selectedDoctor.value;
    selectedTime.forEach((item) => {
      result.push({
        doctorId: doctorId,
        date: currentDate,
        timeType: item.keyMap,
      });
    });

    this.props.createBulkScheduleDoctor({
      result,
      doctorId: doctorId,
      date: currentDate,
    });

    allScheduleTime = allScheduleTime.map((item) => {
      item.isSelected = false;
      return item;
    });
    this.setState({ allScheduleTime });
  };

  render() {
    const { selectedDoctor, doctors, allScheduleTime, errors } = this.state;
    let { language, userInfo } = this.props;
    return (
      <>
        <div className="title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="wrapper">
          <div className="container">
            <div className="row">
              {userInfo && userInfo.roleId === USER_ROLE.ADMIN && (
                <div className="col-6 from-group">
                  <FormattedMessage id="manage-schedule.select-doctor" />
                  <Select
                    value={selectedDoctor}
                    onChange={this.handleChange}
                    options={doctors}
                  />
                  {errors.selectedDoctor && (
                    <span className="text-danger">{errors.selectedDoctor}</span>
                  )}
                </div>
              )}
              <div className="col-6 from-group">
                <FormattedMessage id="manage-schedule.select-day" />
                <DatePicker
                  className="from-control"
                  onChange={this.handleOnchangDatePicker}
                  value={this.state.currentDate[0]}
                  minDate={new Date()}
                />
                {errors.currentDate && (
                  <span className="text-danger">{errors.currentDate}</span>
                )}
              </div>
              <div className="col-12 pick-hour-container mt-5">
                {allScheduleTime &&
                  allScheduleTime.length > 0 &&
                  allScheduleTime.map((item) => {
                    return (
                      <button
                        className={
                          item.isSelected ? "btn btn-warning" : "btn btn-light"
                        }
                        key={item.id}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === languages.VI
                          ? item.valueVI
                          : item.valueEN}
                      </button>
                    );
                  })}
              </div>
              {errors.allScheduleTime && (
                <span className="text-danger">{errors.allScheduleTime}</span>
              )}
            </div>
            <button
              className="btn btn-primary mt-5"
              onClick={() => this.handleSave()}
            >
              <FormattedMessage id="manage-schedule.save" />
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    doctors: state.admin.listDoctor,
    allScheduleTime: state.admin.allScheduleTime,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    createBulkScheduleDoctor: (data) =>
      dispatch(actions.createBulkScheduleDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
