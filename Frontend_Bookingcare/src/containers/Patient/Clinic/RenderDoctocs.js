import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import { getListDoctorClinic } from "../../../services/userService";
import { toast } from "react-toastify";

const RenderDoctocs = ({ clinicId }) => {
  const [listDoctor, setListDoctor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!clinicId) return;
      let res = await getListDoctorClinic({
        provinceId: "all",
        clinicId: clinicId,
      });
      if (res && res.errCode === 0) setListDoctor(res.data);
      else toast.error(`Get List Doctor's Clinic Failed`);
    };
    fetchData();
  }, [clinicId]);

  return (
    <div className="body-container">
      <div className="detail-specialy-container grid">
        {listDoctor &&
          listDoctor.length > 0 &&
          listDoctor.map((item, index) => {
            return (
              <div className="section" key={index}>
                <div
                  className="info-doctor"
                  onDoubleClick={() => this.handleToDetailDoctor(item.doctorId)}
                >
                  <ProfileDoctor
                    doctorId={item.doctorId}
                    isShowDescription={true}
                  />
                </div>
                <div className="schedule-doctor">
                  <DoctorSchedule doctorId={item.doctorId} doctor_info={item} />
                  <hr />
                  <DoctorExtraInfo doctorId={item.doctorId} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RenderDoctocs;
