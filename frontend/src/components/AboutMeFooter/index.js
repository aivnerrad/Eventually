import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../Logo/Logo"


function Footer(){
  return (
   <div id="footer">
      <NavLink id="nav-link" exact to="/">
        <Logo />
      </NavLink>
      <a target="_blank" rel="noreferrer" href="https://github.com/aivnerrad">Check out my projects on Github!</a>
      <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/darren-via-ii-552667159/">Connect with me on LinkedIn!</a>
      <a target="_blank" rel="noreferrer" href="https://twitter.com/DarrenVia">Follow Me on Twitter!</a>

    </div>

  );
}

export default Footer;
