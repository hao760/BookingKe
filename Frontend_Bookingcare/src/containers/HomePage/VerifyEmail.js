import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../utils";
// import "./VerifyEmail.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import HomeHeader from "./HomeHeader";
class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(this.props.location.search);
    const token = urlParams.get("token");
    const doctorId = urlParams.get("doctorId");
    const data = {
      token,
      doctorId,
    };
    this.props.verifyBookingAppointment(data);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.statusVerify !== prevProps.statusVerify) {
      this.setState({
        statusVerify: this.props.statusVerify,
      });
    }
  }
  renderNotify = (language) => {
    if (this.state.statusVerify) {
      if (language === languages.EN) {
        return <>Active appointment succeed</>;
      } else return <>Lịch khám của bạn đã được xác nhận</>;
    } else {
      if (language === languages.EN) {
        return <>Appointment has been actived or does not existed</>;
      } else return <>Lịch khám của bạn đã được xác nhận hoặc chưa tồn tại</>;
    }
  };
  render() {
    const { language } = this.props;
    return (
      <>
        <HomeHeader />
        <div className="title pt-5">{this.renderNotify(language)}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    statusVerify: state.admin.statusVerify,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifyBookingAppointment: (data) =>
      dispatch(actions.verifyBookingAppointment(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
