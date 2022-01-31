import React, { useState, useEffect } from "react";
import "./registration.css";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WcIcon from "@mui/icons-material/Wc";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useHistory } from "react-router-dom";
import { Country, State } from "country-state-city";
function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("Country");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const history = useHistory();
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  function handelRegister(e) {
    e.preventDefault();
    if (firstName.length > 8 || firstName.length < 3) {
      alert(
        "First Name should be greater than 2 characters and less than 8 characters"
      );
    } else if (lastName.length > 8 || lastName.length < 3) {
      alert(
        "Last Name should be greater than 2 characters and less than 8 characters"
      );
    } else if (!regex.test(email)) {
      alert("Invalid email"); // validator package
    } else if (phone.length < 8 || phone.length > 10) {
      alert("Invalid Phone no");
    } else if (password.length < 8) {
      alert("password must be greater than 8characters");
    } else if (password !== cPassword) {
      alert("password does not matched to confirm password");
    } else {
      let refInfo = { name: firstName, email, password };
      localStorage.setItem("userInfo", JSON.stringify(refInfo));
      alert("user register successfully");
      history.push("/");
    }
  }

  function getCountry() {
    let allStates = State.getAllStates();
    let selected = allStates.find(
      (sta) => sta.name.toLowerCase() === state.toLowerCase()
    );

    if (selected) {
      let ref = Country.getCountryByCode(selected.countryCode);
      setCountry(ref.name);
    }
  }

  useEffect(() => {
    getCountry();
  }, [state]);

  return (
    <div className="registration">
      <h1>Registration</h1>
      <div className="registration-form">
        <form action="submit">
          <div className="name">
            <PersonIcon />
            <input
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="field">
            <EmailIcon />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <HomeIcon />
            <input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="name">
            <LocationOnIcon />
            <input
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
            />
            <input placeholder="country" disabled value={country} />
          </div>
          <div className="field">
            <WcIcon />
            <select
              name="gender"
              id="gender"
              onChange={(e) => setGender(e.target.value)}
              defaultValue={"default"}
            >
              <option value="default" disabled hidden>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="field">
            <PhoneIphoneIcon />
            <input
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              type="number"
            />
          </div>
          <div className="field">
            <VpnKeyIcon />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field">
            <VpnKeyIcon />
            <input
              placeholder="Confirm Password"
              onChange={(e) => setCPassword(e.target.value)}
            />
          </div>
        </form>
        <button onClick={(e) => handelRegister(e)}>Register</button>
      </div>
      <Link to="/">to Login Page</Link>
    </div>
  );
}

export default Registration;
