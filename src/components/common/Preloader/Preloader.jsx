import preloader from "../../../img/loader.gif";
import React from 'react';
import s from './preloader.module.css';

const Preloader = (props) => {
  return (
    <div className={s.loader}>
      <img src={preloader} alt="img" />
    </div>
  );
};

export default Preloader;