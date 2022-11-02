import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ManageHandbook.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  deleteHandbook,
  getListHandbook,
  createAHandbook,
  editHandbook,
} from "../../../services/userService";
import _ from "lodash";
import TableManage from "../TableManage";

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      note: "",
      listHandbook: [],
      listHandbookSearch: [],
      idEdit: "",
      isSearch: false,
    };
  }
  async componentDidMount() {
    this.fetchListHandbook();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  fetchListHandbook = async () => {
    const res = await getListHandbook();
    if (res && res.errCode === 0)
      this.setState({
        listHandbook: res.data,
        listHandbookSearch: res.data,
      });
    else toast.error("Get List Handbook Failed");
  };
  handleOnChangeInput = (event, name) => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSave = async () => {
    if (!this.state.idEdit) {
      const data = {
        name: this.state.name,
        note: this.state.note,
      };
      const res = await createAHandbook(data);
      if (res && res.errCode === 0) {
        this.setState({
          name: "",
          note: "",
          idEdit: "",
        });
        toast.success("Create Handbook Succeed");
        this.fetchListHandbook();
      } else toast.error("Create Handbook Failed");
    } else {
      const res = await editHandbook({
        name: this.state.name,
        note: this.state.note,
        id: this.state.idEdit,
      });
      if (res && res.errCode === 0) {
        this.setState({
          note: "",
          name: "",
          idEdit: "",
        });
        toast.success("Update Handbook Succeed");
        this.fetchListHandbook();
      } else toast.error("Update Handbook Failed");
    }
  };
  handleEdit = async (data) => {
    this.setState({
      name: data.name,
      note: data.note ? data.note : "",
      idEdit: data.id,
    });
  };
  handleDelete = async (id) => {
    const res = await deleteHandbook(id);
    if (res && res.errCode === 0) {
      this.setState({
        note: "",
        name: "",
      });
      toast.success("Create Handbook Succeed");
      this.fetchListHandbook();
    } else toast.error("Update Handbook Failed");
  };
  handleSearch = (input) => {
    let dataSearch = this.state.listHandbook;
    if (input === "")
      this.setState({
        listHandbookSearch: this.state.listHandbook,
      });
    dataSearch = dataSearch.filter((e) => {
      return e.name.toLowerCase().includes(input.toLowerCase());
    });
    this.setState({
      listHandbookSearch: dataSearch,
    });
  };
  handleOpenSearch = () => {
    this.setState({
      isSearch: !this.state.isSearch,
    });
  };
  render() {
    const { listHandbookSearch } = this.state;
    const placeHolserSearch =
      this.props.language === languages.VI ? "Lọc cẩm nang" : "Filter handbook";
    return (
      <>
        <div className="title">
          <FormattedMessage id="admin.manage-handbook.title" />
        </div>
        <div className="handbook-container wrapper">
          <div className="add-info row">
            <div className="col-6 form-group">
              <span className="name">
                <FormattedMessage id="admin.manage-handbook.name" />
              </span>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "name")}
                value={this.state.name}
              />
            </div>
            <div className="col-6 form-group">
              <span className="name">Ghi chú</span>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeInput(event, "note")}
                value={this.state.note}
              />
            </div>
            <div>
              <button
                className="btn btn-primary mt-5"
                onClick={() => this.handleSave()}
                disabled={!this.state.name ? "disabled" : false}
              >
                <FormattedMessage id="admin.manage-handbook.save" />
              </button>
            </div>
            <div className="list-handbook">
              <TableManage
                listRender={this.state.listHandbookSearch}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}
                handleSearch={this.handleSearch}
                handleOpenSearch={this.handleOpenSearch}
                isSearch={this.state.isSearch}
              />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
