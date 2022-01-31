import React, { useState } from "react";
import "./home.css";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { useHistory } from "react-router-dom";
function Home() {
  const [flag, setFlag] = useState(false);
  const [file, setfile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const history = useHistory();
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  function onFile(e) {
    const url = URL.createObjectURL(e.target.files[0]);
    setfile(url);
  }

  function onSubmit(e) {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("userInfo"));
    if (firstName.length > 8 || firstName.length < 3) {
      alert(
        "First Name should be greater than 2 characters and less than 8 characters"
      );
    } else if (lastName.length > 8 || lastName.length < 3) {
      alert(
        "Last Name should be greater than 2 characters and less than 8 characters"
      );
    } else if (!regex.test(email)) {
      alert("Invalid email");
    } else if (phone.length < 8 || phone.length > 10) {
      alert("Invalid Phone no");
    } else if (oldPassword !== data.password) {
      alert("Old password is wrong");
    } else {
      data = { ...data, password: newPassword };
      localStorage.setItem("userInfo", JSON.stringify(data));
      alert("User Data is successfully set");
    }
  }
  function logOut() {
    localStorage.removeItem("login");
    history.push("/");
  }
  return (
    <div className="home">
      <div className="navbar">
        <div
          className="left"
          onClick={() => setFlag((prevState) => !prevState)}
        >
          <ArticleOutlinedIcon />
          <p>Info</p>
        </div>
        <div className="right" onClick={logOut}>
          <LogoutIcon />
          <p>LogOut</p>
        </div>
      </div>
      {flag ? (
        <div className="info">
          {file && firstName && email && phone ? (
            <>
              <h1>User Info</h1>
              <div className="image">
                <img src={file} alt="profile" />
              </div>
              <div className="description">
                <h2>
                  Name :- {firstName} {lastName}
                </h2>

                <h2>Email :- {email}</h2>
                <h2>Phone :- {phone}</h2>
              </div>
            </>
          ) : (
            <div>
              <h1>Fill the Data</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="main">
          <div className="homeForm">
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
                <PhoneIphoneIcon />
                <input
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="field">
                <VpnKeyIcon />
                <input
                  placeholder="Old password"
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="field">
                <VpnKeyIcon />
                <input
                  placeholder="New Password"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="field">
                <ImageOutlinedIcon />

                <input type="file" onChange={(e) => onFile(e)} />
              </div>
              <button onClick={(e) => onSubmit(e)}>Add</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
