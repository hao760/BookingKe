const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

exports.sendSimpleEmail = async (data) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
      clientId: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      refreshToken: process.env.REFRESHTOK,
      accessToken: process.env.ACCESSTOK,
    },
  });

  const sendMailVi = `<h3>Xin chào ${data.patientName} </h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh trên trang bookingcare.vn</p>
    <p>Thông tin khám bệnh: </p>
    <div><b>Thời gian: ${data.time}</b></div>
    <div><b>Bác sĩ: ${data.doctorName}</b></div>
    <p>Nếu mọi thông tin chính xác, vui lòng <a href=${data.redirectLink}>Click here</a>, xin cảm ơn.</p>
    `;
  const sendMailEn = `<h3>Hi, ${data.patientName} </h3>
    <p>Thanks for your booking online medical appointment on Bookingcare.VN </p>
    <p>Examination information: </p>
    <div><b>Time: ${data.time}</b></div>
    <div><b>Doctor: ${data.doctorName}</b></div>
    <p>if all information is correct! Please<a href=${data.redirectLink}>Click here</a>, thanks.</p>
    `;
  let info = await transporter.sendMail({
    from: '"BookingCare VN" <daomanhhung1202@gmail.com>',
    to: data.reciverEmail,
    subject: "Thông tin đặt lịch khám bệnh",
    html: data.language === "vi" ? sendMailVi : sendMailEn,
  });
};

let getBodyHTMLEmailRemedy = (dataSent) => {
  let result = "";
  if (dataSent.language === "vi") {
    result = `
    <h3>Xin chào ${dataSent.fullName}.</h3>
    <p>Bạn nhận được mail này vì đã khám bệnh online trên trang website bookingcare của chúng tôi.</p>
    <p>Thông tin đơn thuốc/ hóa đơn được gửi kèm trong email.</p>
    <p>Xin chân thành cảm ơn!</p>
    `;
  } else {
    result = `
    <h3>hi, ${dataSent.fullName}.</h3>
    <p>You received this email because of your online medical examination on our bookingcare website.</p>
    <p>Prescription/invoice information is included in the email.</p>
    <p>Best regard!</p>
    `;
  }
  return result;
};

let getBodyHTMLEmail = (dataSent) => {};
exports.sendAttachment = async (dataSent) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
        clientId: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        refreshToken: process.env.REFRESHTOK,
        accessToken: process.env.ACCESSTOK,
      },
    });
    let info = await transporter.sendMail({
      from: '"BookingCare VN" <daomanhhung1202@gmail.com>',
      to: dataSent.email,
      subject: "Kết quả đặt lịch khám bệnh",
      html: getBodyHTMLEmailRemedy(dataSent),
      attachments: [
        {
          filename: `remedy-${dataSent.patientId}-${new Date().getTime()}.png`,
          content: dataSent.image.split("base64,")[1],
          encoding: "base64",
        },
      ],
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: emailService.js ~ line 94 ~ exports.sendAttachment= ~ error",
      error
    );
  }
};
