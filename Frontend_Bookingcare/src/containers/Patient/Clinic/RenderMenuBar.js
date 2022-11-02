import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

const keyMenu = [
  {
    value: "serviceHTML",
    id: "#service",
  },
  {
    value: "strengthHTML",
    id: "#strength",
  },
  {
    value: "equipmentHTML",
    id: "#equipment",
  },
  {
    value: "locationHTML",
    id: "#location",
  },
  {
    value: "treatmentHTML",
    id: "#treatment",
  },
  {
    value: "examinationHTML",
    id: "#examination",
  },
];
const RenderMenuBar = ({ list, handleSeeMore }) => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    if (!list || _.isEmpty(list)) return;
    const SetMenu = () => {
      let itemMenu = [];
      itemMenu.push({
        id: "#introduce",
        value: "introduce",
      });
      let keys = Object.keys(list);
      console.log(
        "🚀 ~ file: RenderMenuBar.js ~ line 43 ~ useEffect ~ keys",
        keys
      );
      keys.forEach((item) => {
        keyMenu.forEach((element) => {
          if (element.value === item) {
            itemMenu.push({
              id: element.id,
              value: element.value,
            });
          }
        });
      });
      setMenu(itemMenu);
      console.log("menu", menu);
    };
    SetMenu();
  }, [list]);
  return (
    <ul className="menu-detail">
      {/* {menu.map((item, index) => {
        return (
          <li key={index} onClick={handleSeeMore(true)}>
            <a href={item.id}>{item.name}</a>
          </li>
        );
      })} */}
    </ul>
  );
};

export default RenderMenuBar;
