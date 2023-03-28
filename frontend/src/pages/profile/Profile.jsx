import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from "../../features/profile/profileSlice";
import { AiFillEdit } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import pictures from "../../assets/profile.PNG";
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const { id, accessToken } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (id) {
      const getProfile = async () => {
        const response = await axiosPrivate.get(
          `/api/functions/get/profile/${id}`
        );
        dispatch(setProfileData(response.data));
      };

      getProfile();
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fullName = data?.name;
    const [firstName, secondName] = fullName?.split(" ");
    console.log(secondName);
    const display = `${firstName} ${secondName?.slice(0, 1)}.`;
    console.log(display);
  }, [data]);

  return (
    <div className="profile__main__div">
      <div className="profile__user__info">
        <UserInfo data={data} />
        <Skills />
      </div>
      <div className="profile__bottom__div">
        <div className="bottom__main">
          <div className="bottom">
            <h2>About me</h2>
            <div className="bottom__conten__left">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
                mollitia obcaecati, aspernatur maiores, tempore dolor alias
                voluptate eos sunt adipisci illum soluta assumenda autem
                consequuntur amet reprehenderit ratione. Ipsum, iusto.
              </p>
            </div>
            <p className="seeMore__bottom">See more...</p>
          </div>
        </div>
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
              <p>Any work expirience is great to share</p>
            </div>
            <p className="seeMore__bottom">See more...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserInfo = ({ data }) => {
  return (
    <div>
      <img className="profile__img" src={pictures} alt="profile picture" />
      <div className="profile__img__icon">
        <AiFillEdit className="icon" />
      </div>
      <div className="user__top__main">
        <div className="user__top__info">
          <p className="user__name">{data?.name}</p>
          <div className="location__main">
            <GoLocation color={"green"} />{" "}
            <p className="user__location">
              {data?.location ? data?.location : "add location"}
            </p>
          </div>
        </div>

        <div className="middle__info">
          <p className="user__career__title">
            {data?.title ? data?.title : "add career title"}
          </p>

          <div className="contact__btns">
            <a href="" className="contact__email">
              Email
            </a>
            <a href="" className="contact__call">
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

export default Profile;
