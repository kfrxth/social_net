import React from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <a>Профиль</a>
      </div>

      <div className={classes.item}>
        <a>Сообщения</a>
      </div>

      <div className={classes.item}>
        <a>Новости</a>
      </div>

      <div className={classes.item}>
        <a>Музыка</a>
      </div>

      <div className={classes.item}>
        <a>Настройки</a>
      </div>
    </nav>
  );
};

export default Navbar;
