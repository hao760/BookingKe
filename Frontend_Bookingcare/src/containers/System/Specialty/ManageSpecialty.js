import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CommonUtils } from "../../../utils";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select from "react-select";
import {
  deleteSpecialtyService,
  updateSpecialtyService,
} from "../../../services/userService";
import { toast } from "react-toastify";
import TableManage from "../TableManage";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      contentHTML: "",
      contentMarkdown: "",
      isOpen: false,
      previewImgUrl: "",
      name: "",
      errors: {},
      listClinic: [],
      selectedClinic: "",
      // idClinicEdit: "",
      idSpecialtyEdit: "",
      isSearch: false,
      listSpecialtyByClinic: [],
      listSpecialtyByClinicSearch: [],
    };
  }

  componentDidMount() {
    this.props.getListClinicHome();
    this.props.getSpecialtiesHome();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.listSpecialty !== prevProps.listSpecialty) {
      this.setState({
        listSpecialtyByClinicSearch: this.props.listSpecialty,
      });
    }
    if (this.props.listSpecialtyByClinic !== prevProps.listSpecialtyByClinic) {
      this.setState({
        listSpecialtyByClinic: this.props.listSpecialtyByClinic,
        listSpecialtyByClinicSearch: this.props.listSpecialtyByClinic,
      });
    }
    if (this.props.listClinic !== prevProps.listClinic) {
      const dataSelect = this.buildDataInputSelect(this.props.listClinic);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }

  clearState = () => {
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      name: "",
      image: "",
      previewImgUrl: "",
      errors: {},
      idClinicEdit: "",
      idSpecialtyEdit: "",
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
  handleChangeSelect = (selectedOption) => {
    this.clearState();
    this.props.getListSpecialtyByClinicId(selectedOption.value);
    this.setState({
      selectedClinic: selectedOption,
    });
  };
  handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const url = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: url,
        image: base64,
      });
    }
  };

  openReviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };
  handleOpenSearch = () => {
    this.setState({
      isSearch: !this.state.isSearch,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleSearch = (input) => {
    let dataSearch = this.state.listSpecialtyByClinic;
    if (input === "")
      this.setState({
        listSpecialtyByClinicSearch: this.state.listSpecialtyByClinic,
      });
    dataSearch = dataSearch.filter((e) => {
      return e.name.toLowerCase().includes(input.toLowerCase());
    });
    this.setState({
      listSpecialtyByClinicSearch: dataSearch,
    });
  };
  checkValidate = () => {
    let errors = {};
    let { image, name, contentMarkdown } = this.state;
    const { language } = this.props;
    if (language === "en") {
      // if (!image) errors.image = "Upload image";
      if (!name) errors.name = "Name must be entered";
      if (!contentMarkdown)
        errors.contentMarkdown = "Details specialty must be entered";
    } else {
      // if (!image) errors.image = "Tải ảnh phòng khám";
      if (!name) errors.name = "Tên không được bỏ trống";
      if (!contentMarkdown)
        errors.contentMarkdown = "Chi tiết không được bỏ trống";
    }
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  deleteSpecialty = async (id) => {
    const res = await deleteSpecialtyService(id);
    if (res && res.errCode === 0) {
      toast.success("Delete Specialty Succeed");
      let clinicId = this.state.selectedClinic.value;
      if (clinicId) this.props.getListSpecialtyByClinicId(clinicId);
      else {
        this.props.getListSpecialtyByClinicId("All");
      }
    } else toast.error("Delete Specialty Failed");
  };
  editSpecialty = async (data) => {
    this.setState({
      name: data.name ? data.name : "",
      image: data.image ? data.image : "",
      previewImgUrl: data.image ? data.image : "",
      contentMarkdown: data.detailMarkdown ? data.detailMarkdown : "",
      contentHTML: data.detailHTML ? data.detailHTML : "",
      idSpecialtyEdit: data.id ? data.id : "",
    });
  };
  handleSave = async () => {
    const errors = this.checkValidate();
    const checkValidInPut = this.isValid(errors);
    if (!checkValidInPut) {
      this.setState({ errors });
      return;
    }
    let data = {
      image: this.state.image,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      name: this.state.name,
    };
    const idSpecialtyEdit = this.state.idSpecialtyEdit;

    // no select list clinic
    if (!this.state.selectedClinic) {
      if (!idSpecialtyEdit) await this.props.createASpecialty(data);
      else {
        const res = await updateSpecialtyService({
          ...data,
          idSpecialtyEdit: idSpecialtyEdit,
        });
        if (res && res.errCode === 0) toast.success("Update Specialty Succeed");
        else toast.error("Update Specialty Failed");
      }
      await this.props.getListSpecialtyByClinicId("All");
    }
    // selected clinic
    else if (this.state.selectedClinic) {
      const clinicId = this.state.selectedClinic.value;
      if (!idSpecialtyEdit)
        await this.props.createASpecialty({
          ...data,
          clinicId: clinicId,
        });
      else {
        const res = await updateSpecialtyService({
          ...data,
          idClinicEdit: clinicId,
          idSpecialtyEdit: idSpecialtyEdit,
        });
        if (res && res.errCode === 0) toast.success("Update Specialty Succeed");
        else toast.error("Update Specialty Failed");
      }
      await this.props.getListSpecialtyByClinicId(clinicId);
    }
    this.clearState();
  };
  render() {
    const { language } = this.props;
    let { errors, selectedClinic } = this.state;
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-specialty.title" />
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="specilalty-container">
              {selectedClinic && <h4>{selectedClinic.label}</h4>}
              <div className="find-clinic">
                <Select
                  value={this.state.selectedClinic}
                  onChange={this.handleChangeSelect}
                  options={this.state.listClinic}
                  placeholder={
                    <FormattedMessage id="admin.manage-doctor.select_clinic_placeholder" />
                  }
                />
              </div>
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-specialty.name" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "name")}
                value={this.state.name}
              />
              {errors.name && (
                <span className="text-danger">{errors.name}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-specialty.image" />
              </label>
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <div className="preview-img-container">
                <label className="lable-upload" htmlFor="previewImg">
                  <FormattedMessage id="admin.manage-specialty.upload" />

                  <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image"
                  style={{
                    backgroundImage: `url(${this.state.previewImgUrl})`,
                  }}
                  onClick={() => this.openReviewImage()}
                ></div>
              </div>
              {errors.image && (
                <span className="text-danger">{errors.image}</span>
              )}
            </div>
            <div className="col-12 form-group">
              <FormattedMessage id="admin.manage-specialty.details" />
              <MdEditor
                style={{ height: "fit-content" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
              {errors.contentMarkdown && (
                <span className="text-danger">{errors.contentMarkdown}</span>
              )}
              <button
                className="btn btn-primary mt-3 mb-3"
                onClick={() => {
                  this.handleSave();
                }}
              >
                <FormattedMessage id="admin.manage-clinic.save" />
              </button>
            </div>

            <TableManage
              listRender={this.state.listSpecialtyByClinicSearch}
              handleEdit={this.editSpecialty}
              handleDelete={this.deleteSpecialty}
              handleSearch={this.handleSearch}
              handleOpenSearch={this.handleOpenSearch}
              isSearch={this.state.isSearch}
            />
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listClinic: state.admin.listClinicHome,
    listSpecialtyByClinic: state.admin.listSpecialtyByClinic,
    listSpecialty: state.admin.listSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createASpecialty: (data) => dispatch(actions.createASpecialty(data)),
    getSpecialtiesHome: () => dispatch(actions.getSpecialtiesHome()),
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    getListSpecialtyByClinicId: (id) =>
      dispatch(actions.getListSpecialtyByClinicId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
