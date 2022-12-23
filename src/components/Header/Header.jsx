import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const logoImageRostrud =
  "https://rostrud.gov.ru/local/templates/rostrud_new/img/icon/logo-prime.png";

const Header = (props) => {
  return (
    <>
      <header className={s.header}>
        <img className={s.img} alt="logo" src={logoImageRostrud}></img>
        <h3 className={s.headerName}>РОСТРУД</h3>
        <div className={s.loginBlock}>
          {props.isAuth ? (
            `Вы: ${props.login}`
          ) : (
            <NavLink to={"/login"}>Зайти</NavLink>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
