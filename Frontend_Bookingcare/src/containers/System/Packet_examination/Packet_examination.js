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
import { createPacketService } from "../../../services/userService";
import TableManage from "../TableManage";
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
    };
  }

  componentDidMount() {
    this.props.getListClinicAdmin();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    // console.log("list",this.props.listClinic)
  }

  // clearState = () => {
  //   this.setState({
  //     //   contentHTML: "",
  //     //   contentMarkdown: "",
  //   });
  // };

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

  createPacket = () => {
    let data = {
      price: this.state.price,
      // clinicId: this.state.selectedClinic,
      clinicId: this.state.selectedClinic.value,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      title: this.state.title,
      image: this.state.image,
      type: this.state.selectedType.value,
      description: this.state.description,
    };
    createPacketService(data);
    toast.success("Tạo gói khám thành công");
    this.clearState();
  };

  clearState = () => {
  
    this.setState({
      price: "",
      // selectedClinic: "",
      // selectedType: "",
      contentMarkdown:"",
      title: "",
      previewImgUrl: "",
      // image: "",
      description: "",
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
      console.log("image", base64);
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
    // const { language } = this.props;
    const mdParser = new MarkdownIt(/* Markdown-it options */);
    let options = [
      { value: "E1", label: "Cơ bản" },
      { value: "E2", label: "Nâng cao" },
      { value: "E3", label: "Nam" },
      { value: "E4", label: "Nữ" },
    ];
    let optionsClinic = this.buildDataInputSelect(this.props.listClinic);

    return (
      <div className="container">
        <div className=" my-3 row">
          <div className="centerTitle">
            <h2
              style={{ width: "100%", color: "blue", margin: "auto" }}
              className="mb-5"
            >
              Tạo gói khám bệnh
            </h2>
          </div>

          <div className=" col-4 form-group">
            <label htmlFor="clinicName">Chọn bệnh viện</label>
            <Select
              name="clinicName"
              // className="form-control"
              value={this.state.selectedClinic}
              onChange={this.handleChangeSelectClinic}
              options={optionsClinic}
              placeholder="Chọn bệnh viện"
            />
          </div>

          <div className="col-4 form-group ">
            <label htmlFor="title">Tên gói</label>
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
            <label htmlFor="price">Giá tiền</label>
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
            <label htmlFor="clinicName">Chọn loại</label>
            <Select
              name="clinicName"
              value={this.state.selectedUser}
              onChange={this.handleChangeSelectType}
              options={options}
              // placeholder={<FormattedMessage id="admin.manage-doctor.find" />}
              placeholder="Chọn loại"
            />
          </div>

          <div className="col-4 form-group bottomm">
            <label htmlFor="description">Mô tả</label>
            <textarea
              name="description"
              className="form-control"
              value={this.state.description}
              onChange={(event)=>{this.handleOnChangeInput(event,"description")}}
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
              Ảnh gói khám :
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
          className="btn btn-primary mt-2 p-2"
          onClick={this.createPacket}
        >
          Tạo gói khám
        </button>
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
