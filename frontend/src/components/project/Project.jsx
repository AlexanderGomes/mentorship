import React, { useState, useEffect } from "react";
import { FaShare } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  setProjectData,
  updateProfileData,
} from "../../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import "./Project.css";

const Project = () => {
  const [isCreateActive, setIsCreateActive] = useState(false);

  const { id } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.project);
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsCreateActive(!isCreateActive);
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axiosPrivate.get(`/api/functions/project/${id}`);
        dispatch(setProjectData(response.data));
      } catch (error) {
        console.log(error.message);
      }
    };

    if (id) {
      getProject();
    }
  }, [id, dispatch]);

  return (
    <>
      {isCreateActive && (
        <CreatePost
          toggleMenu={toggleMenu}
          id={id}
          axiosPrivate={axiosPrivate}
          dispatch={dispatch}
          setIsCreateActive={setIsCreateActive}
        />
      )}
      <div className="project__main">
        <div className="top__icon">
          <h2 className="project__h2">Projects</h2>
          <div className="blue__icon move" onClick={toggleMenu}>
            <GrAdd />
          </div>
        </div>
        {projects?.map((project) => (
          <div key={project?._id}>
            <DisplayPost project={project} />
          </div>
        ))}
      </div>
    </>
  );
};

const DisplayPost = ({ project }) => {
  return (
    <div className="project__card">
      <div className="project__top">
        <h1>{project?.title}</h1>
      </div>
      <div className="icons">
        <a
          className="project__btn"
          rel="noreferrer"
          target="_blank"
          href={`${project?.link}`}
        >
          Show Project <FaShare />{" "}
        </a>

        <div className="blue__icon">
          <AiFillEdit />
        </div>
      </div>
      <p className="project__desc">{project.desc}</p>
    </div>
  );
};

const CreatePost = ({
  toggleMenu,
  id,
  axiosPrivate,
  dispatch,
  setIsCreateActive,
}) => {
  const [isLoading, setIsloading] = useState(false);

  const creatingPost = async (data) => {
    try {
      setIsloading(true);
      const res = await axiosPrivate.post(
        "/api/functions/project/create",
        data
      );
      dispatch(updateProfileData(res.data));
      setIsloading(false);
      setIsCreateActive(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      link: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
      desc: Yup.string().required("description is required"),
      link: Yup.string().required("link is required"),
    }),
    onSubmit: (values) => {
      const data = {
        userId: id,
        title: values.title,
        desc: values.desc,
        link: values.link,
      };
      creatingPost(data);
    },
  });

  return (
    <div className="popup_outer stop">
      <div className="popup__inner height">
        <div className="popup_top">
          <p className="popup__top__text">Add Projects</p>
          <div className="close__icon" onClick={toggleMenu}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="form__inputs">
          <form className="form__inner" onSubmit={formik.handleSubmit}>
            <div className="input__order">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>

            <div className="input__order">
              <label htmlFor="link">Link</label>
              <input
                type="text"
                name="link"
                id="link"
                value={formik.values.link}
                onChange={formik.handleChange}
              />
            </div>

            <div className="input__order">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                name="desc"
                id="desc"
                value={formik.values.desc}
                onChange={formik.handleChange}
              />
            </div>
            <button type="submit" className="form__btn">
              {isLoading ? "loading..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Project;
