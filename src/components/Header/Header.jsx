import React from "react";
import s from './Header.module.css';

const Header = () => {
  return (
    <header className={s.header}>
      <img className={s.img} alt="logo" src="https://static.wixstatic.com/media/1cadd2_6c1080399d1f48999202b51ab1fc756c~mv2.png/v1/crop/x_4,y_0,w_739,h_151/fill/w_380,h_76,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo.png"></img>
    </header>
  );
};

export default Header;
