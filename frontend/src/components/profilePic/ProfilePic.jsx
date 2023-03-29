import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import defaultPicture from "../../assets/default.png";
import "./ProfilePic.css";

const ProfilePic = ({ setEditProfilePic }) => {
  const { data } = useSelector((state) => state.profile);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="popup_outer">
      <div className="popup__inner">
        <div className="popup_top">
          <p className="popup__top__text">Edit Profile Picture</p>
          <div className="close__icon" onClick={() => setEditProfilePic(false)}>
            <AiOutlineClose />
          </div>
        </div>

        <div className="edit__placeholder">
          {selectedFile ? (
            <img className="profile__img" src={selectedFile} alt="Preview" style={{ width: '140px', height: '140px', objectFit: 'cover' }}  />
          ) : (
            <img
              className="profile__img"
              src={data?.profilePicture ? data?.profilePicture : defaultPicture}
            />
          )}
          <div>
            <label className="choose__btn" for="file">
              Choose Picture
            </label>
            <input
              className="input__pic"
              type="file"
              id="file"
              onChange={handleFileInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePic;
