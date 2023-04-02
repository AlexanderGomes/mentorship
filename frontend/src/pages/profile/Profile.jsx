import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  Loading,
  ProfilePopUp,
  Profilepic,
  Project,
  WorkHistory,
  About,
} from "../../components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from "../../features/profile/profileSlice";
import { AiFillEdit } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import defaultPicture from "../../assets/default.png";
import "./Profile.css";

const Profile = () => {
  const [displayName, setDisplayName] = useState(null);
  const [isEditActive, setIsEditActive] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(null);
  const [error, setError] = useState(null);

  const { userId } = useParams();
  const { data } = useSelector((state) => state.profile);
  const { id } = useSelector((state) => state.auth);

  const allowed = id === userId;

  const dispatch = useDispatch();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axiosPrivate.get(
          `/api/functions/get/profile/${userId}`
        );
        dispatch(setProfileData(response.data));
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    if (userId) {
      getProfile();
    }
  }, [userId]);

  const refactorName = (data) => {
    const fullName = data.name;
    const [firstName, secondName] = fullName.split(" ");

    if (!secondName) {
      setDisplayName(firstName);
    } else {
      const display = `${firstName} ${secondName.slice(0, 1)}.`;
      setDisplayName(display);
    }
  };

  useEffect(() => {
    if (data) {
      refactorName(data);
    }
  }, [data]);

  const toggleMenu = () => {
    setIsEditActive(!isEditActive);
  };

  return (
    <>
      {!data ? (
        <Loading error={error} />
      ) : (
        <>
          <PopUps
            isEditActive={isEditActive}
            toggleMenu={toggleMenu}
            setIsEditActive={setIsEditActive}
            editProfilePic={editProfilePic}
            setEditProfilePic={setEditProfilePic}
          />
          <div className="profile__main__div">
            <div className="profile__user__info">
              <UserInfo
                data={data}
                displayName={displayName}
                toggleMenu={toggleMenu}
                setEditProfilePic={setEditProfilePic}
                allowed={allowed}
              />
              <Skills allowed={allowed} data={data} />
            </div>
            <div className="profile__bottom__div">
              <div className="bottom__main">
                <div className="bottom">
                  <div className="bottom__conten__right">
                    <Project allowed={allowed} userId={userId} />
                  </div>
                </div>
              </div>

              <div className="bottom__main">
                <div className="bottom">
                  <WorkHistory allowed={allowed} userId={userId} />
                </div>
              </div>
              <div className="bottom__main">
                <div className="bottom">
                  <About allowed={allowed} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const UserInfo = ({
  data,
  displayName,
  toggleMenu,
  setEditProfilePic,
  allowed,
}) => {
  return (
    <div>
      {allowed && (
        <div
          className="edit__profile__pic"
          onClick={() => setEditProfilePic(!false)}
        >
          <AiFillEdit />
        </div>
      )}
      <img
        className="profile__img"
        src={data?.profilePicture ? data?.profilePicture : defaultPicture}
        alt="profile picture"
      />

      <div
        className={allowed ? "profile__img__icon" : "none"}
        onClick={toggleMenu}
      >
        <AiFillEdit className="icon" />
      </div>

      <div className={allowed ? "user__top__main" : "move__down"}>
        <div className="user__top__info">
          <p className="user__name">{displayName}</p>
          <div className="location__main">
            <GoLocation color={"green"} />{" "}
            <p className="user__location">
              {data?.location
                ? data?.location
                : allowed
                ? "add location"
                : "no location"}
            </p>
          </div>
        </div>

        <div className="middle__info">
          <p className="user__career__title">
            {data?.careerTitle
              ? data?.careerTitle
              : allowed
              ? "add career title"
              : ""}
          </p>

          <div className="contact__btns">
            <a
              href={`mailto:${data?.contactEmail}`}
              target="_blank"
              className="contact__email"
            >
              Email
            </a>
            <a href={`tel:${data?.contactNumber}`} className="contact__call">
              Call
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = ({ data, allowed }) => {
  return (
    <div className={allowed ? "user__skills" : "user__skills move"}>
      <h2>Skills</h2>
      <div className="skills">
        <p className={!data.languages && "no__data"}>
          <span className="skills__span">languages: </span>{" "}
          {data?.languages
            ? data?.languages
            : allowed
            ? "add your languages"
            : ""}
        </p>
        <p className={!data?.frameworks && "no__data"}>
          <span className="skills__span">frameworks: </span>{" "}
          {data?.frameworks
            ? data?.frameworks
            : allowed
            ? "add your frameworks"
            : ""}
        </p>
        <p className={!data?.libraries && "no__data"}>
          <span className="skills__span">libraries: </span>
          {data?.libraries
            ? data?.libraries
            : allowed
            ? "add your libraries"
            : ""}
        </p>
        <p className={!data?.tools && "no__data"}>
          <span className="skills__span">tools: </span>{" "}
          {data?.tools ? data?.tools : allowed ? "add your your tools" : ""}
        </p>
        <p className={!data?.others && "no__data"}>
          <span className="skills__span">others: </span>
          {data?.others ? data?.others : allowed ? "add any other skills" : ""}
        </p>
      </div>
    </div>
  );
};

const PopUps = ({
  isEditActive,
  toggleMenu,
  setIsEditActive,
  editProfilePic,
  setEditProfilePic,
}) => {
  return (
    <>
      {isEditActive && (
        <ProfilePopUp
          toggleMenu={toggleMenu}
          setIsEditActive={setIsEditActive}
        />
      )}

      {editProfilePic && <Profilepic setEditProfilePic={setEditProfilePic} />}
    </>
  );
};

export default Profile;
