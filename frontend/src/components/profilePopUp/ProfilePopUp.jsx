import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { setProfileData } from "../../features/profile/profileSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import user from "../../functionality/user";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./ProfilePopUp.css";

const ProfilePopUp = ({ toggleMenu, setIsEditActive }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profile);
  const { id } = useSelector((state) => state.auth);

  const axiosPrivate = useAxiosPrivate();

  const updateProfile = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.put("/api/functions/update/profile", {
        data,
      });
      dispatch(setProfileData(response.data));
      setIsLoading(false);
      setIsEditActive(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: `${data.name}`,
      location: `${data.location ? data.location : ""}`,
      title: `${data.careerTitle ? data.careerTitle : ""}`,
      contactNumber: `${data.contactNumber ? data.contactNumber : ""}`,
      contactEmail: `${data.contactEmail ? data.contactEmail : ""}`,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      location: Yup.string().required("location is required"),
      title: Yup.string().required("Career title is required"),
      contactEmail: Yup.string().email("invalid email"),
      contactNumber: Yup.string().matches(
        user.phoneRegExp,
        "Phone number is not valid"
      ),
    }),
    onSubmit: (values) => {
      const updatedData = {
        userId: id,
        name: values.name,
        location: values.location,
        careerTitle: values.title,
        contactNumber: values.contactNumber,
        contactEmail: values.contactEmail,
      };
      updateProfile(updatedData);
    },
  });

  return (
    <div className="popup_outer stop">
      <div className="popup__inner">
        <div className="popup_top">
          <p className="popup__top__text">Edit</p>
          <div className="close__icon" onClick={toggleMenu}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="popup__info">

          <form className="popup__inputs__main" onSubmit={formik.handleSubmit}>
            <button className="popup__save__btn" type="submit">
              {isLoading ? "loading..." : "save"}
            </button>
          <div className="popup__inner__top">
            <p>* indicates required</p>
            <h1>Basic info</h1>
          </div>

            <div className="popup__inputs">
              <div className="top__error">
                <label htmlFor="name">Full Name*</label>
                {formik.touched.name && formik.errors.name ? (
                  <h2>{formik.errors.name}</h2>
                ) : (
                  ""
                )}
              </div>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={`${data.name}`}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="popup__inputs">
              <div className="top__error">
                <label htmlFor="location">Location*</label>
                {formik.touched.location && formik.errors.location ? (
                  <h2>{formik.errors.location}</h2>
                ) : (
                  ""
                )}
              </div>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Example: Richmond, CA"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            </div>
            <div className="popup__inputs">
              <div className="top__error">
                <label htmlFor="title">Career Title*</label>
                {formik.touched.title && formik.errors.title ? (
                  <h2>{formik.errors.title}</h2>
                ) : (
                  ""
                )}
              </div>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Software engineer, Backend "
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>

            <h2 className="popup__contact">Contact Info</h2>
            <div className="popup__inputs">
              <div className="top__error">
                <label htmlFor="contactNumber">Contact Phone Number</label>
                {formik.touched.contactNumber && formik.errors.contactNumber ? (
                  <h2>{formik.errors.contactNumber}</h2>
                ) : (
                  ""
                )}
              </div>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="(510) 630-5102"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
              />
            </div>
            <div className="popup__inputs">
              <div className="top__error">
                <label htmlFor="email">Contact Email</label>
                {formik.touched.contactEmail && formik.errors.contactEmail ? (
                  <h2>{formik.errors.contactEmail}</h2>
                ) : (
                  ""
                )}
              </div>
              <input
                type="email"
                name="contactEmail"
                id="contactEmail"
                placeholder="example@email.com"
                value={formik.values.contactEmail}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopUp;
