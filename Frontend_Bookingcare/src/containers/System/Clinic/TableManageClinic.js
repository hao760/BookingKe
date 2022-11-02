import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageClinic.scss";
import * as actions from "../../../store/actions";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
      listClinicSearCh: [],
      isSearch: false,
    };
  }
  componentDidMount() {
    this.props.getListClinicHome();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listClinic !== this.props.listClinic) {
      this.setState({
        listClinic: this.props.listClinic,
        listClinicSearCh: this.props.listClinic,
      });
    }
  }
  handleOpenSearch = () => {
    this.setState({
      isSearch: !this.state.isSearch,
    });
  };
  handleDeleteClinic = (id) => {
    this.props.deleteClinic(id);
  };
  handleEditClinic = (userData) => {
    this.props.editClinic(userData);
  };
  handleSearch = (event) => {
    let input = event.target.value;
    let dataSearch = this.state.listClinic;
    if (input === "")
      this.setState({
        listClinicSearCh: this.state.listClinic,
      });
    dataSearch = dataSearch.filter((e) => {
      return e.name.toLowerCase().includes(input.toLowerCase());
    });
    this.setState({
      listClinicSearCh: dataSearch,
    });
  };
  render() {
    const { listClinicSearCh } = this.state;
    return (
      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <div className="clinic-container">
          <div className="clinic-table mt-3 mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th className="col-2">
                    <div className="row-name">
                      <FormattedMessage id="admin.manage-clinic.name" />
                      <i
                        className="fas fa-search"
                        onClick={() => this.handleOpenSearch()}
                      ></i>
                    </div>
                    <input
                      className="search-input"
                      type={this.state.isSearch ? "" : "hidden"}
                      onChange={(event) => this.handleSearch(event)}
                    />
                  </th>
                  <th className="col-3">
                    <FormattedMessage id="admin.manage-clinic.address" />
                  </th>
                  <th className="col-1">
                    <FormattedMessage id="manage-user.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {listClinicSearCh &&
                  listClinicSearCh.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => {
                              this.handleEditClinic(item);
                            }}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => {
                              this.handleDeleteClinic(item.id);
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinicHome,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    // deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
