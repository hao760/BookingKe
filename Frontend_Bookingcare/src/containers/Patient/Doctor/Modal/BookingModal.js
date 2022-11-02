import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { languages } from "../../../../utils";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import _ from "lodash";
import ProfileDoctor from "../ProfileDoctor";
import NumberFormat from "react-number-format";
import DatePicker from "../../../../components/Input/DatePicker";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "M",
      doctorId: "",
      genders: "",
      timeType: "",
      dcotorName: "",
    };
  }

  componentDidMount() {
    this.props.fetchGenderStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.props.genders,
      });
    }
    if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
      const dataTime = this.props.dataScheduleTimeModal;
      if (dataTime && !_.isEmpty(dataTime)) {
        this.setState({
          doctorId: dataTime.doctorId,
          timeType: dataTime.timeType,
        });
      }
    }
  }
  toggle = () => {
    this.props.closeModalBooking();
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleOnchangDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnClickGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };
  renderPrice = () => {
    const { language, doctor_info } = this.props;
    const currentLang = language === languages.VI ? "valueVI" : "valueEN";
    const price =
      doctor_info && doctor_info.priceTypeData
        ? doctor_info.priceTypeData[currentLang]
        : "";
    return (
      <>
        <NumberFormat
          className="foo"
          displayType={"text"}
          thousandSeparator={true}
          value={price}
          suffix={language === languages.VI ? "VNĐ" : "$"}
        />
      </>
    );
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  buildTimeBooking = (dataTime) => {
    const { language } = this.props;
    const date =
      language === languages.VI
        ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
        : moment
            .unix(+dataTime.date / 1000)
            .locale("en")
            .format("ddd - MM/DD/YYYY");
    const time =
      language === languages.VI
        ? dataTime.timeTypeData.valueVI
        : dataTime.timeTypeData.valueEN;
    if (dataTime && !_.isEmpty(dataTime)) {
      return `${time} - ${this.capitalizeFirstLetter(date)}`;
    }
    return "";
  };
  buildNameDoctor = (dataTime) => {
    const { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      const nameVI = `${dataTime.doctorData.firstName}${dataTime.doctorData.lastName} `;
      const nameEN = `${dataTime.doctorData.lastName}${dataTime.doctorData.firstName}`;
      const name = language === languages.VI ? nameVI : nameEN;
      return name;
    }
    return "";
  };
  handleSaveUser = () => {
    // let date = new Date(this.state.birthday).getTime();
    let date = this.props.dataScheduleTimeModal.date;
    const timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
    const doctorName = this.buildNameDoctor(this.props.dataScheduleTimeModal);
    let data = {
      email: this.state.email,
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      gender: this.state.gender,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    };
    this.props.createBookingAppointment(data);
    this.setState({
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      reason: "",
      birthday: "",
      gender: "M",
    });
  };
  render() {
    const { language, isOpenModelBooking, dataScheduleTimeModal, isShowPrice } =
      this.props;
    const { genders, doctorId } = this.state;
    return (
      <>
        <Modal size="lg" isOpen={isOpenModelBooking} centered>
          <ModalHeader toggle={() => this.toggle()}>
            <FormattedMessage id="patient.booking-modal.title" />
          </ModalHeader>
          <div className="doctor-info">
            <ProfileDoctor
              doctorId={doctorId}
              isShowDescription={false}
              dataTime={dataScheduleTimeModal}
            />
          </div>
          {isShowPrice && isShowPrice === true && (
            <div className="price">
              <i className="fas fa-dot-circle"></i>
              <FormattedMessage id="patient.booking-modal.price" />
              <span>{this.renderPrice()}</span>
            </div>
          )}
          <div className="price-examination"></div>
          <div className="row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.name" />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "fullName")
                }
                value={this.state.fullName}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.gender" />
              </label>
              <div className="d-flex align-items-center mt-2">
                {genders &&
                  genders.length > 0 &&
                  genders.map((item, index) => {
                    return (
                      <label className="option ms-4" key={item.keyMap}>
                        <input
                          type="radio"
                          name="radio"
                          value={item.keyMap}
                          checked={item.keyMap === this.state.gender}
                          onChange={(event) => this.handleOnClickGender(event)}
                        />
                        {language === languages.VI
                          ? item.valueVI
                          : item.valueEN}
                        <span className="checkmark"></span>
                      </label>
                    );
                  })}
              </div>
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.email" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "email")}
                value={this.state.email}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.address" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.phoneNumer" />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeInput(event, "phoneNumber")
                }
                value={this.state.phoneNumber}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.birthday" />
              </label>
              <DatePicker
                onChange={this.handleOnchangDatePicker}
                value={this.state.birthday}
              />
            </div>
            <div className="col-12 form-group">
              <label>
                <FormattedMessage id="patient.booking-modal.reason" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "reason")}
                value={this.state.reason}
              />
            </div>
          </div>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveUser()}
            >
              <FormattedMessage id="patient.booking-modal.save" />
            </Button>
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              <FormattedMessage id="patient.booking-modal.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    createBookingAppointment: (data) =>
      dispatch(actions.createBookingAppointment(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
