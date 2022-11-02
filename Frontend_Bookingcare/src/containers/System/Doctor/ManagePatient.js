import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatientForDoctor } from "../../../services/userService";
import moment from "moment";
import localization from "moment/locale/vi";
import { toast } from "react-toastify";
import RemedyModal from "./RemedyModal";
import { postSemery } from "../../../services/userService";
import LoadingOverlay from "react-loading-overlay";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   currentDate: moment(new Date()).startOf("day").valueOf(),
      currentDate: moment(new Date()).startOf("day").valueOf(),
      listPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  componentDidMount() {
    this.getDataPatient(this.state.currentDate);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  getDataPatient = async (date) => {
    const { user } = this.props;
    const res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: date,
    });
    if (res && res.errCode === 0) {
      this.setState({
        listPatient: res.data,
      });
    } else {
      this.setState({
        listPatient: [],
      });
      toast.error("Fetch list patient failed");
    }
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: !this.state.isOpenRemedyModal,
    });
  };
  handleOnchangDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
    let { currentDate } = this.state;
    let formatDate = new Date(currentDate).getTime();
    this.getDataPatient(formatDate);
  };
  handleConfirm = (item) => {
    this.setState({
      isOpenRemedyModal: !this.state.isOpenRemedyModal,
      dataModal: {
        email: item.patientData.email,
        fullname: item.patientData.firstName,
        patientId: item.patientId,
        timeType: item.timeType,
        doctorId: item.doctorId,
      },
    });
  };

  handleSendRemedy = async (data) => {
    const { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    const dataSent = {
      ...data,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
    };
    let res = await postSemery(dataSent);
    if (res && res.errCode === 0) {
      toast.success("Send semery succeed");
      this.setState({
        isShowLoading: false,
      });
      let { currentDate } = this.state;
      let formatDate = new Date(currentDate).getTime();
      this.getDataPatient(formatDate);
      this.closeRemedyModal();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send semery failed");
    }
  };
  render() {
    const { language } = this.props;
    const { listPatient } = this.state;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="title pt-3">
            <FormattedMessage id="manage-patient.title" />
          </div>
          <div className="manage-patient wrapper">
            <div className="row mb-3">
              <div className="col-6 form-group">
                <span>
                  <FormattedMessage id="manage-patient.select-day" />
                </span>
                <DatePicker
                  className="from-control"
                  onChange={this.handleOnchangDatePicker}
                />
              </div>
            </div>
            {listPatient && listPatient.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Email</th>
                    <th>
                      <FormattedMessage id="manage-patient.name" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-patient.gender" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-patient.time" />
                    </th>
                    <th>
                      <FormattedMessage id="manage-patient.actions" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listPatient.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.patientData.email}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.genderData.valueVI}</td>
                        <td>{item.timeTypeDataPatient.valueVI}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => this.handleConfirm(item)}
                          >
                            <FormattedMessage id="manage-patient.confirm" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h1>Không co data</h1>
            )}
          </div>
          <RemedyModal
            isOpen={this.state.isOpenRemedyModal}
            closeRemedyModal={this.closeRemedyModal}
            dataModal={this.state.dataModal}
            sendRemedy={this.handleSendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
