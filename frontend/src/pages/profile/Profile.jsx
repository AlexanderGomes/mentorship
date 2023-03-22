import React from "react";
import "./Profile.css";
import pictures from "../../assets/profile.PNG";

const Profile = () => {
  return (
    <div className="profile__main__div">
      <div className="profile__user__info">
        <UserInfo />
        <Skills />
      </div>
    </div>
  );
};

const UserInfo = () => {
  return (
    <div>
      <img className="profile__img" src={pictures} alt="profile picture" />

      <div className="user__top__info">
        <p className="user__name">Alexsander H.</p>
        <p className="user__location">Richmond, CA</p>
      </div>

      <p className="user__career__title">Software engineer, Backend</p>

      <div className="contact__btns">
        <a href="">Email</a>
        <a href="">Call</a>
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
  );
};

const Skills = () => {
  return (
    <div className="user__skills">
      <h2>Skills</h2>
      <div className="skills">
        <p>languages: Java, C++, python</p>
        <p>framework: Angular, nextjs</p>
        <p>library: React, Material UI</p>
        <p>tools: vsCode</p>
        <p>others: OSS</p>
        <p>See more...</p>
      </div>
    </div>
  );
};

export default Profile;
