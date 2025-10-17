import "../../css/Profile.css";
import avata from "../../assest/avata.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profile from "../../assest/profile.png";
const API_URL = process.env.REACT_APP_HOST_API;


export interface User {
  id: number;           
  email: string;        
  password?: string;    
  phone?: string;      
  birthday?: string;   
  name: string;         
  address?: string;     
  image?: string;       
  createDate: string;  
  status: string;      
}


const Profile = () => {
  const [image, setImage] = useState(avata);
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("token");
      try {
        const response = await fetch(`${API_URL}/api/Users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Không lấy được thông tin người dùng!");
        }

        setUser(data);                  
        setImage(data.image || avata); 
      } catch (err) {
        console.error("Lỗi khi lấy thông tin người dùng:", err);
      }
    };

    fetchUser();
  }, []);

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
            <img src={image} alt="Avatar" />
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
                <p className="text-p-content-name">{user?.name}</p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder={user?.name}
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
                <p>{user?.birthday}</p>
              </div>
            ) : (
              <div>
                <input
                  type="date"
                  defaultValue={user?.birthday}
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
                <p className="text-p-content-email">{user?.email}</p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder={user?.email}
                  className="bnt-input-info text-p-content-email"
                  readOnly
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
                <p className="text-p-content-phone">
                  +84 {user?.phone}
                </p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder={user?.phone}
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
                <p className="text-p-content-address">{user?.address}</p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder={user?.address}
                  className="bnt-input-info text-p-content-address"
                />
              </div>
            )}
          </div>
        </div>

        <div className="line-info"></div>
      </div>
    </div>
  );
};

export default Profile;
