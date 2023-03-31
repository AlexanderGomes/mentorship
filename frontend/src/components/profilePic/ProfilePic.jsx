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
  const [scale, setScale] = useState(0.8);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const { data } = useSelector((state) => state.profile);
  const { id, accessToken } = useSelector((state) => state.auth);

  const axiosPrivate = useAxiosPrivate();

  const dispatch = useDispatch();

  const handleFileInputChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };

  function handleSave() {
    const canvas = editorRef?.current.getImageScaledToCanvas();
    const editedImage = canvas.toDataURL();

    const data = {
      userId: id,
      profilePic: editedImage,
    };

    updateProfile(data);
  }

  const updateProfile = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.put("/api/functions/update/profile", {
        data,
      });
      dispatch(setProfileData(response.data));
      setIsLoading(false);
      setEditProfilePic(false);
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
                width={200}
                height={200}
                border={50}
                borderRadius={135}
                scale={scale}
                className="editor"
              />
              <div className="range__zoom">
                <p>zoom in/out</p>
                <input
                  className="range__input"
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={scale}
                  onChange={handleScaleChange}
                />
              </div>
            </>
          ) : (
            <img
              className="profile__img__pop"
              src={data?.profilePicture ? data?.profilePicture : defaultPicture}
            />
          )}
          <div>
            {selectedFile ? (
              <button className="save__btn" onClick={handleSave}>
                {isLoading ? "loading..." : "save"}
              </button>
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
