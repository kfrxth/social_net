import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink
          to="/profile/userId"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Профиль
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink
          to="/dialogs"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Сообщения
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink
          to="/news"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Новости
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink
          to="/users"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Пользователи
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink
          to="/music"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Документы
        </NavLink>
      </div>

      <div className={s.item}>
        <NavLink
          to="/settings"
          className={(navData) => (navData.isActive ? s.active : s.item)}
        >
          Настройки
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
