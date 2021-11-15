import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Logo from "../Logo/Logo"
import './Navigation.css';
import SearchBar from "./SearchBar"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div id="user-info">
        <ProfileButton user={sessionUser} />
        <p id="user-email">{sessionUser.email}</p>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <NavLink id="create-event-button" to="/signin">
          <h5>Create an event</h5>
        </NavLink>
        <NavLink id="signin-button" to="/signin">
          <h5>Sign In</h5>
        </NavLink>
      </>
    );
  }

  return (
   <div id="navigation-bar">
      <NavLink id="nav-link" exact to="/">
        <Logo />
      </NavLink>
      <SearchBar />
      {isLoaded && sessionLinks}
    </div>

  );
}

export default Navigation;
