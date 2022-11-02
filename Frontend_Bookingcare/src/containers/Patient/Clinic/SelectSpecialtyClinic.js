import React from "react";
import { FormattedMessage } from "react-intl";

const SelectSpecialtyClinic = ({ handleChooseSpecialty, isShow }) => {
  return (
    <>
      {isShow && (
        <div className="clinic-booking" onClick={() => handleChooseSpecialty()}>
          <span className="select-specialty">
            <FormattedMessage id="patient.detail-doctor.select-specialty" />
          </span>
        </div>
      )}
    </>
  );
};

export default SelectSpecialtyClinic;
