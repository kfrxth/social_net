import preloader from "../../../img/Spinner-2s-200px.gif";
import React from 'react';

const Preloader = (props) => {
  return (
    <div>
      <img src={preloader} alt="img" />
    </div>
  );
};

export default Preloader;