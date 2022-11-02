import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "./ManageDetailClinic.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-image-lightbox/style.css";
import Select from "react-select";
import { toast } from "react-toastify";
import _ from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const options = [
  {
    value: "noteMarkdown",
    label: <FormattedMessage id="admin.manage-detail-clinic.note" />,
  },
  {
    value: "bookingMarkdown",
    label: <FormattedMessage id="admin.manage-detail-clinic.booking" />,
  },
  {
    value: "strengthMarkdown",
    label: <FormattedMessage id="admin.manage-detail-clinic.strengths" />,
  },
  {
    value: "equipmentMarkdown",
    label: <FormattedMessage id="admin.manage-detail-clinic.equipment" />,
  },
  {
    value: "serviceMarkdown",
    label: <FormattedMessage id="admin.manage-detail-clinic.service" />,
  },
  {
    value: "locationMarkdown",
    label: <FormattedMessage id="admin.manage-detail-clinic.location" />,
  },
  {
    value: "examinationMarkdown",
    label: <FormattedMessage id="admin.manage-detail-clinic.examination" />,
  },
];

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedClinic: "",
      listClinic: [],
      //
      isShowDetailMarkdown: false,
      bookingMarkdown: "",
      bookingHTML: "",
      noteMarkdown: "",
      noteHTML: "",
      strengthMarkdown: "",
      strengthHTML: "",
      equipmentMarkdown: "",
      equipmentHTML: "",
      serviceMarkdown: "",
      serviceHTML: "",
      locationMarkdown: "",
      locationHTML: "",
      examinationMarkdown: "",
      examinationHTML: "",
    };
  }

  componentDidMount() {
    this.props.getListClinicHome();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.detailClinic !== prevProps.detailClinic) {
      this.fillDataInput(this.props.detailClinic);
    }

    if (this.props.listClinic !== prevProps.listClinic) {
      const dataSelect = this.buildDataInputSelect(this.props.listClinic);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }
  fillDataInput = (data) => {
    this.clearState();
    if (!data) return;
    this.setState({
      bookingMarkdown: data.bookingMarkdown ? data.bookingMarkdown : "",
      bookingHTML: data.bookingHTML ? data.bookingHTML : "",
      noteMarkdown: data.noteMarkdown ? data.noteMarkdown : "",
      noteHTML: data.noteHTML ? data.noteHTML : "",
      strengthMarkdown: data.strengthMarkdown ? data.strengthMarkdown : "",
      strengthHTML: data.strengthHTML ? data.strengthHTML : "",
      equipmentMarkdown: data.equipmentMarkdown ? data.equipmentMarkdown : "",
      equipmentHTML: data.equipmentHTML ? data.equipmentHTML : "",
      serviceMarkdown: data.serviceMarkdown ? data.serviceMarkdown : "",
      serviceHTML: data.serviceHTML ? data.serviceHTML : "",
      locationMarkdown: data.locationMarkdown ? data.locationMarkdown : "",
      locationHTML: data.locationHTML ? data.locationHTML : "",
      examinationMarkdown: data.examinationMarkdown
        ? data.examinationMarkdown
        : "",
      examinationHTML: data.examinationHTML ? data.examinationHTML : "",
    });
  };
  clearState = () => {
    this.setState({
      bookingMarkdown: "",
      bookingHTML: "",
      noteMarkdown: "",
      noteHTML: "",
      strengthMarkdown: "",
      strengthHTML: "",
      equipmentMarkdown: "",
      equipmentHTML: "",
      serviceMarkdown: "",
      serviceHTML: "",
      locationMarkdown: "",
      locationHTML: "",
      examinationMarkdown: "",
      examinationHTML: "",
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

  handleChangeSelectClinic = (selectedOption) => {
    this.props.getDetailClinic(selectedOption.value);
    this.setState({
      selectedClinic: selectedOption,
    });
  };

  handleEditorChange = ({ html, text }, name) => {
    if (name === "noteMarkdown")
      this.setState({
        noteMarkdown: text,
        noteHTML: html,
      });
    if (name === "bookingMarkdown")
      this.setState({
        bookingHTML: html,
        bookingMarkdown: text,
      });
    if (name === "strengthMarkdown")
      this.setState({
        strengthHTML: html,
        strengthMarkdown: text,
      });
    if (name === "equipmentMarkdown")
      this.setState({
        equipmentHTML: html,
        equipmentMarkdown: text,
      });
    if (name === "serviceMarkdown")
      this.setState({
        serviceHTML: html,
        serviceMarkdown: text,
      });
    if (name === "locationMarkdown")
      this.setState({
        locationHTML: html,
        locationMarkdown: text,
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

  handleSave = async () => {
    const clinicid = this.state.selectedClinic.value;
    const data = {
      id: clinicid,
      bookingMarkdown: this.state.bookingMarkdown,
      bookingHTML: this.state.bookingHTML,
      noteMarkdown: this.state.noteMarkdown,
      noteHTML: this.state.noteHTML,
      strengthMarkdown: this.state.strengthMarkdown,
      strengthHTML: this.state.strengthHTML,
      equipmentMarkdown: this.state.equipmentMarkdown,
      equipmentHTML: this.state.equipmentHTML,
      serviceMarkdown: this.state.serviceMarkdown,
      serviceHTML: this.state.serviceHTML,
      locationMarkdown: this.state.locationMarkdown,
      locationHTML: this.state.locationHTML,
      examinationMarkdown: this.state.examinationMarkdown,
      examinationHTML: this.state.examinationHTML,
    };
    this.props.createDetailClinic(data);
    this.clearState();
  };
  render() {
    let { selectedClinic } = this.state;
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-clinic.title" />
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="header-manage">
              <h4 className="header-title">
                {selectedClinic ? selectedClinic.label : ""}
              </h4>
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
            </div>

            <div className="col-12 form-group">
              {this.renderContentMarkdown()}
            <button
              className="btn btn-primary mt-3"
              onClick={() => {
                this.handleSave();
              }}
              disabled={!this.state.selectedClinic ? "disabled" : false}
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
    listClinic: state.admin.listClinicHome,
    detailClinic: state.admin.detailClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    getDetailClinic: (id) => dispatch(actions.getDetailClinic(id)),
    createDetailClinic: (data) => dispatch(actions.createDetailClinic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
