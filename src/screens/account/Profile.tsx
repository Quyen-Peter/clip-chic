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

  const fetchUser = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/api/Users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  useEffect(() => {
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

  const handleRemove = () => {
    setImage(profile);
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      const token = sessionStorage.getItem("token");

      const payload = {
        name: user.name,
        phone: user.phone,
        birthday: user.birthday ? new Date(user.birthday).toISOString() : null,
        address: user.address,
        image: user.image,
      };

      const response = await fetch(`${API_URL}/api/Users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Cập nhật thất bại");

      const updated = await response.json();
      setUser(updated);
      alert("Cập nhật thành công!");
      setIsEditing(false);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      alert("Lỗi khi cập nhật thông tin người dùng");
    }
  };

  return (
    <div className="container-profile">
      <div>
        <div className="header-info">
          <h3 className="basic-infor">Thông tin người dùng</h3>
          {!isEditing ? (
            <button onClick={isHandleChange} className="bnt-handle-change-edit">
              Cập nhật
            </button>
          ) : (
            <button onClick={handleUpdate} className="bnt-handle-change-apply">
              Áp dụng
            </button>
          )}
        </div>

        <div className="content-info">
          <p>Ảnh đại diện</p>
          <div className="profile-actions">
            <img src={image} alt="Avatar" />
            <div className="chooce-action">
              <label htmlFor="upload" className="upload-text">
                Thêm ảnh mới
              </label>
              <input
                id="upload"
                type="file"
                accept="image/*"
                onChange={handleUpload}
              />
              <button className="remove-text" onClick={handleRemove}>
                Xóa ảnh
              </button>
            </div>
          </div>
        </div>

        <div className="line-info"></div>

        <div className="content-info-change">
          <p>Tên</p>
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
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, name: e.target.value } : null
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className="line-info"></div>

        <div className="content-info-change">
          <p>Sinh nhật</p>
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
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, birthday: e.target.value } : null
                    )
                  }
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
          <p>Số điện thoại</p>
          <div>
            {!isEditing ? (
              <div>
                <p className="text-p-content-phone">+84 {user?.phone}</p>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder={user?.phone}
                  className="bnt-input-info text-p-content-phone"
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, phone: e.target.value } : null
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className="line-info"></div>

        <div className="content-info-change">
          <p>Địa chỉ</p>
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
                  onChange={(e) =>
                    setUser((prev) =>
                      prev ? { ...prev, address: e.target.value } : null
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
