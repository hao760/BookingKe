/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils";
import * as action from "../../../store/actions";
import { withRouter } from "react-router-dom";

// slide slick
import Slider from "react-slick";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listSpecialty: [],
    };
  }
  componentDidMount() {
    this.props.getSpecialtiesHome();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.listSpecialty !== prevProps.listSpecialty) {
      this.setState({
        listSpecialty: this.props.listSpecialty,
      });
    }
  }
  handleViewDetailSpecialty = (doctor) => {
    this.props.history.push(`/detail-specialty/${doctor.id}`);
  };
  handleClickViewMore = () => {
    if (this.props.history) this.props.history.push(`/render-list/specialty`);
  };

  render() {
    let { listSpecialty } = this.state;

    return (
      <>
        <div className="section section-specialty">
          <div className="section-container">
            <div className="section-header">
              <div className="title-section">
                <FormattedMessage id="homepage.specialty-popular" />
              </div>
              <div
                className="btn-section"
                onClick={() => this.handleClickViewMore()}
              >
                <FormattedMessage id="homepage.more-info" />
              </div>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {listSpecialty &&
                  listSpecialty.length > 0 &&
                  listSpecialty.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="section-customize"
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="section-body-title">{item.name}</div>
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
    language: state.app.language,
    listSpecialty: state.admin.listSpecialty,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpecialtiesHome: () => dispatch(action.getSpecialtiesHome()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
