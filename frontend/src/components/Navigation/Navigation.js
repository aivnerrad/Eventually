import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Logo from "../Logo/Logo"
import './Navigation.css';
import SignupFormModal from '../SignupFormPage';
import CreateSaleModal from '../CreateSaleModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <CreateSaleModal />
        <ProfileButton user={sessionUser} />
      </>
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
      {isLoaded && sessionLinks}
    </div>

  );
}

export default Navigation;
