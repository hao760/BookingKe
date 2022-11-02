import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ListNameHandbook.scss";
import { withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { getListHandbook } from "../../../services/userService";

class ListNameHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHandbook: [],
    };
  }

  async componentDidMount() {
    const resListHB = await getListHandbook();
    if (resListHB && resListHB.errCode === 0) {
      this.setState({
        listHandbook: resListHB.data,
      });
    } else {
      toast.error("Get Detail Handbook Failed");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleCLickHandbook = (id) => {
    this.props.history.push(`/list-post-handbook/${id}`);
  };
  render() {
    const { language } = this.props;
    const { listHandbook } = this.state;

    return (
      <>
        <div className="list-handbook grid">
          <p className="list-handbook-title">danh mục cẩm nang</p>
          <div className="list-handbook-container">
            {listHandbook &&
              listHandbook.length > 0 &&
              listHandbook.map((item, index) => {
                return (
                  <p
                    className="item-name-handbook"
                    key={index}
                    onClick={() => this.handleCLickHandbook(item.id)}
                  >
                    {item.name}
                  </p>
                );
              })}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListNameHandbook)
);
