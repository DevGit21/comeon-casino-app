// Logo.js
import React from 'react';
import LogoImg from '../assets/images/logo.svg'

const Logo = () => {
  return (
    <div className="ui one column center aligned page grid">
      <div className="column twelve wide">
        <img src={LogoImg} alt="logo" />
      </div>
    </div>
  );
};

export default Logo;
