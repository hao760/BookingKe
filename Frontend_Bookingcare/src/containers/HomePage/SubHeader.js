/* eslint-disable default-case */
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./SubHeader.scss";
import { languages } from "../../utils";
import { changLanguageApp } from "../../store/actions";
import { withRouter } from "react-router-dom";
import { TYPE } from "../../utils";

class SubHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changeLanguage = (language) => {
    this.props.changLanguageAppRedux(language);
  };
  returnHome = () => {
    if (this.props.history) this.props.history.push(`/home`);
  };
  renderListSelect = (type) => {
    if (this.props.history) this.props.history.push(`/render-list/${type}`);
  };
  backPreviousPage = () => {
    this.props.history.goBack();
  };
  rendeTitleContent = () => {
    let type;
    if (this.props.match.params.type) type = this.props.match.params.type;
    else return "";
    switch (type) {
      case TYPE.SPECIALTY: {
        type = <FormattedMessage id="home-header.sub-specialty" />;
        break;
      }
      case TYPE.PACKET: {
        type = <FormattedMessage id="home-header.sub-packet" />;
        break;
      }
      case TYPE.CLINIC: {
        type = <FormattedMessage id="home-header.sub-clinic" />;
        break;
      }
      case TYPE.DOCTOR: {
        type = <FormattedMessage id="home-header.sub-doctor" />;
        break;
      }
    }
    return <div className="title-content">{type}</div>;
  };
  render() {
    const language = this.props.language;
    return (
      <>
        <div className="home-header-container sub-menu">
          <div className="home-header-content ">
            <div className="left-container ">
              <i
                className="fas fa-arrow-circle-left"
                onClick={this.props.history.goBack}
              ></i>
              {this.rendeTitleContent()}
              {this.props.name ? (
                <div className="title-content">{this.props.name}</div>
              ) : (
                " "
              )}
            </div>
            {this.props.isShowSupport && (
              <div className="right-container">
                <i className="fas fa-question-circle"></i>
                <span>
                  <FormattedMessage id="home-header.support" /> |
                </span>
                <div
                  className={
                    language === languages.VI ? "lang-vi active" : "lang-vi"
                  }
                >
                  <span onClick={() => this.changeLanguage(languages.VI)}>
                    VN
                  </span>
                </div>
                <div
                  className={
                    language === languages.EN ? "lang-en active" : "lang-en"
                  }
                >
                  <span onClick={() => this.changeLanguage(languages.EN)}>
                    EN
                  </span>
                </div>
              </div>
            )}
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
  return {
    changLanguageAppRedux: (language) => dispatch(changLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubHeader)
);
