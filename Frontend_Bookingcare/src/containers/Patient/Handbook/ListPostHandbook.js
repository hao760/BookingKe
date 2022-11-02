import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ListPostHandbook.scss";
import { FormattedMessage } from "react-intl";
import SubHeader from "../../HomePage/SubHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import ListNameHandbook from "./ListNameHandbook";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import RelatedHandbook from "./RelatedHandbook";
import { getAHandbook } from "../../../services/userService";

class ListPostHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handbook: "",
      relatedHandBook: [],
    };
  }

  async componentDidMount() {
    const handbookId = this.props.match.params.id;
    const res = await getAHandbook(handbookId);
    if (res && res.errCode === 0) {
      this.setState({
        handbook: res.data,
      });
    } else {
      toast.error("Get Handbook Failed");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.componentDidMount();
    }
  }

  render() {
    const { language } = this.props;
    const { handbook, relatedHandBook } = this.state;
    return (
      <>
        <SubHeader />
        <div className="handbook-header-container">
          {handbook && (
            <div className="handbook-header">
              <div className="grid">
                <h1 className="handbook-name">{handbook.name}</h1>
                <div className="handbook-note">
                  {handbook.note ? handbook.note : ""}
                </div>
              </div>
            </div>
          )}

          <RelatedHandbook
            handbookId={this.props.match.params.id}
          />
          <ListNameHandbook />
        </div>
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
  connect(mapStateToProps, mapDispatchToProps)(ListPostHandbook)
);
