import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "./ManageDetailSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-image-lightbox/style.css";
import Select from "react-select";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  createDetailSpecialty,
  getDetailSpecialty,
} from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  {
    value: "treatmentMarkdown",
    label: <FormattedMessage id="admin.manage-detail-specialty.treament" />,
  },
  {
    value: "strengthMarkdown",
    label: <FormattedMessage id="admin.manage-detail-specialty.trengths" />,
  },
  {
    value: "serviceMarkdown",
    label: <FormattedMessage id="admin.manage-detail-specialty.services" />,
  },
  {
    value: "examinationMarkdown",
    label: <FormattedMessage id="admin.manage-detail-specialty.examination" />,
  },
];

class ManageDetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClinic: "",
      listClinic: [],
      selectedSpecialty: "",
      listSpecialty: [],
      treatmentMarkdown: "",
      treatmentHTML: "",
      strengthMarkdown: "",
      strengthHTML: "",
      serviceMarkdown: "",
      serviceHTML: "",
      examinationMarkdown: "",
      examinationHTML: "",
    };
  }

  componentDidMount() {
    this.props.getListClinicAdmin();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.listSpecialty !== prevProps.listSpecialty) {
      const listSpecialty = this.props.listSpecialty;
      const dataSelect = this.buildDataInputSelect(listSpecialty);
      this.setState({
        listSpecialty: dataSelect,
      });
    }
    if (this.props.listClinic !== prevProps.listClinic) {
      const listClinic = this.props.listClinic;
      const dataSelect = this.buildDataInputSelect(listClinic);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }
  clearState = () => {
    this.setState({
      selectedSpecialty: "",
      treatmentMarkdown: "",
      treatmentHTML: "",
      strengthMarkdown: "",
      strengthHTML: "",
      serviceMarkdown: "",
      serviceHTML: "",
      examinationMarkdown: "",
      examinationHTML: "",
    });
  };
  fillDataInput = (data) => {
    this.clearState();
    if (!data) return;
    this.setState({
      treatmentMarkdown: data.treatmentMarkdown ? data.treatmentMarkdown : "",
      treatmentHTML: data.treatmentHTML ? data.treatmentHTML : "",
      strengthMarkdown: data.strengthMarkdown ? data.strengthMarkdown : "",
      strengthHTML: data.strengthHTML ? data.strengthHTML : "",
      serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : "",
      serviceHTML: data.serviceHTML ? data.serviceHTML : "",
      examinationMarkdown: data.examinationMarkdown
        ? data.examinationMarkdown
        : "",
      examinationHTML: data.examinationHTML ? data.examinationHTML : "",
    });
  };
  buildDataInputSelect = (data) => {
    let result = [];
    if (data && data.length > 0) {
      let object;
      data.forEach((item) => {
        object = {
          label: item.name,
          value: item.id,
        };
        result.push(object);
      });
    }
    return result;
  };
  handleEditorChange = ({ html, text }, name) => {
    if (name === "treatmentMarkdown")
      this.setState({
        treatmentHTML: html,
        treatmentMarkdown: text,
      });
    if (name === "strengthMarkdown")
      this.setState({
        strengthHTML: html,
        strengthMarkdown: text,
      });
    if (name === "serviceMarkdown")
      this.setState({
        serviceHTML: html,
        serviceMarkdown: text,
      });
    if (name === "examinationMarkdown")
      this.setState({
        examinationHTML: html,
        examinationMarkdown: text,
      });
  };
  renderContentMarkdown = () => {
    return (
      <>
        {options.map((item, index) => {
          let value = item.value;
          return (
            <div key={index} className="mt-3">
              <span> {item.label}</span>
              <MdEditor
                style={{ height: "fit-content" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={({ html, text }) => {
                  this.handleEditorChange({ html, text }, item.value);
                }}
                value={this.state[value]}
              />
            </div>
          );
        })}
      </>
    );
  };
  fillDataInput = (data) => {
    this.clearState();
    if (!data) return;
    this.setState({
      treatmentMarkdown: data.treatmentMarkdown ? data.treatmentMarkdown : "",
      treatmentHTML: data.treatmentHTML ? data.treatmentHTML : "",
      strengthMarkdown: data.strengthMarkdown ? data.strengthMarkdown : "",
      strengthHTML: data.strengthHTML ? data.strengthHTML : "",
      serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : "",
      serviceHTML: data.serviceHTML ? data.serviceHTML : "",
      examinationMarkdown: data.examinationMarkdown
        ? data.examinationMarkdown
        : "",
      examinationHTML: data.examinationHTML ? data.examinationHTML : "",
    });
  };
  handleChangeSelectClinic = async (selectedOption) => {
    await this.props.getListSpecialtyByClinicId(selectedOption.value);
    this.setState({
      selectedClinic: selectedOption,
      selectedSpecialty: "",
    });
    this.clearState();
  };
  handleChangeSelectSpecialty = async (selectedOption) => {
    const specialtyId = selectedOption.value;
    const res = await getDetailSpecialty(specialtyId);
    if (res && res.errCode === 0) {
      this.fillDataInput(res.data);
    } else {
      toast.error("Get Detail Specialty Failed");
    }
    this.setState({
      selectedSpecialty: selectedOption,
    });
  };
  handleSave = async () => {
    const data = {
      treatmentMarkdown: this.state.treatmentMarkdown,
      treatmentHTML: this.state.treatmentHTML,
      strengthMarkdown: this.state.strengthMarkdown,
      strengthHTML: this.state.strengthHTML,
      serviceMarkdown: this.state.serviceMarkdown,
      serviceHTML: this.state.serviceHTML,
      examinationMarkdown: this.state.examinationMarkdown,
      examinationHTML: this.state.examinationHTML,
      clinicId: this.state.selectedClinic.value,
      specialtyId: this.state.selectedSpecialty.value,
    };
    const res = await createDetailSpecialty(data);
    if (res && res.errCode === 0) {
      toast.success("Upload Detail Specialty Succeed");
      this.clearState();
    } else {
      toast.error("Upload Detail Specialty Failed");
    }
  };
  render() {
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-detail-specialty.title" />
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="header-manage">
              <div className="find-option">
                <div className="find-clinic">
                  <Select
                    value={this.state.selectedClinic}
                    onChange={this.handleChangeSelectClinic}
                    options={this.state.listClinic}
                    placeholder={
                      <FormattedMessage id="admin.manage-doctor.select_clinic_placeholder" />
                    }
                  />
                </div>
                <div className="find-specialty">
                  <Select
                    value={this.state.selectedSpecialty}
                    onChange={this.handleChangeSelectSpecialty}
                    options={this.state.listSpecialty}
                    isDisabled={!this.state.selectedClinic ? true : ""}
                    placeholder={
                      <FormattedMessage id="admin.manage-doctor.select_specialty_placeholder" />
                    }
                  />
                </div>
              </div>
            </div>

            <div className="col-12 form-group">
              {this.renderContentMarkdown()}
              <button
                className="btn btn-primary mt-3"
                onClick={() => {
                  this.handleSave();
                }}
                disabled={!this.state.selectedSpecialty ? "disabled" : false}
              >
                <FormattedMessage id="admin.manage-clinic.save" />
              </button>
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
    listClinic: state.admin.listClinic,
    listSpecialty: state.admin.listSpecialtyByClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicAdmin: () => dispatch(actions.getListClinicAdmin()),
    getListSpecialtyByClinicId: (id) =>
      dispatch(actions.getListSpecialtyByClinicId(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageDetailSpecialty);
