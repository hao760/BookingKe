import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import { languages } from "../../utils";
import { connect } from "react-redux";
import "./BookingModal.scss";
import { FormattedMessage } from "react-intl";

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  confirmModal = (confirm) => {
    this.setState({
      isOpen: true,
    });
    this.props.confirmModal(confirm);
  };
  redner() {
    return (
      <Modal isOpen={true} centered>
        <ModalHeader closeButton>
          {this.props.language === languages.EN
            ? "Delete Confirmation"
            : "Xác Nhận Xóa"}
        </ModalHeader>
        <div className="alert alert-danger">
          {this.props.language === languages.EN
            ? "Are you sure you want to delete? "
            : "Bạn có chắc chắn muốn xóa?"}
        </div>
        <ModalFooter>
          <Button variant="default" onClick={() => this.confirmModal(false)}>
            {this.props.language === languages.EN ? "Cancel" : "Thoát"}
          </Button>
          <Button variant="danger" onClick={() => this.confirmModal(true)}>
            {this.props.language === languages.EN ? "Delete" : "Xóa"}
          </Button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
