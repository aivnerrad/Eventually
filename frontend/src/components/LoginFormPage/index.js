import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if(sessionUser){
    history.push("/")
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const enterDemoUser = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({
      credential:"aivnerrad", password:"aivnerrad"
    }))
  }

  return (
    <div id="image-form-side-by-side">
      <form id="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <Logo />
        <div id="login-header">
          <h1 id="login-word">Log in</h1>
        </div>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder="Email address"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        <button id="login-button" type="submit">Log in</button>
        <button id="demo-user-button" type="submit" onClick={enterDemoUser}>Demo User</button>
        <NavLink to="/signup">
            <h6 id="signup-link">Sign up for Eventually</h6>
        </NavLink>
      </form>
      <div id="login-page-image">
      </div>
    </div>
  );
}

export default LoginForm;
