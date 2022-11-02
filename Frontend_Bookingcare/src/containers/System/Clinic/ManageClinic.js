import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, CommonUtils, CRUD_ACTIONS } from "../../../utils";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Select from "react-select";
import { toast } from "react-toastify";
import _ from "lodash";
import {
  updateClinic,
  deleteClinicService,
  getClinic,
  createANewClinic,
} from "../../../services/userService";
import TableManageClinic from "./TableManageClinic";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      contentHTML: "",
      contentMarkdown: "",
      isOpen: false,
      isOpenLogo: false,
      previewImgUrl: "",
      name: "",
      address: "",
      errors: {},
      selectedClinic: "",
      listClinic: [],
      listDetailClinic: [],
      logo: "",
      previewLogoUrl: "",
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (prevState.selectedClinic !== this.state.selectedClinic) {
      let id = this.state.selectedClinic.value;
      this.getClinic(id);
    }
    if (prevState.detailClinic !== this.state.detailClinic) {
      this.fillDatainput(this.state.detailClinic);
    }
    if (this.props.listClinic !== prevProps.listClinic) {
      const dataSelect = this.buildDataInputSelect(this.props.listClinic);
      this.setState({
        listClinic: dataSelect,
      });
    }
  }
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
    this.setState({
      selectedClinic: selectedOption,
    });
  };

  getClinic = async (id) => {
    const res = await getClinic(id);
    if (res && res.errCode === 0)
      this.setState({
        detailClinic: res.data,
      });
  };
  fillDatainput = (data) => {
    if (!_.isEmpty(data)) {
      this.setState({
        idEditClinic: data.id,
        name: data.name,
        address: data.address,
        image: data.image,
        logo: data.logo,
        previewImgUrl: data.image,
        previewLogoUrl: data.logo,
        contentMarkdown: data.introduceMarkdown,
        contentHTML: data.introduceHTML,
      });
    }
  };
  handleOnChangeImage = async (event, name) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const url = URL.createObjectURL(file);
      if (name === "image")
        this.setState({
          previewImgUrl: url,
          image: base64,
        });
      else if (name === "logo") {
        this.setState({
          previewLogoUrl: url,
          logo: base64,
        });
      }
    }
  };

  openReview = (name) => {
    if (name === "image") {
      if (!this.state.previewImgUrl) return;
      this.setState({
        isOpen: true,
      });
    } else if (name === "logo") {
      if (!this.state.previewLogoUrl) return;
      this.setState({
        isOpenLogo: true,
      });
    }
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

  checkValidate = () => {
    let errors = {};
    let { image, name, address, contentMarkdown, logo } = this.state;
    const { language } = this.props;
    if (language === "en") {
      if (!image) errors.image = "Upload image";
      if (!name) errors.name = "Name must be entered";
      if (!address) errors.address = "Address must be entered";
      if (!contentMarkdown)
        errors.contentMarkdown = "Details clinic must be entered";
    } else {
      if (!image) errors.image = "Tải ảnh phòng khám";
      if (!logo) errors.logo = "Tải ảnh đại diện phòng khám";
      if (!name) errors.name = "Tên không được bỏ trống";
      if (!address) errors.address = "Địa chỉ không được bỏ trống";
      if (!contentMarkdown)
        errors.contentMarkdown = "Chi tiết phòng khám không được bỏ trống";
    }
    return errors;
  };

  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };

  handleDeleteClinic = async (id) => {
    const res = await deleteClinicService(id);
    if (res && res.errCode === 0) {
      toast.success("Delete Clinic Succeed");
      this.props.getListClinicHome();
    }
  };
  handleEditClinic = async (data) => {
    this.fillDatainput(data);
  };
  handleSave = async () => {
    const errors = this.checkValidate();
    const checkValidInPut = this.isValid(errors);
    if (!checkValidInPut) {
      this.setState({ errors });
      return;
    }
    const data = {
      image: this.state.image,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      name: this.state.name,
      address: this.state.address,
      logo: this.state.logo,
    };
    if (!this.state.idEditClinic) {
      const res = await createANewClinic(data);
      if (res && res.errCode === 0) {
        toast.success("create a new alinic succeed");
        this.setState({
          contentHTML: "",
          contentMarkdown: "",
          name: "",
          image: "",
          previewImgUrl: "",
          address: "",
          selectedClinic: "",
          errors: "",
          logo: "",
          previewLogoUrl: "",
        });
        this.props.getListClinicHome();
      } else {
        toast.error("create a new alinic failed");
      }
    } else {
      const res = await updateClinic({ ...data, id: this.state.idEditClinic });
      if (res && res.errCode === 0) {
        toast.success("update alinic succeed");
        this.setState({
          contentHTML: "",
          contentMarkdown: "",
          name: "",
          image: "",
          previewImgUrl: "",
          address: "",
          selectedClinic: "",
          errors: "",
          logo: "",
          previewLogoUrl: "",
        });
        this.props.getListClinicHome();
      } else {
        toast.error("update alinic failed");
      }
    }
  };
  render() {
    let { errors } = this.state;
    return (
      <>
        <div className="specialty-title title mb-3">
          <FormattedMessage id="admin.manage-clinic.title" />
        </div>
        <div className="specialty-container wrapper">
          <div className="row">
            <div className="header-manage">
              <h4 className="header-title">
                <FormattedMessage id="admin.manage-clinic.title-header" />
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
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-clinic.name" />
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
            <div className="col-6 form-group mb-3">
              <label>
                <FormattedMessage id="admin.manage-clinic.address" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "address")}
                value={this.state.address}
              />
              {errors.address && (
                <span className="text-danger">{errors.address}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-clinic.image" />
              </label>
              <input
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event, "image")}
              />
              <div className="preview-img-container">
                <label className="lable-upload" htmlFor="previewImg">
                  <FormattedMessage id="admin.manage-clinic.upload" />
                  <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image"
                  style={{
                    backgroundImage: `url(${this.state.previewImgUrl})`,
                  }}
                  onClick={() => this.openReview("image")}
                ></div>
              </div>
              {errors.image && (
                <span className="text-danger">{errors.image}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-clinic.logo" />
              </label>
              <input
                id="previewLogo"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event, "logo")}
              />
              <div className="preview-img-container">
                <label className="lable-upload" htmlFor="previewLogo">
                  <FormattedMessage id="admin.manage-clinic.upload" />
                  <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image"
                  style={{
                    backgroundImage: `url(${this.state.previewLogoUrl})`,
                  }}
                  onClick={() => this.openReview("logo")}
                ></div>
              </div>
              {errors.logo && (
                <span className="text-danger">{errors.logo}</span>
              )}
            </div>
            <div className="col-12 form-group">
              <FormattedMessage id="admin.manage-clinic.introduce" />

              <MdEditor
                style={{ height: "fit-content" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.contentMarkdown}
              />
              {errors.contentMarkdown && (
                <span className="text-danger">{errors.contentMarkdown}</span>
              )}
            </div>
            <div className="col-12 from-group">
              <button
                className={
                  this.state.idEditClinic
                    ? "btn btn-primary mt-3 mb-3"
                    : "btn btn-warning mt-3 mb-3"
                }
                onClick={() => {
                  this.handleSave();
                }}
              >
                {this.state.idEditClinic ? (
                  <FormattedMessage id="admin.manage-clinic.save" />
                ) : (
                  <FormattedMessage id="admin.manage-clinic.add" />
                )}
              </button>
            </div>
              <TableManageClinic
                deleteClinic={this.handleDeleteClinic}
                editClinic={this.handleEditClinic}
              />
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
        {this.state.isOpenLogo === true && (
          <Lightbox
            mainSrc={this.state.previewLogoUrl}
            onCloseRequest={() => this.setState({ isOpenLogo: false })}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    createDetailClinic: (data) => dispatch(actions.createDetailClinic(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
