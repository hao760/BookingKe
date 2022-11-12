import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./Detail-packet.scss";
import { FormattedMessage } from "react-intl";
import { getDetailPacketByID } from "../../../services/userService";
import SubHeader from "../../HomePage/SubHeader";

class Detail_packet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailPacket: "",
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    let data = await getDetailPacketByID(id);
    this.setState({
      detailPacket: data.data,
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    const { language } = this.props;
    let detailPacket = this.state.detailPacket;
    return (
      <>
        <SubHeader name={detailPacket.title} />
        <div className="page">
          <div className="row ms-5 mt-5">
            <img className="imgpacket col-2" src={detailPacket.image} />
            <div className="col-8">
              <div className="title">
                <b>{detailPacket.title}</b>
              </div>
              <div className="description col-11 ">
              {detailPacket.description}
              </div>
            </div>
          </div>
          <div className="col-4 mt-5 address">
            <b>ĐỊA CHỈ GÓI</b>
            <div>
              Phòng khám Đa khoa Olympus Gia Mỹ 33 Nguyễn Huy Lượng, Phường 14,
              Quận Bình Thạnh, TP. Hồ Chí Minh GIÁ GÓI: 2.210.000đ2.410.000đ.
            </div>{" "}
            Xem chi tiết
          </div>
          <div className="col-5 markdown">
            <div>
              {detailPacket && detailPacket.contentHTML && (
                <div
                  contentEditable="false"
                  dangerouslySetInnerHTML={{
                    __html: detailPacket.contentHTML,
                  }}
                ></div>
              )}
            </div>
            tổng quát
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail_packet);
