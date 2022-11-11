import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/Header/Header";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import ManageSpecialty from "../containers/System/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Clinic/ManageClinic";
import ManageDetailClinic from "../containers/System/Clinic/ManageDetailClinic";
import ManageDetailSpecialty from "../containers/System/Specialty/ManageDetailSpecialty";
import ManageHandbook from "../containers/System/Handbook/ManageHandbook";
import ManageDetailHandbook from "../containers/System/Handbook/ManageDetailhandbook"; //commnet nek
import Packet_examination from "../containers/System/Packet_examination/Packet_examination";

// import ManageDetailHandbook from "../containers/"
import { USER_ROLE } from "../utils/constant";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn, userInfo } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        {/* {userInfo && userInfo.roleId === USER_ROLE.ADMIN && ( */}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route path="/system/manage-clinic" component={ManageClinic} />
              <Route
                path="/system/manage-handbook"
                component={ManageHandbook}
              />
              <Route
                path="/system/manage-detail-clinic"
                component={ManageDetailClinic}
              />
              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route
                path="/system/manage-detail-specialty"
                component={ManageDetailSpecialty}
              />
              <Route
                path="/system/manage-detail-handbook"
                component={ManageDetailHandbook}
              />
               <Route
                path="/system/packet_examination"
                component={Packet_examination}
              />

              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
        {/* )} */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    userInfo: state.user.userInfo,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
