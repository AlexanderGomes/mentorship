import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { AiOutlineClose } from "react-icons/ai";
import { setProfileData } from "../../features/profile/profileSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import defaultPicture from "../../assets/default.png";
import "./ProfilePic.css";

const ProfilePic = ({ setEditProfilePic }) => {
  const editorRef = useRef(null);
  const { data } = useSelector((state) => state.profile);
  const [scale, setScale] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id, accessToken } = useSelector((state) => state.auth);

  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();


  const handleFileInputChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  async function handleSave() {
    const canvas = editorRef?.current.getImageScaledToCanvas();
    const editedImage = canvas.toDataURL();

    const data = {
      userId: id,
      profilePic: editedImage,
    };

    const updatedUser = await updateProfile(data);
    dispatch(setProfileData(updatedUser));
  }

  const updateProfile = async (data) => {
    try {
      const response = await axios.put("/api/functions/update/profile", {
        data,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  function handleScaleChange(event) {
    const scale = parseFloat(event.target.value);
    setScale(scale);
  }

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
            <>
              <AvatarEditor
                ref={editorRef}
                image={selectedFile}
                width={250}
                height={250}
                border={50}
                borderRadius={135}
                scale={scale}
              />
              <input
                type="range"
                min="1"
                max="10"
                step="0.1"
                value={scale}
                onChange={handleScaleChange}
              />
            </>
          ) : (
            <img
              className="profile__img__pop"
              src={data?.profilePicture ? data?.profilePicture : defaultPicture}
            />
          )}
          <div>
            {selectedFile ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <label className="choose__btn" for="file">
                Choose Picture
              </label>
            )}

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
