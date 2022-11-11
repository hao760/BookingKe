import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllPacketService } from "../../../services/userService";
import SubHeader from "../../HomePage/SubHeader";
import "./Packet.scss";
// import { FormattedMessage } from "react-intl";

class Packet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPacket: "",
      listDanhMuc: [],
    };
  }

  async componentDidMount() {
    let data = await getAllPacketService();
    console.log("data.data1", data.data);
    this.setState({
      listPacket: data.data,
    });
    console.log("data.data2", data.data);

    this.setState({
      listDanhMuc: [
        {
          image:
            "https://res.cloudinary.com/dhzi2feeu/image/upload/v1668138755/Booking/095803-nangcao_styns8.webp",
          name: "Cơ bản",
        },
        {
          image:
            "https://res.cloudinary.com/dhzi2feeu/image/upload/v1668138755/Booking/095749-khamtongquat_pqfvt8.webp",
          name: "Nâng cao",
        },
        {
          image:
            "https://res.cloudinary.com/dhzi2feeu/image/upload/v1668138755/Booking/095756-nam_dwo3c6.webp",
          name: "Nam",
        },
        {
          image:
            "https://res.cloudinary.com/dhzi2feeu/image/upload/v1668138755/Booking/095828-nu_y9mqqu.webp",
          name: "Nữ",
        },
      ],
    });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    const { language } = this.props;
    let listPacket1 = this.state.listPacket;
    let listDanhMuc1 = this.state.listDanhMuc;
    console.log(listDanhMuc1);
    return (
      <>
        <SubHeader />
        {/* <div style={{textAlign:"center"}} className="container"> */}
        <div className="container">
          <h1 className="titlePage">Chọn danh mục</h1>
          <div className="row">
            {listDanhMuc1 &&
              listDanhMuc1.map((item) => {
                return (
                  <div className="col-3 cardDanhMuc">
                    <img src={item.image} className="imgDanhMuc" alt="" />
                    <div className="nameDanhMuc">{item.name}</div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="row">
          <h2 className="titlePage">Gói khám nổi bật</h2>
          {listPacket1 != "" &&
            listPacket1.map((item) => {
              return (
                <div
                  className="col-3 item"
                  style={{
                    height: "auto",
                    transform: "scale(0.9, 0.9)",
                  }}
                >
                  <img
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: `auto 100%`,
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <label className="title">{item.title}</label>
                  <label className="price">
                    Giá : <b>{item.price}đ</b>
                  </label>
                </div>
              );
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Packet);
