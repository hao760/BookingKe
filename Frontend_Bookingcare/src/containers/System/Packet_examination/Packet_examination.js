import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CommonUtils } from "../../../utils";
import "./Packet_examination.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  createPacketService,
  getAllPacketService,
  deletePacketService,
  updatePacketService,
} from "../../../services/userService";
import TableManage from "./TableManage";
import Lightbox from "react-image-lightbox";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class Packet_examination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      selectedClinic: "",
      selectedType: "",
      contentHTML: "",
      contentMarkdown: "",
      title: "",
      previewImgUrl: "",
      image: "",
      description: "",
      listPacket: [],
      isEdit: false,
      clinicIdEdit: -1,
      options: [
        { value: "E1", label: "Cơ bản" },
        { value: "E2", label: "Nâng cao" },
        { value: "E3", label: "Nam" },
        { value: "E4", label: "Nữ" },
      ],
    };
  }

  async componentDidMount() {
    this.props.getListClinicAdmin();
    this.fetchDatable();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.listPacket != prevState.listPacket) {
      // let listPacket1 = await getAllPacketService();
      this.setState({
        //   listPacket: listPacket1.data,
      });
    }
    // console.log("listPacket", this.state.listPacket[0]);
    // console.log("prevState.listPacket", prevState.listPacket[0]);
  }
  fetchDatable = async () => {
    let listPacket = await getAllPacketService();
    this.setState({
      listPacket: listPacket.data,
    });
  };
  deleteSpecialty = async (id) => {
    let res = await deletePacketService(id);
    if (res.errCode == 0) {
      this.fetchDatable();
      toast.success("Xóa gói khám thành công");
    } else toast.error("Xóa gói khám thất bại");
  };

  editPacket = async (data) => {
    let selectedPacket = this.props.listClinic.filter(
      (i) => i && i.id == data.clinicId
    );
    let { name: label, id: value } = selectedPacket[0];
    let selectedClinic = { label, value };
    let selectedType = this.state.options.filter(
      (i) => i && i.value == data.typepacket
    );

    this.setState({
      title: data.title ? data.title : "",
      image: data.image ? data.image : "",
      previewImgUrl: data.image ? data.image : "",
      contentMarkdown: data.contentMarkdown ? data.contentMarkdown : "",
      price: data.price ? data.price : "",
      description: data.description ? data.description : "",
      selectedClinic: selectedClinic,
      selectedType: selectedType[0],
      contentHTML: data.contentHTML ? data.contentHTML : "",
      clinicIdEdit: data.id,
      isEdit: true,
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
    this.setState({
      selectedClinic: selectedOption,
    });
  };
  handleChangeSelectType = (selectedOption) => {
    this.setState({
      selectedType: selectedOption,
    });
  };

  createPacket = async () => {
    let data = {
      price: this.state.price,
      clinicId: this.state.selectedClinic.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      title: this.state.title,
      image: this.state.image,
      type: this.state.selectedType.value,
      description: this.state.description,
    };
    if (!this.state.isEdit) {
      let res = await createPacketService(data);
      if (res.errCode == 0) {
        toast.success("Tạo gói khám thành công");
        this.clearState();
        this.fetchDatable();
      } else toast.error("Tạo gói khám thất bại");
    } else {
      data.id = this.state.clinicIdEdit;
      let res = await updatePacketService(data);
      console.log("res  ========", res);
      if (res.errCode == 0) {
        toast.success("Chỉnh sửa gói khám thành công");
        this.clearState();
        this.setState({
          isEdit: false,
        });
        this.fetchDatable();
      } else toast.error("Chỉnh sửa gói khám thất bại");
      console.log(data.type)
    }
  };

  clearState = () => {
    this.setState({
      price: "",
      selectedClinic: "",
      selectedType: "",
      contentMarkdown: "",
      title: "",
      previewImgUrl: "",
      image: "",
      description: "",
      contentHTML: "",
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
    // result.image = new Buffer.from(result.image, "base64").toString(
    //   "binary"
    // );
  };

  openReviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
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

  render() {
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    let optionsClinic = this.buildDataInputSelect(this.props.listClinic);
    let { listPacket } = this.state;
    
    return (
      <div className="container">
        <div className=" my-3 row">
          <div className="centerTitle">
            <h2
              style={{ width: "100%", color: "#0071ba", margin: "auto",fontSize:"25px",fontWeight: "bold" }}
              className="mb-5"
            >
               <FormattedMessage id="admin.manage-packet.title" />
            </h2>
          </div>

          <div className=" col-4 form-group">
            <label htmlFor="clinicName"> <FormattedMessage id="admin.manage-packet.selectClinic" /></label>
            <Select
              name="clinicName"
              // className="form-control"
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectClinic}
              options={optionsClinic}
              placeholder={<FormattedMessage id="admin.manage-packet.selectClinic" />}
            />
          </div>

          <div className="col-4 form-group ">
            <label htmlFor="title">{<FormattedMessage id="admin.manage-packet.selectName" />}</label>
            <input
              onChange={(event) => {
                this.handleOnChangeInput(event, "title");
              }}
              className="form-control"
              value={this.state.title}
              type="text"
              name="title"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="price">{<FormattedMessage id="admin.manage-packet.selectPrice" />}</label>
            <input
              onChange={(event) => {
                this.handleOnChangeInput(event, "price");
              }}
              value={this.state.price}
              className="form-control "
              type="text"
              name="price"
            />
          </div>
          <div className=" col-4 form-group bottomm">
            <label htmlFor="clinicName">{<FormattedMessage id="admin.manage-packet.Type" />}</label>
            <Select
              name="clinicName"
              value={this.state.selectedType}
              onChange={this.handleChangeSelectType}
              options={this.state.options}
              // placeholder={<FormattedMessage id="admin.manage-doctor.find" />}
              placeholder={<FormattedMessage id="admin.manage-packet.Type" />}
            />
          </div>

          <div className="col-4 form-group bottomm">
            <label htmlFor="description">{<FormattedMessage id="admin.manage-packet.description" />}</label>
            <textarea
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={(event) => {
                this.handleOnChangeInput(event, "description");
              }}
              cols="30"
              rows="10"
            ></textarea>
            {/* <input type="text"  name="description" /> */}
          </div>
          <div className="row col-4 form-group bottomm row">
            <input
              id="previewImgUrl"
              type="file"
              hidden
              onChange={(event) => this.handleOnChangeImage(event)}
              className="col-3"
            />
            <label className="col-3">
              {/* <FormattedMessage id="admin.manage-detail-handbook.image" /> */}
              {<FormattedMessage id="admin.manage-packet.image" />} :
            </label>
            <div className="col-7">
              <label className="lable-upload" htmlFor="previewImgUrl">
                <FormattedMessage id="admin.manage-clinic.upload" />
                <i className="fas fa-upload"></i>
              </label>
              <div
                className="preview-image col-4"
                style={{
                  backgroundImage: `url(${this.state.previewImgUrl})`,
                  backgroundSize: `100% 100%`,
                  width: "300px",
                  height: "200px",
                  objectFit: "contain",
                  backgroundRepeat: "no-repeat",
                }}
                // onClick={() => this.openReview()}
              ></div>
            </div>
          </div>
        </div>

        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          value={this.state.contentMarkdown}
        />
        <button
          className={this.state.isEdit?"btn btn-warning mt-2 p-2":"btn btn-primary mt-2 p-2"}
          onClick={this.createPacket}
        >
          {this.state.isEdit===true?"Chỉnh sửa":"Tạo gói khám"}
        </button>
        {listPacket && listPacket.length && (
          <TableManage
            listRender={listPacket}
            handleEdit={this.editPacket}
            handleDelete={this.deleteSpecialty}
            className="mt-4"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listClinic: state.admin.listClinic,
    // listSpecialtyByClinic: state.admin.listSpecialtyByClinic,
    // listSpecialty: state.admin.listSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // createASpecialty: (data) => dispatch(actions.createASpecialty(data)),
    // getSpecialtiesHome: () => dispatch(actions.getSpecialtiesHome()),
    getListClinicAdmin: () => dispatch(actions.getListClinicAdmin()),
    // getListSpecialtyByClinicId: (id) =>
    //   dispatch(actions.getListSpecialtyByClinicId(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Packet_examination);
