import React, { useState, useEffect } from "react";
import { FaShare } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  setProjectData,
  updateProjectData,
  newData,
  deleteData,
} from "../../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
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
        { projects.length > 0 ? (
          projects?.map((project) => (
          <div key={project?._id}>
            <DisplayPost
              project={project}
              axiosPrivate={axiosPrivate}
              dispatch={dispatch}
              newData={newData}
              deleteData={deleteData}
            />
          </div>
        ))
        ) : 
        (
          <p>Add Your best Projects</p>
        )
        }
      </div>
    </>
  );
};

const DisplayPost = ({
  project,
  axiosPrivate,
  dispatch,
  newData,
  deleteData,
}) => {
  const [toggle, setToggle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const toggleMenu = () => {
    setToggle(!toggle);
  };

  const descSize = toggle ? project.desc.length : 165;
  const seeMoreText = toggle ? "see less" : "see more";

  const deleteProject = async () => {
    try {
      const res = await axiosPrivate.delete(
        `/api/functions/project/delete/${project._id}`
      );
      dispatch(deleteData(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {edit && (
        <EditPost
          project={project}
          setEdit={setEdit}
          dispatch={dispatch}
          axiosPrivate={axiosPrivate}
          newData={newData}
          deleteData={deleteData}
        />
      )}

      {confirm && (
        <DeletePost setConfirm={setConfirm} deleteProject={deleteProject} />
      )}

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

          <div className="blue__icon" onClick={() => setEdit(true)}>
            <AiFillEdit />
          </div>
          <div className="blue__icon" onClick={() => setConfirm(true)}>
            <AiOutlineClose />
          </div>
        </div>
        <p className="project__desc">{project.desc.slice(0, descSize)}</p>
        {project.desc.length > 165 && (
          <p className="see__more" onClick={toggleMenu}>
            {seeMoreText}
          </p>
        )}
      </div>
    </>
  );
};

const DeletePost = ({ setConfirm, deleteProject }) => {
  return (
    <div className="popup_outer stop">
      <div className="popup__inner height">
        <div className="popup_top">
          <p className="popup__top__text">Delete Project</p>
          <div className="close__icon">
            <AiOutlineClose onClick={() => setConfirm(false)} />
          </div>
        </div>
        <div className="delete__main">
          <p>Are you sure ?</p>
          <div className="delete__choice">
            <p className="yes" onClick={deleteProject}>
              yes
            </p>
            <p className="no" onClick={() => setConfirm(false)}>
              no
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditPost = ({
  setEdit,
  project,
  axiosPrivate,
  dispatch,
  newData,
  deleteData,
}) => {
  const { id } = useSelector((state) => state.auth);
  const [isLoading, setIsloading] = useState(false);

  const editPost = async (data) => {
    try {
      setIsloading(true);
      const response = await axiosPrivate.put(
        "/api/functions/project/edit",
        data
      );
      dispatch(newData(response.data));
      setIsloading(false);
      setEdit(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: `${project.title}`,
      desc: `${project.desc}`,
      link: `${project.link}`,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("title is required"),
      desc: Yup.string().required("description is required"),
      link: Yup.string().required("link is required"),
    }),
    onSubmit: (values) => {
      const data = {
        userId: id,
        projectId: project._id,
        title: values.title,
        desc: values.desc,
        link: values.link,
      };
      editPost(data);
    },
  });

  return (
    <div className="popup_outer stop">
      <div className="popup__inner height">
        <div className="popup_top">
          <p className="popup__top__text">Add Projects</p>
          <div className="close__icon">
            <AiOutlineClose onClick={() => setEdit(false)} />
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
              {isLoading ? "loading..." : "submit"}
            </button>
          </form>
        </div>
      </div>
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
      dispatch(updateProjectData(res.data));
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
