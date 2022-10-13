import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Dialogs.module.css";

const Dialogs = (props) => {
  return (
    <div>
      <div className={s.dialogs}>
        <div className={s.dialogsItems}>
          <div className={s.dialog}>
            <NavLink
              to="/dialogs/Dron"
              className={(navData) =>
                navData.isActive ? s.active : s.dialog
              }
            >
              Dron
            </NavLink>
          </div>
          <div className={s.dialog}>
            <NavLink
              to="/dialogs/Lapko"
              className={(navData) =>
                navData.isActive ? s.active : s.dialog
              }
            >
              Lapko
            </NavLink>
          </div>
          <div className={s.dialog}>
            <NavLink
              to="/dialogs/Baraka"
              className={(navData) =>
                navData.isActive ? s.active : s.dialog
              }
            >
              Baraka Obeme
            </NavLink>
          </div>
          <div className={s.dialog}>
            <NavLink
              to="/dialogs/Valera"
              className={(navData) =>
                navData.isActive ? s.active : s.dialog
              }
            >
              Valera
            </NavLink>
          </div>
        </div>
        <div className={s.messages}>
          <div className={s.dialog}>hi</div>
          <div className={s.dialog}>hoyoyoy</div>
          <div className={s.dialog}>ayayaya</div>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
