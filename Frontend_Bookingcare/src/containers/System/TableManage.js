import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManage.scss";
import { FormattedMessage } from "react-intl";

class TableManange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRender: [],
    };
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.listRender !== prevProps.listRender) {
      this.setState({
        listRender: this.props.listRender,
      });
    }
  }
  handleOpenSearch = () => {
    this.props.handleOpenSearch();
  };
  handleSearch = (event) => {
    let input = event.target.value;
    this.props.handleSearch(input);
  };
  handleEdit = (data) => {
    this.props.handleEdit(data);
  };
  handleDelete = (id) => {
    this.props.handleDelete(id);
  };
  render() {
    const { language } = this.props;
    const { listRender } = this.state;

    return (
      <div className="my-custom-scrollbar ">
        <table id="table">
          <thead>
            <tr>
              <th className="col-2">
                <div className="row-name">
                  <FormattedMessage id="admin.manage-handbook.name" />
                  <i
                    className="fas fa-search"
                    onClick={() => this.handleOpenSearch()}
                  ></i>
                </div>
                <input
                  className="search-input"
                  type={this.props.isSearch ? "" : "hidden"}
                  onChange={(event) => this.handleSearch(event)}
                />
              </th>
              <th className="col-1">
                <FormattedMessage id="manage-user.action" />
              </th>
            </tr>
          </thead>
          <tbody>
            {listRender &&
              listRender.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.name ? item.name : item.title}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => {
                          this.handleEdit(item);
                        }}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => {
                          this.handleDelete(item.id);
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManange);
