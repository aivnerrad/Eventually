import React from "react";
import { NavLink } from "react-router-dom";
const CreateEventNavBar = (props) => {
  return(
    <div className="create-event-navbar">
      <NavLink className="create-event-navbar-logo" to="/">eventually...</NavLink>
      <div className="create-event-profile-circle">
        <p>{props.user ? props.user.email[0].toUpperCase() + props.user.email[1].toUpperCase() : "EV"}</p>
      </div>
    </div>
  )
};

export default CreateEventNavBar;
