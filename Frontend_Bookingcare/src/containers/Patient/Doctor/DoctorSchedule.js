import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import moment from "moment";
import "./DoctorSchedule.scss";
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";
import { getScheduleService } from "../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      doctorSchedule: [],
      isOpenModelBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  componentDidMount() {
    this.setAllDay();
    // render schedule doctor today when first time render
    let firstDay = moment(new Date()).startOf("day").valueOf();
    this.fetchSchedule(firstDay);
    // if (!this.props.doctorId) {
    //   this.fetchSchedule(this.state.allDays[0].value);
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setAllDay();
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      this.fetchSchedule(this.state.allDays[0].value);
    }
    /*  if (this.props.arrdoctorId !== prevProps.arrdoctorId) {
      this.fetchSchedule(this.state.allDays[0].value);
    } */
    // if (this.props.doctorSchedule !== prevProps.doctorSchedule) {
    //   this.setState({
    //     doctorSchedule: this.props.doctorSchedule,
    //   });
    // }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  setAllDay = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === languages.VI) {
        if (i === 0) {
          const ddMM = moment(new Date()).format("DD/MM");
          const lable = "Hôm nay - " + ddMM;
          object.lable = lable;
        } else {
          const lable = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.lable = this.capitalizeFirstLetter(lable);
        }
      } else {
        if (i === 0) {
          const ddMM = moment(new Date()).format("DD/MM");
          const lable = "Today - " + ddMM;
          object.lable = lable;
        } else {
          object.lable = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    this.setState({
      allDays,
    });
  };
  fetchSchedule = async (date) => {
    const doctorId = this.props.doctorId;
    if (doctorId && doctorId !== -1) {
      // this.props.fetchScheduleWithConditional(doctorId, date);
      const res = await getScheduleService(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          doctorSchedule: res.data,
        });
      }
    }
  };
  handleOnChangeSelect = (event) => {
    this.fetchSchedule(event.target.value);
  };

  handleOnClickTime = (item) => {
    this.setState({
      isOpenModelBooking: !this.state.isOpenModelBooking,
      dataScheduleTimeModal: item,
    });
  };

  closeModalBooking = () => {
    this.setState({
      isOpenModelBooking: !this.state.isOpenModelBooking,
    });
  };
  render() {
    const { allDays, doctorSchedule } = this.state;
    const { language, isShowPrice } = this.props;
    return (
      <>
        <div className="doctor-schelude-container">
          <div className="all-schedule">
            <select
              className="select"
              onChange={(event) => this.handleOnChangeSelect(event)}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option
                      className="sl-option"
                      value={item.value}
                      key={index}
                    >
                      {item.lable}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available">
            <div className="text-calender">
              <div className="calender">
                <i className="fas fa-calendar-alt"> </i>
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </div>
              <div className="time-content">
                {doctorSchedule && doctorSchedule.length > 0 ? (
                  doctorSchedule.map((item, index) => {
                    let timeDisplay =
                      language === languages.VI
                        ? item.timeTypeData.valueVI
                        : item.timeTypeData.valueEN;
                    return (
                      <button
                        className="btn btn-warning"
                        onClick={() => this.handleOnClickTime(item)}
                        key={index}
                      >
                        {timeDisplay}
                      </button>
                    );
                  })
                ) : (
                  <div className="notify">
                    <FormattedMessage id="patient.detail-doctor.notify" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <span className="text-footer">
            {doctorSchedule && doctorSchedule.length > 0 ? (
              <div>
                <FormattedMessage id="patient.detail-doctor.choose" />
                <i className="far fa-hand-point-up"></i>
                <FormattedMessage id="patient.detail-doctor.book-free" />
              </div>
            ) : (
              ""
            )}
          </span>
        </div>
        <BookingModal
          isOpenModelBooking={this.state.isOpenModelBooking}
          closeModalBooking={this.closeModalBooking}
          dataScheduleTimeModal={this.state.dataScheduleTimeModal}
          doctor_info={this.props.doctor_info}
          isShowPrice={this.props.isShowPrice}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    // doctorSchedule: state.admin.doctorSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchScheduleWithConditional: (doctorId, date) =>
    //   dispatch(actions.fetchScheduleWithConditional(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
