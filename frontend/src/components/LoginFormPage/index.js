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
    <div className="main-content login-content">
      <form className="form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <Logo />
        <p className="login-word">Log in</p>
        <input className="input" type="text" value={credential} onChange={(e) => setCredential(e.target.value)} placeholder="Email address" required/>
        <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
        <button className="button login-button" type="submit">Log in</button>
        <button className="button demo-user-button" type="submit" onClick={enterDemoUser}>Demo User</button>
        <NavLink to="/signup">
            <p className="signup-link">Sign up for Eventually</p>
        </NavLink>
      </form>
      <div className="login-page-image">
      </div>
    </div>
  );
}

export default LoginForm;
