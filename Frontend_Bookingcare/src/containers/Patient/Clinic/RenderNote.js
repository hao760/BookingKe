import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { languages } from "../../../utils";

const RenderNote = ({ curLang }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (curLang === languages.VI)
      setText(
        "BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao."
      );
    else
      setText(
        `BookingCare is the leading comprehensive healthcare platform in Vietnam connecting users with 150 prestigious hospitals - clinics, more than 1,000 good specialists and high quality medical products, services and products.`
      );
  }, [curLang]);

  return (
    <div className="note-bookingcare">
      <div className="right">
        <i className="fas fa-lightbulb"></i>
      </div>
      <div className="left">{text}</div>
    </div>
  );
};

export default RenderNote;
