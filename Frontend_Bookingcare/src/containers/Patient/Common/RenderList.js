/* eslint-disable default-case */
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./RenderList.scss";
import { FormattedMessage } from "react-intl";
import { TYPE } from "../../../utils";
import SubHeader from "../../HomePage/SubHeader";
import { getSpecialties } from "../../../services/userService";

class RenderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRender: [],
      listRenderSearch: [],
      isSearch: false,
      textSearch: "",
    };
  }

  componentDidMount() {
    this.renderByType();
    const type = this.props.match.params.type;
    if (type === TYPE.DOCTOR || type === TYPE.CLINIC)
      this.setState({
        isSearch: !this.state.isSearch,
      });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.renderByType();
    }
  }
  renderByType = () => {
    const type = this.props.match.params.type;
    switch (type) {
      case TYPE.SPECIALTY: {
        this.setState({
          isSearch: false,
          listRender: this.props.listSpecialty,
          listRenderSearch: this.props.listSpecialty,
        });
        break;
      }
      //   case TYPE.PACKET: {
      //     res = await
      //     break;

      //   }
      case TYPE.CLINIC: {
        this.setState({
          listRenderSearch: this.props.listClinic,
          listRender: this.props.listClinic,
          isSearch: true,
          textSearch: "",
        });
        break;
      }
      case TYPE.DOCTOR: {
        this.setState({
          isSearch: true,
          listRenderSearch: this.props.listDoctor,
          textSearch: "",
          listRender: this.props.listDoctor,
        });
        break;
      }
    }
  };
  toOtherPage = (id) => {
    const type = this.props.match.params.type;
    switch (type) {
      case TYPE.SPECIALTY: {
        if (this.props.history)
          this.props.history.push(`/detail-specialty/${id}`);

        break;
      }
      //   case TYPE.PACKET: {
      //       if (this.props.history) this.props.history.push(`/render-list/${id}`);

      //   }
      case TYPE.CLINIC: {
        if (this.props.history) this.props.history.push(`/detail-clinic/${id}`);

        break;
      }
      case TYPE.DOCTOR: {
        if (this.props.history) this.props.history.push(`/detail-doctor/${id}`);

        break;
      }
    }
  };
  renderPlaceHolder = () => {
    const type = this.props.match.params.type;
    let text;
    switch (type) {
      case TYPE.CLINIC: {
        if (this.props.language === languages.VI)
          text = `Tìm kiếm bệnh viện, phòng khám`;
        else text = `Search hospitals, clinics`;
        break;
      }
      case TYPE.DOCTOR: {
        if (this.props.language === languages.VI) text = `Tìm kiếm bác sĩ`;
        else text = `Search doctocs`;
        break;
      }
    }
    return text;
  };
  handleSearch = (event) => {
    let input = event.target.value;
    this.setState({
      textSearch: input,
    });
    const type = this.props.match.params.type;
    let dataSearch = this.state.listRender;
    if (input === "")
      this.setState({
        listRenderSearch: this.state.listRender,
      });
    if (type === TYPE.DOCTOR)
      dataSearch = dataSearch.filter((e) => {
        return e.lastName.toLowerCase().includes(input.toLowerCase());
      });
    else
      dataSearch = dataSearch.filter((e) => {
        return e.name.toLowerCase().includes(input.toLowerCase());
      });
    this.setState({
      listRenderSearch: dataSearch,
    });
  };
  //   renderName = () => {
  //     const type = this.props.match.params.type;
  //     if (type === TYPE.DOCTOR)
  //       return (
  //         <div>
  //           <label className="name">
  //             {item.name ? item.name : `${item.firstName + " " + item.lastName}`}
  //           </label>
  //         </div>
  //       );
  //   };
  render() {
    const { language } = this.props;
    const { listRenderSearch, isSearch } = this.state;
    return (
      <>
        <SubHeader />
        {isSearch && (
          <div className="search-bar">
            <input
              className="search"
              placeholder={this.renderPlaceHolder()}
              onChange={(event) => this.handleSearch(event)}
              value={this.state.textSearch}
            />
          </div>
        )}
        <div className="list-render">
          {listRenderSearch &&
            listRenderSearch.length > 0 &&
            listRenderSearch.map((item) => {
              return (
                <div
                  key={item.id}
                  className="item-info"
                  onClick={() => {
                    this.toOtherPage(item.id);
                  }}
                >
                  {item.image && (
                    <div
                      className="image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    ></div>
                  )}
                  <div className="name">
                    {item.positionData && (
                      <label>
                        {this.props.language === languages.VI
                          ? `${item.positionData.valueVI}  `
                          : `${item.positionData.valueEN}  `}
                      </label>
                    )}
                    <span>
                      {item.name
                        ? item.name
                        : `${" " + item.firstName + " " + item.lastName}`}
                    </span>
                    {item.Doctor_Info &&
                      item.Doctor_Info.doctorSpecialtyData && (
                        <span className="sub-title">
                          {item.Doctor_Info.doctorSpecialtyData.name}
                        </span>
                      )}
                  </div>
                </div>
              );
            })}
        </div>
        {/* <HomeFooter /> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listClinic: state.admin.listClinicHome,
    listDoctor: state.admin.listTopDoctor,
    listSpecialty: state.admin.listSpecialty,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    /*  fetchTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    getListClinicHome: () => dispatch(actions.getListClinicHome()),
    getSpecialtiesHome: () => dispatch(actions.getSpecialtiesHome()), */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderList);
