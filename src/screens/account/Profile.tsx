import "../../css/Profile.css";
import avata from "../../assest/avata.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../assest/profile.png";

const Profile = () => {
  const [image, setImage] = useState(avata);
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const password = "mySecret123";

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const isHandleChange = () => {
    setIsEditing(true);
  };

  const handleChange = () => {
    setIsEditing(false);
  };

  const handleRemove = () => {
    setImage(profile);
  };

  return (
    <div className="container-profile">
      <div>
        <div className="header-info">
          <h3 className="basic-infor">BASIC INFO</h3>
          {!isEditing ? (
            <button onClick={isHandleChange} className="bnt-handle-change-edit">
              Edit
            </button>
          ) : (
            <button onClick={handleChange} className="bnt-handle-change-apply">
              Apply
            </button>
          )}
        </div>

        <div className="content-info">
          <p>Profile Picture</p>
          <div className="profile-actions">
            <img src={image} />
            <div className="chooce-action">
              <label htmlFor="upload" className="upload-text">
                Upload new picture
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
              />
              <button className="remove-text" onClick={handleRemove}>
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="line-info"></div>

        <div className="content-info-change">
          <p>Name</p>
          <div>
            {!isEditing ? (
              <div>
                <p className="text-p-content-name">Nguyen Thi A</p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Nguyen Thi A"
                  className="bnt-input-info text-p-content-name"
                />
              </div>
            )}
          </div>
        </div>

        <div className="line-info"></div>

        <div className="content-info-change">
          <p>Date of Birth</p>
          <div>
            {!isEditing ? (
              <div className="text-p-content-date">
                <p>31/02/2003</p>
              </div>
            ) : (
              <div>
                <input
                  type="date"
                  defaultValue="20/8/2003"
                  className="bnt-input-info text-p-content-date"
                />
              </div>
            )}
          </div>
        </div>

        <div className="line-info"></div>

        <div className="content-info-change">
          <p>Email</p>
          <div>
            {!isEditing ? (
              <div>
                <p className="text-p-content-email">nguyenthia3102@gmail.com</p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="nguyenthia3102@gmail.com"
                  className="bnt-input-info text-p-content-email"
                />
              </div>
            )}
          </div>
        </div>

        <div className="line-info"></div>

        <div className="content-info-change">
          <p>Phone Number</p>
          <div>
            {!isEditing ? (
              <div>
                <p className="text-p-content-phone">+84 122313616</p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="122313616"
                  className="bnt-input-info text-p-content-phone"
                />
              </div>
            )}
          </div>
        </div>

        <div className="line-info"></div>

        <div className="content-info-change">
          <p>Address</p>
          <div>
            {!isEditing ? (
              <div>
                <p className="text-p-content-address">
                  14/7 Street 3, Tan Uyen, Binh Duong
                </p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="14/7 Street 3, Tan Uyen, Binh Duong"
                  className="bnt-input-info text-p-content-address"
                />
              </div>
            )}
          </div>
        </div>

        <div className="line-info"></div>
      </div>

      <div className="footer-info">
        <h3 className="account-info">ACCOUNT INFO</h3>
        <div className="user-name-container">
          <p>User Name</p>
          <p className="user-name">nguyenthia3102</p>
        </div>
        <div className="line-info"></div>
        <div className="password-container">
          <p>Password</p>
          <div className="password-info">
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="password-button"
            >
              {show ? "🐵" : "🙈"}
            </button>
            <input
              type={show ? "text" : "password"}
              value={password}
              readOnly
              className="password-input"
            />
          </div>
          <Link to={"/"} className="change-password">
            Change password
          </Link>
        </div>
        <div className="line-info"></div>
      </div>
    </div>
  );
};

export default Profile;
