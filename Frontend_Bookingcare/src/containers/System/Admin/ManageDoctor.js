import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { CRUD_ACTIONS, TYPE } from "../../../utils/constant";
import _ from "lodash";
const mdParser = new MarkdownIt(/* Detail_doctor-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      // save to markdown table
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      listDoctor: [],
      selectedDoctor: "",

      // save to doctor info table
      listPrice: [],
      selectedPrice: "",
      listPayment: [],
      selectedPayment: "",
      listProvince: [],
      selectedProvince: "",
      /*       nameClinic: "",
      addressClinic: "", */
      note: "",
      selectedClinic: "",
      listClinic: [],
      selectedSpecialty: "",
      listSpecialty: [],

      errors: {},
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.getListSpecialtyAdmin();
    this.props.getListClinicAdmin();
    this.props.fetchInfoDoctor(TYPE.PAYMENT);
    this.props.fetchInfoDoctor(TYPE.PRICE);
    this.props.fetchInfoDoctor(TYPE.PROVINCE);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      const detailDoctor = this.props.detailDoctor;
      this.setState({
        detailDoctor: detailDoctor,
      });
      // set state first select
      const { Detail_doctor, Doctor_Info } = detailDoctor;
      this.fillDataState(detailDoctor, Detail_doctor, Doctor_Info);
    }

    if (prevProps.listDoctor !== this.props.listDoctor) {
      let listDoctor = this.props.listDoctor;
      const dataSelect = this.buildDataInputSelect(listDoctor, 1);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.listPrice !== this.props.listPrice) {
      let listPrice = this.props.listPrice;
      const dataSelect = this.buildDataInputSelect(listPrice, 0);
      this.setState({
        listPrice: dataSelect,
      });
    }
    if (prevProps.listPayment !== this.props.listPayment) {
      let listPayment = this.props.listPayment;
      const dataSelect = this.buildDataInputSelect(listPayment, 0);
      this.setState({
        listPayment: dataSelect,
      });
    }
    if (prevProps.listProvince !== this.props.listProvince) {
      let listProvince = this.props.listProvince;
      const dataSelect = this.buildDataInputSelect(listProvince, 0);
      this.setState({
        listProvince: dataSelect,
      });
    }

    if (prevProps.listSpecialtyAdmin !== this.props.listSpecialtyAdmin) {
      const listSpecialtyAdmin = this.props.listSpecialtyAdmin;
      const dataSelect = this.buildDataInputSelect(listSpecialtyAdmin, 2);
      this.setState({
        listSpecialty: dataSelect,
      });
    }

    if (prevProps.listClinic !== this.props.listClinic) {
      const listClinic = this.props.listClinic;
      const dataSelect = this.buildDataInputSelect(listClinic, 2);
      this.setState({
        listClinic: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let { listDoctor, listPrice, listPayment, listProvince } = this.props;
      const dataSelectDoctor = this.buildDataInputSelect(listDoctor, 1);
      const dataSelectPayment = this.buildDataInputSelect(listPayment, 0);
      const dataSelectProvince = this.buildDataInputSelect(listProvince, 0);
      const dataSelectPrice = this.buildDataInputSelect(listPrice, 0);
      this.setState({
        listDoctor: dataSelectDoctor,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listPrice: dataSelectPrice,
      });
    }

    if (prevProps.detailDoctor !== this.props.detailDoctor) {
      this.setState({
        detailDoctor: this.props.detailDoctor,
      });
    }
  }

  buildDataInputSelect = (data, key) => {
    let result = [];
    let { language } = this.props;

    if (data && data.length > 0) {
      let lableVi, lableEn, object;
      if (key === 1) {
        data.forEach((item) => {
          lableVi = `${item.firstName} ${item.lastName}`;
          lableEn = `${item.lastName} ${item.firstName}`;
          object = {
            label: language === languages.VI ? lableVi : lableEn,
            value: item.id,
          };
          result.push(object);
        });
      } else if (key === 2) {
        data.forEach((item) => {
          object = {
            label: item.name,
            value: item.id,
          };
          result.push(object);
        });
      } else {
        data.forEach((item) => {
          lableVi = `${item.valueVI}`;
          lableEn = `${item.valueEN}`;
          object = {
            label: language === languages.VI ? lableVi : lableEn,
            value: item.keyMap,
          };
          result.push(object);
        });
      }
    }
    return result;
  };

  handleChangeTextArea = (event, name) => {
    let copyState = { ...this.state };
    copyState[name] = event.target.value;
    copyState.errors[name] = "";
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    let errors = {
      errors: { contentMarkdown: "" },
    };
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
      ...errors,
    });
  };

  checkValidate = () => {
    let errors = {};
    let {
      selectedPrice,
      selectedPayment,
      selectedProvince,
      selectedDoctor,
      selectedClinic,
      selectedSpecialty,
      description,
      contentMarkdown,
    } = this.state;
    const { language } = this.props;
    if (language === "en") {
      if (!selectedPrice) errors.selectedPrice = "Price must be selected";
      if (!selectedPayment) errors.selectedPayment = "Payment must be selected";
      if (!selectedProvince)
        errors.selectedProvince = "Province must be selected";
      if (!selectedDoctor) errors.selectedDoctor = "Doctor must be selected";
      if (!selectedClinic) errors.selectedClinic = "Clinic must be selected";
      if (!selectedSpecialty)
        errors.selectedSpecialty = "Specialty must be selected";
      if (!description)
        errors.description = "Descriptions doctor must be entered";
      if (!contentMarkdown)
        errors.contentMarkdown = "Details doctor must be entered";
    } else {
      if (!selectedPrice) errors.selectedPrice = "Chọn giá khám";
      if (!selectedPayment)
        errors.selectedPayment = "Chọn hình thức thanh toán";
      if (!selectedProvince) errors.selectedProvince = "Chọn thành phố";
      if (!selectedDoctor) errors.selectedDoctor = "Chọn bác sĩ";
      if (!selectedClinic) errors.selectedClinic = "Chọn phòng khám";
      if (!selectedSpecialty) errors.selectedSpecialty = "Chọn chuyên ngành";
      if (!description)
        errors.description = "Giới thiệu bác sĩ không được bỏ trống";
      if (!contentMarkdown)
        errors.contentMarkdown = "Chi tiết bác sĩ không được bỏ trống";
    }
    return errors;
  };
  isValid = (errors) => {
    let keys = Object.keys(errors);
    let count = keys.reduce((acc, curr) => (errors[curr] ? acc + 1 : acc), 0);
    return count === 0;
  };
  handleSave = () => {
    const errors = this.checkValidate();
    const checkValidInPut = this.isValid(errors);
    if (!checkValidInPut) {
      this.setState({ errors });
      return;
    }
    const dataMain = {
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      doctorId: this.state.selectedDoctor.value,
      description: this.state.description,
    };
    const subData = {
      doctorId: this.state.selectedDoctor.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      note: this.state.note,
      clinicId: this.state.selectedClinic.value,
      specialtyId: this.state.selectedSpecialty.value,
    };
    this.props.createDetailDoctor(dataMain);
    this.props.createSubDetailDoctor(subData);
    this.props.fetchAllDoctor();
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      note: "",
      description: "",
    });
  };

  fillDataState = (detailDoctor, Detail_doctor, Doctor_Info) => {
    let contentHTML = "",
      contentMarkdown = "",
      description = "",
      note = "",
      selectedPrice = "",
      selectedPayment = "",
      selectedProvince = "",
      selectedClinic = "",
      selectedSpecialty = "";
    const { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;
    if (detailDoctor) {
      if (
        Detail_doctor &&
        Detail_doctor.detailHTML &&
        Detail_doctor.detailMarkdown &&
        Detail_doctor.description
      ) {
        contentHTML = Detail_doctor.detailHTML;
        contentMarkdown = Detail_doctor.detailMarkdown;
        description = Detail_doctor.description;
      }
      if (
        Doctor_Info &&
        Doctor_Info.paymentId &&
        Doctor_Info.priceId &&
        Doctor_Info.provinceId
      ) {
        note = Doctor_Info.note;
        const { priceId, provinceId, paymentId, clinicId, specialtyId } =
          Doctor_Info;
        selectedPayment = listPayment.find((i) => i && i.value === paymentId);
        selectedPrice = listPrice.find((i) => i && i.value === priceId);
        selectedProvince = listProvince.find(
          (i) => i && i.value === provinceId
        );
        selectedClinic = listClinic.find((i) => i && i.value === clinicId);
        selectedSpecialty = listSpecialty.find(
          (i) => i && i.value === specialtyId
        );
      }
      this.setState({
        contentHTML: contentHTML,
        contentMarkdown: contentMarkdown,
        description: description,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
        note: note,
        errors: {},
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };

  handleSelectDoctor = (selectedDoctor) => {
    this.setState({ selectedDoctor });
    this.props.fetchDetaiInfoDoctor(selectedDoctor.value);
    const { detailDoctor } = this.state;
    const { Detail_doctor, Doctor_Info } = detailDoctor;
    this.fillDataState(detailDoctor, Detail_doctor, Doctor_Info);
  };

  handleChangeSelect = (selectedOption, name) => {
    const stateName = name.name;
    const copyState = { ...this.state };
    copyState[stateName] = selectedOption;
    copyState.errors[stateName] = "";
    this.setState({
      ...copyState,
    });
  };
  render() {
    const {
      selectedDoctor,
      selectedPrice,
      selectedProvince,
      selectedPayment,
      selectedClinic,
      listDoctor,
      listPrice,
      listPayment,
      listProvince,
      listSpecialty,
      listClinic,
      errors,
    } = this.state;
    const { language } = this.props;
    return (
      <>
        <div className="doctor-title title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="doctor-container wrapper">
          <div className="row">
            <div className="col-4 form-group">
              <span>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </span>
              <Select
                value={selectedDoctor}
                onChange={this.handleSelectDoctor}
                options={listDoctor}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_doctor_placeholder" />
                }
              />
              {errors.selectedDoctor && (
                <span className="text-danger">{errors.selectedDoctor}</span>
              )}
            </div>
            <div className="col-4 form-group">
              <span>
                <FormattedMessage id="admin.manage-doctor.select-specialty" />
              </span>
              <Select
                name="selectedSpecialty"
                value={this.state.selectedSpecialty}
                onChange={this.handleChangeSelect}
                options={listSpecialty}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_specialty_placeholder" />
                }
              />
              {errors.selectedSpecialty && (
                <span className="text-danger">{errors.selectedSpecialty}</span>
              )}
            </div>
            <div className="col-4 form-group">
              <span>
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              </span>
              <Select
                name="selectedClinic"
                value={selectedClinic}
                onChange={this.handleChangeSelect}
                options={listClinic}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_clinic_placeholder" />
                }
              />
              {errors.selectedClinic && (
                <span className="text-danger">{errors.selectedClinic}</span>
              )}
            </div>
            <div className="col-4 form-group">
              <span>
                <FormattedMessage id="admin.manage-doctor.select-price" />
              </span>
              <Select
                name="selectedPrice"
                value={selectedPrice}
                onChange={this.handleChangeSelect}
                options={listPrice}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_price_placeholder" />
                }
              />
              {errors.selectedPrice && (
                <span className="text-danger">{errors.selectedPrice}</span>
              )}
            </div>
            <div className="col-4 form-group">
              <span>
                <FormattedMessage id="admin.manage-doctor.select-payment" />
              </span>
              <Select
                name="selectedPayment"
                value={selectedPayment}
                onChange={this.handleChangeSelect}
                options={listPayment}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_payment_placeholder" />
                }
              />
              {errors.selectedPayment && (
                <span className="text-danger">{errors.selectedPayment}</span>
              )}
            </div>
            <div className="col-4 form-group">
              <span>
                <FormattedMessage id="admin.manage-doctor.select-province" />
              </span>
              <Select
                name="selectedProvince"
                value={selectedProvince}
                onChange={this.handleChangeSelect}
                options={listProvince}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select_province_placeholder" />
                }
              />
              {errors.selectedProvince && (
                <span className="text-danger">{errors.selectedProvince}</span>
              )}
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                value={this.state.description}
                onChange={(event) =>
                  this.handleChangeTextArea(event, "description")
                }
                // placeholder={
                //   language === languages.VI
                //     ? "Lời giới thiệu"
                //     : "Introduce about doctor"
                // }
              ></textarea>
              {errors.description && (
                <span className="text-danger">{errors.description}</span>
              )}
            </div>
            <div className="col-6 form-group" id="note">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <textarea
                onChange={(event) => this.handleChangeTextArea(event, "note")}
                value={this.state.note}
              ></textarea>
            </div>
            <label className="detail">
              <FormattedMessage id="admin.manage-doctor.detail" />
            </label>
            <MdEditor
              style={{ height: "fit-content" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
            {errors.contentMarkdown && (
              <span className="text-danger">{errors.contentMarkdown}</span>
            )}
            <div className="col-12 from-group" style={{ padding: 0 }}>
              <button
                className="btn btn-primary mt-3"
                onClick={this.handleSave}
              >
                <FormattedMessage id="admin.manage-doctor.save" />
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
    listDoctor: state.admin.listDoctor,
    listPrice: state.admin.doctorPrice,
    listPayment: state.admin.doctorPayment,
    listProvince: state.admin.doctorProvince,
    detailDoctor: state.admin.detailDoctor,
    listSpecialtyAdmin: state.admin.listSpecialtyAdmin,
    listClinic: state.admin.listClinic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    fetchInfoDoctor: (type) => dispatch(actions.fetchInfoDoctor(type)),
    createDetailDoctor: (data) => dispatch(actions.createDetailDoctor(data)),
    createSubDetailDoctor: (data) =>
      dispatch(actions.createSubDetailDoctor(data)),
    fetchDetaiInfoDoctor: (id) => dispatch(actions.fetchDetaiInfoDoctor(id)),
    getListSpecialtyAdmin: () => dispatch(actions.getListSpecialtyAdmin()),
    getListClinicAdmin: () => dispatch(actions.getListClinicAdmin()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
