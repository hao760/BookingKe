import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// slide slick
import Slider from "react-slick";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import * as action from "../../../store/actions";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidMount() {
    this.props.fetchTopDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listTopDoctor !== this.props.listTopDoctor) {
      this.setState({
        arrDoctor: this.props.listTopDoctor,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  handleClickViewMore = () => {
    if (this.props.history) this.props.history.push(`/render-list/doctor`);
  };
  render() {
    const { arrDoctor } = this.state;
    const { language } = this.props;
    return (
      <>
        <div className="section section-doctor">
          <div className="section-container">
            <div className="section-header">
              <div className="title-section">
                <FormattedMessage id="homepage.outstanding-doctor" />
              </div>
              <div
                className="btn-section"
                onClick={() => this.handleClickViewMore()}
              >
                <FormattedMessage id="homepage.looking" />
              </div>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctor &&
                  arrDoctor.length > 0 &&
                  arrDoctor.map((item, index) => {
                    let nameVI = `${item.positionData.valueVI} || ${item.firstName} ${item.lastName} `;
                    let nameEN = `${item.positionData.valueEN} || ${item.lastName} ${item.firstName}`;
                    return (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleViewDetailDoctor(item)}
                      >
                        <div className="outer-bg">
                          <div
                            className="bg-image"
                            style={{ backgroundImage: `url(${item.image})` }}
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div className="section-body-title">
                            {language === languages.VI ? nameVI : nameEN}
                          </div>
                          {/* <div className="section-body-sub-title">
                            Backend Developer
                          </div> */}
                        </div>
                      </div>
                    );
                  })}
              </Slider>
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
    listTopDoctor: state.admin.listTopDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctor: () => dispatch(action.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
