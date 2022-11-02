import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./MenuSide.scss";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

class MenuSide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    const { language } = this.props;

    return (
      <>
        <Modal size="lg" isOpen={true} centered>
          <ModalHeader toggle={() => this.toggle()}>
            <FormattedMessage id="patient.booking-modal.title" />
          </ModalHeader>

          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveUser()}
            >
              <FormattedMessage id="patient.booking-modal.save" />
            </Button>
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              <FormattedMessage id="patient.booking-modal.cancel" />
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuSide);
