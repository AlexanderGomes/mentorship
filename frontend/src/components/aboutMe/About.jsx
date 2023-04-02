import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setProfileData } from "../../features/profile/profileSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import "./About.css";

const About = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [toggle, setToggle] = useState(false);

  const { data } = useSelector((state) => state.profile);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const descSize = toggle ? data.aboutMe.length : 165;
  const seeMoreText = toggle ? "see less" : "see more";
  const toggleMenu = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      {isCreating && (
        <CreatAbout
          axiosPrivate={axiosPrivate}
          data={data}
          setIsCreating={setIsCreating}
          id={id}
          dispatch={dispatch}
        />
      )}

      <div className="about__top">
        <h2>About me</h2>

        <div className="icons">
          <div className="blue__icon move" onClick={() => setIsCreating(true)}>
            <GrAdd />
          </div>
        </div>
      </div>

      <div className="about__content">
        <p>{data.aboutMe.slice(0, descSize)}</p>

        {data.aboutMe.length > 165 && (
          <p onClick={toggleMenu} className="see__more">
            {seeMoreText}
          </p>
        )}
      </div>
    </div>
  );
};

const CreatAbout = ({ setIsCreating, id, data, axiosPrivate, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const update = async (data) => {
    try {
      setIsLoading(true);
      const res = await axiosPrivate.put("/api/functions/update/profile", {
        data,
      });
      dispatch(setProfileData(res.data));
      setIsLoading(false);
      setIsCreating(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      aboutMe: `${data.aboutMe ? data.aboutMe : ""}`,
    },
    validationSchema: Yup.object({
      aboutMe: Yup.string()
        .required("description is required")
        .max(2000, "Description must be less than or equal to 2000 characters"),
    }),
    onSubmit: (values) => {
      const data = {
        userId: id,
        aboutMe: values.aboutMe,
      };
      update(data);
    },
  });

  return (
    <div className="popup_outer stop">
      <div className="popup__inner height">
        <div className="popup_top">
          <p className="popup__top__text">Add Discription</p>
          <div className="close__icon" onClick={() => setIsCreating(false)}>
            <AiOutlineClose />
          </div>
        </div>
        <form className="inner__about" onSubmit={formik.handleSubmit}>
          <div className="about__order">
            <div className="about-me-input">
              <label htmlFor="about">About me</label>
              <textarea
                className="about__input"
                type="text"
                name="aboutMe"
                id="aboutMe"
                value={formik.values.aboutMe}
                onChange={formik.handleChange}
                placeholder="Write a few words about yourself"
                rows={5}
              />
              <small>{`${formik.values.aboutMe.length} / 2000`}</small>
            </div>
          </div>
          <button type="submit" className="btn">
            {isLoading ? "loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default About;
