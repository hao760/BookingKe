import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import { getRelatedHandbook } from "../../../services/userService";

class RelatedHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedHandBook: [],
    };
  }

  async componentDidMount() {
    this.getRelatedhandbook(this.props.handbookId);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.handbookId !== prevProps.handbookId) {
      this.getRelatedhandbook(this.props.handbookId);
    }
  }
  getRelatedhandbook = async (id) => {
    const res = await getRelatedHandbook(id);
    if (res && res.errCode === 0) {
      this.setState({
        relatedHandBook: res.data,
      });
    } else {
      toast.error("Get Related Handbook Failed");
    }
  };
  handleCLickRelatedhandbook = (id) => {
    this.props.history.push(`/detail-handbook/${id}`);
  };
  render() {
    const { language } = this.props;
    const { relatedHandBook } = this.state;
    return (
      <div className="handbook-related grid">
        <ul className="list-handbook-related">
          {this.props.isShowHeader && (
            <h1 className="title-related">
              <FormattedMessage id="admin.manage-handbook.related_post" />
            </h1>
          )}
          {relatedHandBook &&
            relatedHandBook.length > 0 &&
            relatedHandBook.map((item, index) => {
              return (
                <li
                  className="handbook-related_item"
                  key={index}
                  onClick={() => this.handleCLickRelatedhandbook(item.id)}
                >
                  <div
                    className="item-image"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                  {/* <img className="item-image" src={item.image} /> */}
                  <h4 className="item-title">{item.title ? item.title : ""}</h4>
                </li>
              );
            })}
        </ul>
        <hr className="seperate-section" />
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RelatedHandbook)
);
