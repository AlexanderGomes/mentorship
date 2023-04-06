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
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import defaultPicture from "../../assets/default.png";
import "./Profile.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const Profile = () => {
  const [displayName, setDisplayName] = useState(null);
  const [isEditActive, setIsEditActive] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(null);
  const [contract, setContract] = useState(false);
  const [error, setError] = useState(null);

  const { userId } = useParams();
  const { data } = useSelector((state) => state.profile);
  const { id } = useSelector((state) => state.auth);

  const allowed = id === userId;
  const contarctAllowed = id !== userId;

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
            contract={contract}
            setContract={setContract}
            id={id}
            data={data}
            axiosPrivate={axiosPrivate}
          />
          <div className="profile__main__div">
            <div className="profile__user__info">
              <UserInfo
                data={data}
                displayName={displayName}
                toggleMenu={toggleMenu}
                setEditProfilePic={setEditProfilePic}
                allowed={allowed}
                setContract={setContract}
                contarctAllowed={contarctAllowed}
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
  setContract,
  contarctAllowed,
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
          {contarctAllowed && (
            <button className="contract__btn" onClick={() => setContract(true)}>
              Contract
            </button>
          )}
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
  contract,
  setContract,
  id,
  data,
  axiosPrivate,
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
      {contract && (
        <Contract
          axiosPrivate={axiosPrivate}
          id={id}
          data={data}
          setContract={setContract}
        />
      )}
    </>
  );
};

const Contract = ({ setContract, id, data, axiosPrivate }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const [isloading, setIsloading] = useState(false);

  const createContract = async (info) => {
    try {
      setIsloading(true);
      await axiosPrivate.post("/api/contract", info);
      setIsloading(false);
      setContract(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      agrement: "",
      term: "",
      price: "",
    },
    validationSchema: Yup.object({
      agrement: Yup.string().required("agrement is required"),
      term: Yup.string().required("term is required"),
      price: Yup.string().required("price is required"),
    }),
    onSubmit: (values) => {
      const info = {
        userId: data._id,
        mentorId: id,
        agrement: values.agrement,
        term: values.term,
        price: values.price,
      };
      createContract(info);
    },
  });

  useEffect(() => {
    const getUserById = async () => {
      try {
        const res = await axiosPrivate.get(`/api/functions/get/profile/${id}`);
        setCurrentUser(res.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUserById();
  }, [id]);

  return (
    <div className="popup_outer stop">
      <div className="popup__inner">
        <div className="popup_top">
          <p className="popup__top__text">Contract</p>
          <div className="close__icon" onClick={() => setContract(false)}>
            <AiOutlineClose />
          </div>
        </div>

        <div className="contract__content">
          <h1>
            Creat Your <span>contract request</span>
          </h1>
          <p>
            This is an agreement between <span>{data.name}</span> and{" "}
            <span>{currentUser.name}</span>
          </p>

          <form className="main__inputs" onSubmit={formik.handleSubmit}>
            <div className="about-me-input">
              <label htmlFor="aboutMe">Contract Terms && Conditions</label>
              <textarea
                className="about__input"
                type="text"
                name="agrement"
                id="agrement"
                value={formik.values.agrement}
                onChange={formik.handleChange}
                placeholder="Define the Contract Requirements"
                rows={5}
              />
            </div>
            <div className="input__div">
              <label htmlFor="date">Finish Date</label>
              <input
                type="date"
                name="term"
                id="term"
                value={formik.values.term}
                onChange={formik.handleChange}
              />
            </div>
            <div className="input__div">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                id="price"
                value={formik.values.price}
                onChange={formik.handleChange}
              />
            </div>
            <button className="btn move__btn" type="submit">
              {isloading ? "loading..." : "create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
