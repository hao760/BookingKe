import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./DetailClinic.scss";
import { FormattedMessage } from "react-intl";
import SubHeader from "../../HomePage/SubHeader";
import { withRouter } from "react-router-dom";
import { getClinic, getDetailSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";
import HomeFooter from "../../HomePage/HomeFooter";
import SelectSpecialtyClinic from "./SelectSpecialtyClinic";
import _ from "lodash";
import RenderNote from "./RenderNote";
import RenderDoctocs from "./RenderDoctocs";
import RenderMenuBar from "./RenderMenuBar";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      detailClinic: {},
      isShowSelectSpeciaty: false,
      isShowDetailSpecialty: false,
      // render data
      dataHeader: {},
      dataContent: {},
      // render detai clinic
      // show list doctor of specialty or clinic
      isShowListDoctor: false,
      listDoctor: [],
    };
  }

  componentDidMount() {
    this.renderDetail();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.detailClinic !== this.props.detailClinic &&
      !this.state.isShowDetailSpecialty
    ) {
      const { clinicId } = this.props.match.params;
      this.isShowSelectSpecialty(clinicId);
      this.setState({
        dataContent: this.props.detailClinic,
      });
    }
  }

  renderDetail = () => {
    const { clinicId, specialtyId } = this.props.match.params;
    this.getDataHeader(clinicId);
    if (specialtyId) {
      this.getDetailSpecialtyClinic(specialtyId);
    } else {
      this.isShowSelectSpecialty(clinicId);
    }
  };

  getDataHeader = async (clinicId) => {
    const resDetail = await getClinic(clinicId);
    if (resDetail && resDetail.errCode === 0) {
      this.setState({
        dataHeader: resDetail.data,
      });
    } else {
      toast.error("Get detail clinic failed");
    }
    this.props.getDetailClinic(clinicId);
  };

  getDetailSpecialtyClinic = async (specialtyId) => {
    const res = await getDetailSpecialty(specialtyId);
    if (res && res.errCode === 0) {
      this.setState({
        dataContent: res.data,
        isShowDetailSpecialty: true,
      });
    } else {
      toast.error("Get Detail Specialty Failed");
    }
  };

  isShowSelectSpecialty = (clinicId) => {
    this.props.getListSpecialtyByClinicId(clinicId);
    this.setState({
      isShowSelectSpeciaty: this.props.listSpecialty.length > 0,
    });
  };

  handleSeeMore = (check = false) => {
    if (check === true)
      this.setState({
        isOpen: true,
      });
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleToDetailDoctor = (id) => {
    if (this.props.history) this.props.history.push(`/detail-doctor/${id}`);
  };

  handleChooseSpecialty = () => {
    const { dataHeader } = this.state;
    if (this.props.history && dataHeader)
      this.props.history.push(`/table-clinic-specialty/${dataHeader.id}`);
  };
  render() {
    const { dataContent, dataHeader, isOpen } = this.state;
    return (
      <>
        <SubHeader
          isShowSupport={true}
          name={
            dataContent.detailSpecialtyData?.name
              ? dataContent.detailSpecialtyData.name
              : dataHeader.name
          }
        />
        <div className="header-clinic-container grid">
          <div
            className="bg-clinic"
            style={{
              backgroundImage: `url(${dataHeader.image})`,
            }}
          ></div>
          <div className="wrap-clinic">
            <div
              className="lg-clinic"
              style={{
                backgroundImage: `url(${dataHeader.logo})`,
              }}
            ></div>
            <div className="info-clinic">
              <div className="name-clinic">
                {dataContent.detailSpecialtyData?.name
                  ? dataContent.detailSpecialtyData.name + ", "
                  : ""}
                {dataHeader.name}
              </div>
              <div className="address-clinic">
                <i className="fas fa-map-marker-alt"></i>
                <span>{dataHeader.address}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="detail-container">
          <div
            className="detail-specialy grid"
            style={{ height: "fit-content" }}
          >
            <RenderNote curLang={this.props.language} />
            {dataContent && dataContent.noteHTML && (
              <div
                className="note-clinic"
                contentEditable="true"
                dangerouslySetInnerHTML={{
                  __html: dataContent.noteHTML,
                }}
              ></div>
            )}

            <h3 className="detail-title" id="introduce">
              <FormattedMessage id="patient.detail-doctor.introduce" />
            </h3>
            {dataHeader && dataHeader.introduceHTML && (
              <div
                contentEditable="true"
                dangerouslySetInnerHTML={{
                  __html: dataHeader.introduceHTML,
                }}
              ></div>
            )}
          </div>
        </div>
        <div className="detail-container">
          <div
            className="detail-specialy grid"
            style={isOpen ? { height: "fit-content" } : {}}
          >
            {/* <RenderMenuBar
              handleSeeMore={this.handleSeeMore}
              list={this.state.dataContent ? this.state.dataContent : ""}
            /> */}

            {dataContent && dataContent.bookingHTML && (
              <div
                contentEditable="true"
                dangerouslySetInnerHTML={{
                  __html: dataContent.bookingHTML,
                }}
              ></div>
            )}
            {dataContent && dataContent.strengthHTML && (
              <>
                <h3 className="detail-title" id="strength">
                  <FormattedMessage id="patient.detail-doctor.strengths" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: dataContent.strengthHTML,
                  }}
                ></div>
              </>
            )}
            {dataContent && dataContent.equipmentHTML && (
              <>
                <h3 className="detail-title" id="equipment">
                  <FormattedMessage id="patient.detail-doctor.equipment" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: dataContent.equipmentHTML,
                  }}
                ></div>
              </>
            )}
            {dataContent && dataContent.serviceHTML && (
              <>
                <h3 className="detail-title" id="service">
                  <FormattedMessage id="patient.detail-doctor.service" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: dataContent.serviceHTML,
                  }}
                ></div>
              </>
            )}
            {dataContent && dataContent.locationHTML && (
              <>
                <h3 className="detail-title" id="location">
                  <FormattedMessage id="patient.detail-doctor.location" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: dataContent.locationHTML,
                  }}
                ></div>
              </>
            )}
            {dataContent && dataContent.examinationHTML && (
              <>
                <h3 className="detail-title" id="examination">
                  <FormattedMessage id="patient.detail-doctor.examination" />
                </h3>
                <div
                  contentEditable="true"
                  dangerouslySetInnerHTML={{
                    __html: dataContent.examinationHTML,
                  }}
                ></div>
              </>
            )}
          </div>
          <div className="for-more grid">
            <span onClick={this.handleSeeMore}>
              {isOpen ? (
                <FormattedMessage id="patient.detail-doctor.hide" />
              ) : (
                <FormattedMessage id="patient.detail-doctor.show" />
              )}
            </span>
          </div>
        </div>
        <div className="body-container">
          <div className="detail-specialy-container grid">
            <div className="detail-specialy-container grid"></div>
          </div>
        </div>
        {this.state.isShowDetailSpecialty && (
          <RenderDoctocs clinicId={this.props.match.params.clinicId} />
        )}
        <HomeFooter />
        {!this.state.isShowDetailSpecialty && (
          <SelectSpecialtyClinic
            handleChooseSpecialty={this.handleChooseSpecialty}
            isShow={this.state.isShowSelectSpeciaty}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    detailClinic: state.admin.detailClinic,
    listSpecialty: state.admin.listSpecialtyByClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailClinic: (id) => dispatch(actions.getDetailClinic(id)),
    getListSpecialtyByClinicId: (id) =>
      dispatch(actions.getListSpecialtyByClinicId(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
