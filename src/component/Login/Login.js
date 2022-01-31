import React, { useState } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";
import { useHistory } from "react-router-dom";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  function handelSubmit(e) {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("userInfo"));
    if (data.email !== email) {
      alert("Invalid Email");
    } else if (data.password !== password) {
      alert("Wrong Password");
    } else {
      localStorage.setItem("login", data.name);
      history.push("/home");
    }
  }

  return (
    <div className="login">
      <h1>LOGIN</h1>
      <p>Please enter your Email and Password</p>
      <div className="form">
        <form action="submit">
          <div className="email">
            <PersonIcon />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <KeyIcon />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button">
            <button onClick={(e) => handelSubmit(e)}>Submit</button>
          </div>
        </form>
      </div>
      <Link to="./registration">to Registration Page</Link>
    </div>
  );
}

export default Login;
