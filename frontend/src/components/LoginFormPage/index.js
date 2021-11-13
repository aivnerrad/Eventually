import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import Logo from "../Logo/Logo";
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

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
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button type="submit" onClick={enterDemoUser}>Demo User</button>
      </form>
      <img src="http://www.organizinghomelife.com/wp-content/uploads/2012/06/Organize-your-yard-sale-1024x7681.jpg" alt="yard-sale"/>
    </div>
  );
}

export default LoginForm;
