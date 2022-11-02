import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import SubHeader from "../../HomePage/SubHeader";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import ProfileDoctor from "./ProfileDoctor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      this.props.fetchDetaiInfoDoctor(this.props.match.params.id);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      this.setState({
        detailDoctor: this.props.detailDoctor,
      });
    }
  }
  render() {
    const { detailDoctor } = this.state;
    const doctorId = this.props.match.params.id;
    const { language } = this.props;
    return (
      <>
        <SubHeader isShowSupport={true} />
        <div className="doctor-detail-container ">
          <ProfileDoctor doctorId={doctorId} isShowDescription={true} />
          <div className="schedule-doctor grid">
            <div className="left">
              <DoctorSchedule
                doctorId={detailDoctor.id}
                doctor_info={detailDoctor.Doctor_Info}
                isShowDescription={true}
                isShowPrice={true}
              />
            </div>
            <div className="right">
              <DoctorExtraInfo doctorId={doctorId} />
            </div>
          </div>
          <div className="bg-container">
            <hr />
            <div className="detail-info-doctor grid">
              {detailDoctor &&
                detailDoctor.Detail_doctor &&
                detailDoctor.Detail_doctor.detailHTML && (
                  <div
                    contentEditable="true"
                    dangerouslySetInnerHTML={{
                      __html: detailDoctor.Detail_doctor.detailHTML,
                    }}
                  ></div>
                )}
            </div>
            <hr />
          </div>
          <div className="comment-doctor grid"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    detailDoctor: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetaiInfoDoctor: (id) => dispatch(actions.fetchDetaiInfoDoctor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
