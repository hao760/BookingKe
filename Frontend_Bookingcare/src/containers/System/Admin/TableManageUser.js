import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";

import "react-markdown-editor-lite/lib/index.css";

////
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllUser("All");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        users: this.props.users,
      });
    }
  }

  handleDeleteUser = (id) => {
    this.props.deleteUser(id);
  };
  handleEditUser = (userData) => {
    this.props.handleEditUser(userData);
  };
  render() {
    const arrUsers = this.state.users;
    return (
      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <div className="users-container">
          <div className="users-table mt-3 mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th className="col-2">Email</th>
                  <th className="col-2">
                    <FormattedMessage id="manage-user.firstName" />
                  </th>
                  <th className="col-2">
                    <FormattedMessage id="manage-user.lastName" />
                  </th>
                  <th className="col-3">
                    <FormattedMessage id="manage-user.address" />
                  </th>
                  <th className="col-1">
                    <FormattedMessage id="manage-user.action" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {arrUsers &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="btn btn-edit"
                            onClick={() => {
                              this.handleEditUser(item);
                            }}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => {
                              this.handleDeleteUser(item.id);
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
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUser: (type) => dispatch(actions.fetchAllUserStart(type)),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
