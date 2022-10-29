import React from "react";
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <img className={s.img} alt="logo" src="https://rostrud.gov.ru/local/templates/rostrud_new/img/icon/logo-prime.png"></img>
	  <h3>
	  РОСТРУД
	  </h3>
    </header>
  );
};

export default Header;
