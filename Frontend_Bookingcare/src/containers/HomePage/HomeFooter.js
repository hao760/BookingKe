/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./HomeFooter.scss";

// slide slick
import Slider from "react-slick";
class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="footer-container">
          <div className="company-info">
            <div className="lg"></div>
            <div className="address">
              <p>Công ty Cổ phần Công nghệ BookingCare</p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
              </p>
              <p>
                <i className="fas fa-check"></i>
                ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015
              </p>
            </div>
          </div>
          <div className="company-headquarters">
            <span>
              <p className="name">Trụ sở tại Hà Nội</p>
              28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
            </span>
            <span>
              <p className="name">Văn phòng tại TP Hồ Chí Minh</p>
              Số 01, Hồ Bá Kiện, Phường 15, Quận 10
            </span>
            <span>
              <p className="name">Hỗ trợ khách hàng</p>
              Hỗ trợ khách hàng
            </span>
          </div>
        </div>
        <div className="author">
          <p>&copy; 2022 Đào Mạnh Hùng.</p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
