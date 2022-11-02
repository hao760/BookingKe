/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

// slide slick
import Slider from "react-slick";
class About extends Component {
  render() {
    return (
      <>
        <div className="section section-about">
          <div className="section-container">
            <div className="section-header">
              <div className="title-section">
                Truyền thông nói về BookingCare
              </div>
            </div>
            <div className="about-content">
              <div className="content-left">
                <iframe
                  width="100%"
                  height="400px"
                  src="https://www.youtube.com/embed/Db7xzarI3B8?controls=0"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="content-right"></div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
