import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./DoctorExtraInfo.scss";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { getExtraInfoDoctorService } from "../../../services/userService";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
      extraInfoDoctor: {},
    };
  }

  async componentDidMount() {
    const doctorId = this.props.doctorId;
    // this.props.fetchExtraInfoDoctor(doctorId);
    if (doctorId) {
      const res = await getExtraInfoDoctorService(doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfoDoctor: res.data,
        });
      }
    }
  }
 async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      const res = await getExtraInfoDoctorService(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfoDoctor: res.data,
        });
      }
    }
    // if (this.props.extraInfoDoctor !== prevProps.extraInfoDoctor) {
    //   const extraInfoDoctor = this.props.extraInfoDoctor;
    //   if (extraInfoDoctor !== null)
    //     this.setState({
    //       extraInfoDoctor,
    //     });
    // }
  }
  handleShowHideDetail = () => {
    this.setState({
      isShowDetail: !this.state.isShowDetail,
    });
  };
  render() {
    const { language } = this.props;
    const { isShowDetail, extraInfoDoctor } = this.state;
    const currentLang = language === languages.VI ? "valueVI" : "valueEN";
    const price =
      extraInfoDoctor && extraInfoDoctor.priceTypeData
        ? extraInfoDoctor.priceTypeData[currentLang]
        : "";
    const typePayment =
      extraInfoDoctor && extraInfoDoctor.paymentTypeData
        ? extraInfoDoctor.paymentTypeData[currentLang]
        : "";
    return (
      <>
        <div className="doctor-extra-info-contrainer">
          <div className="content-up">
            <h5 className="content-title">
              <FormattedMessage id="patient.extra-info-doctor.address" />
            </h5>
            <div className="content-name">
              {extraInfoDoctor && extraInfoDoctor.clinicDataDoctor
                ? extraInfoDoctor.clinicDataDoctor.name
                : ""}
            </div>
            <div className="content-address">
              {extraInfoDoctor && extraInfoDoctor.clinicDataDoctor
                ? extraInfoDoctor.clinicDataDoctor.address
                : ""}
            </div>
          </div>
          <hr />
          <div className="content-down">
            {isShowDetail ? (
              <div>
                <h5 className="content-title">
                  <FormattedMessage id="patient.extra-info-doctor.price" />
                </h5>
                <div className="content-price">
                  <div className="up">
                    <div className="name">
                      <FormattedMessage id="patient.extra-info-doctor.price" />
                    </div>
                    <div className="price">
                      <NumberFormat
                        className="foo"
                        displayType={"text"}
                        thousandSeparator={true}
                        value={price}
                        suffix={language === languages.VI ? "VNĐ" : "$"}
                      />
                    </div>
                  </div>
                  <div className="down">
                    {extraInfoDoctor && extraInfoDoctor.note
                      ? extraInfoDoctor.note
                      : ""}
                  </div>
                </div>
                <div className="content-info-payment">
                  <span>
                    <FormattedMessage id="patient.extra-info-doctor.payment" />
                  </span>
                  <span className="type-payment">{typePayment}</span>
                </div>
                <div
                  className="content-close"
                  onClick={this.handleShowHideDetail}
                >
                  <FormattedMessage id="patient.extra-info-doctor.close" />
                </div>
              </div>
            ) : (
              <h5 className="content-title">
                <span className="price">
                  <FormattedMessage id="patient.extra-info-doctor.price" />:
                </span>
                <NumberFormat
                  className="foo"
                  displayType={"text"}
                  thousandSeparator={true}
                  value={price}
                  suffix={language === languages.VI ? "VNĐ" : "$"}
                />
                <span
                  className="view-detail"
                  onClick={this.handleShowHideDetail}
                >
                  <FormattedMessage id="patient.extra-info-doctor.detail" />
                </span>
              </h5>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    // extraInfoDoctor: state.admin.extraInfoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchExtraInfoDoctor: (id) => dispatch(actions.fetchExtraInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
