import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={s.header}>
        <img
          className={s.img}
          alt="logo"
          src="https://rostrud.gov.ru/local/templates/rostrud_new/img/icon/logo-prime.png"
        ></img>
        <h3 className={s.headerName}>РОСТРУД</h3>
        <div className={s.loginBlock}>
          {props.isAuth ? `Вы: ${props.login}` : <NavLink to={"/login"}>Зайти</NavLink>}
        </div>
      </header>
    </>
  );
};

export default Header;
