import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./DetailHandbook.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import HomeFooter from "../../HomePage/HomeFooter";
import ListNameHandbook from "./ListNameHandbook";
import RelatedHandbook from "./RelatedHandbook";
import { getDetailHandbook } from "../../../services/userService";

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailHandbook: "",
      listHandbook: [],
    };
  }

  async componentDidMount() {
    const handbookId = this.props.match.params.id;
    const res = await getDetailHandbook(handbookId);
    if (res && res.errCode === 0) {
      this.setState({
        detailHandbook: res.data,
      });
    } else {
      toast.error("Get Detail Handbook Failed");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.componentDidMount();
    }
  }

  renderNoteHandbook = () => {
    let content;
    if (this.props.language === languages.VI)
      content =
        "BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.";
    else
      content = `BookingCare is Vietnam's leading comprehensive healthcare platform connecting users with over 150 prestigious hospitals - clinics, more than 1,000 good specialists and thousands of quality medical products and services high.`;
    return (
      <div className="handbook-note-hash">
        <div className="right">
          <i className="fas fa-lightbulb"></i>
        </div>
        <div className="left">{content}</div>
      </div>
    );
  };

  render() {
    const { language } = this.props;
    const { detailHandbook } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="handbook-container grid">
          <h1 className="handbook-title">
            {detailHandbook.title ? detailHandbook.title : ""}
          </h1>
          <div className="handbook-description">
            {detailHandbook.description ? detailHandbook.description : ""}
          </div>
          {this.renderNoteHandbook()}
          {detailHandbook && detailHandbook.contentHTML && (
            <p
              className="handbook-content"
              contentEditable="true"
              dangerouslySetInnerHTML={{
                __html: detailHandbook.contentHTML,
              }}
            ></p>
          )}
          <div className="handbook-footer">
            <p className="handbook-footer_note">
              {detailHandbook.note ? detailHandbook.note : ""}
            </p>
            <div className="detail-handbook"></div>
          </div>
        </div>
        <RelatedHandbook
          handbookId={this.props.match.params.id}
          isShowHeader={true}
        />
        <ListNameHandbook />
        <HomeFooter />
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
  connect(mapStateToProps, mapDispatchToProps)(DetailHandbook)
);
