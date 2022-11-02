import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import localization from "moment/locale/vi";
import moment from "moment";
import { getDetailInfoDoctor } from "../../../services/userService";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
/*   
  // thay đổi từ get data from redux to get from userService
  componentDidMount() {
    this.props.fetchDetaiInfoDoctor(this.props.doctorId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      const detailDoctor = this.props.detailDoctor;
      this.setState({
        detailDoctor,
      });
    }
  } */

  async componentDidMount() {
    let doctorId = this.props.doctorId;
    if (doctorId) {
      const res = await getDetailInfoDoctor(doctorId);
      if (res && res.errCode === 0)
        this.setState({
          detailDoctor: res.data,
        });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorId !== this.props.doctorId) {
      const res = await getDetailInfoDoctor(this.props.doctorId);
      if (res && res.errCode === 0)
        this.setState({
          detailDoctor: res.data,
        });
    }
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  renderTimeBooking = (dataTime) => {
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
      return (
        <>
          <div>
            {time} - {this.capitalizeFirstLetter(date)}
          </div>
          <div>
            <FormattedMessage id="patient.booking-modal.price-booking" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    const { language, isShowDescription, dataTime } = this.props;
    const { detailDoctor } = this.state;
    let nameVI, nameEN;
    if (detailDoctor && detailDoctor.positionData) {
      nameVI = `${detailDoctor.positionData.valueVI} || ${detailDoctor.firstName} ${detailDoctor.lastName} `;
      nameEN = `${detailDoctor.positionData.valueEN} || ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    }
    return (
      <>
        <div className="intro-doctor grid">
          <div
            className="left "
            style={{
              backgroundImage: `url(${
                detailDoctor.image && detailDoctor.image
                  ? detailDoctor.image
                  : ""
              })`,
            }}
          ></div>
          <div className="right">
            <div className="r-up">
              {language === languages.VI ? nameVI : nameEN}
            </div>
            <div className="r-down">
              {isShowDescription ? (
                <>
                  {detailDoctor &&
                    detailDoctor.Detail_doctor &&
                    detailDoctor.Detail_doctor.description && (
                      <div>{detailDoctor.Detail_doctor.description} </div>
                    )}
                </>
              ) : (
                <> {this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    // detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchDetaiInfoDoctor: (id) => dispatch(actions.fetchDetaiInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
