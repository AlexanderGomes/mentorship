import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Loading, ProfilePopUp, Profilepic } from "../../components";
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
  const { id, accessToken } = useSelector((state) => state.auth);

  const { userId } = useParams();
  const { data } = useSelector((state) => state.profile);

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
              />
              <Skills />
            </div>
            <div className="profile__bottom__div">
              <div className="bottom__main">
                <div className="bottom">
                  <h2>Projects</h2>
                  <div className="bottom__conten__right">
                    <p>Add some of yout best work</p>
                  </div>
                  <p className="seeMore__bottom">See more...</p>
                </div>
              </div>

              <div className="bottom__main">
                <div className="bottom">
                  <h2>Work History / Internship / Freelance Work </h2>
                  <div className="bottom__conten__right">
                    <p>Any work is great to share</p>
                  </div>
                  <p className="seeMore__bottom">See more...</p>
                </div>
              </div>
              <div className="bottom__main">
                <div className="bottom">
                  <h2>About me</h2>
                  <div className="bottom__conten__left">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vitae mollitia obcaecati, aspernatur maiores, tempore
                      dolor alias voluptate eos sunt adipisci illum soluta
                      assumenda autem consequuntur amet reprehenderit ratione.
                      Ipsum, iusto.
                    </p>
                  </div>
                  <p className="seeMore__bottom">See more...</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const UserInfo = ({ data, displayName, toggleMenu, setEditProfilePic }) => {
  return (
    <div>
      <div
        className="edit__profile__pic"
        onClick={() => setEditProfilePic(!false)}
      >
        <AiFillEdit />
      </div>
      <img
        className="profile__img"
        src={data?.profilePicture ? data?.profilePicture : defaultPicture}
        alt="profile picture"
      />

      <div className="profile__img__icon" onClick={toggleMenu}>
        <AiFillEdit className="icon" />
      </div>
      <div className="user__top__main">
        <div className="user__top__info">
          <p className="user__name">{displayName}</p>
          <div className="location__main">
            <GoLocation color={"green"} />{" "}
            <p className="user__location">
              {data?.location ? data?.location : "add location"}
            </p>
          </div>
        </div>

        <div className="middle__info">
          <p className="user__career__title">
            {data?.careerTitle ? data?.careerTitle : "add career title"}
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

        <div className="user__projects__posts">
          <div className="projects">
            <p>Projects</p>
            <p>5</p>
          </div>
          <div className="posts">
            <p>posts</p>
            <p>5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className="user__skills">
      <h2>Skills</h2>
      <div className="skills">
        <p>
          <span className="skills__span">languages:</span> Java, C++, python
        </p>
        <p>
          <span className="skills__span">frameworks:</span> Angular, nextjs
        </p>
        <p>
          <span className="skills__span">libraries:</span> React, Material UI
        </p>
        <p>
          <span className="skills__span">tools:</span> vsCode
        </p>
        <p>
          <span className="skills__span">others:</span> OSS
        </p>
        <p className="skills__more">See more...</p>
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
