import "./TableSpecialtyClinic.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listSpecialty: state.admin.listSpecialtyByClinic,
  };
};

const TableSpecialtyClinic = (props) => {
  const handleClickSpecialty = (id) => {
    const clinicId = props.match.params.id;
    props.history.push(
      `/detail-clinic-specialty/clinicId=${clinicId}/specialtyId=${id}`
    );
  };
  return (
    <>
      <HomeHeader />
      <ul className="menu-clinic-specialty">
        {props.listSpecialty &&
          props.listSpecialty.length > 0 &&
          props.listSpecialty.map((item) => {
            return (
              <li key={item.id} onClick={() => handleClickSpecialty(item.id)}>
                {item.name}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default withRouter(connect(mapStateToProps)(TableSpecialtyClinic));
