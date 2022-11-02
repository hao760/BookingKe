import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { CommonUtils } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import moment from "moment";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      image: "",
      // previewImgUrl:'',
    };
  }

  componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  toggle = () => {
    this.props.closeRemedyModal();
  };
  handleChangEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    const data = event.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // const url = URL.createObjectURL(file);
      this.setState({
        // previewImgUrl: url,
        image: base64,
      });
    }
  };
  handleSend = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    const { language, dataModal } = this.props;
    return (
      <>
        <Modal size="md" isOpen={this.props.isOpen} centered>
          <ModalHeader toggle={() => this.toggle()}>
            Gửi hóa đơn thanh toán
          </ModalHeader>
          <div className="row">
            <div className="col-6">
              <span>Email bệnh nhân</span>
              <input
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleChangEmail(event)}
              />
            </div>
            <div className="col-6">
              <span>Chọn file đơn thuốc</span>
              <input
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
          </div>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSend()}
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
