import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Logo from "../Logo/Logo"
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import SearchBar from "./SearchBar"

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div id="user-info">
        <ProfileButton user={sessionUser} />
        <p><strong>{sessionUser.email}</strong></p>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
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
