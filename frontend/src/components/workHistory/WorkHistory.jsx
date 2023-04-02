import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { GrAdd } from "react-icons/gr";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  createWork,
  getWork,
  deleteWork,
  updateWork,
} from "../../features/work/WorkSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./WorkHistory.css";

const WorkHistory = ({ userId, allowed }) => {
  const [isCreating, setIsCreating] = useState(false);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useSelector((state) => state.auth);
  const { work } = useSelector((state) => state.work);

  useEffect(() => {
    const getWorks = async () => {
      try {
        const res = await axiosPrivate.get(`/api/functions/work/${userId}`);
        dispatch(getWork(res.data));
      } catch (error) {
        console.log(error.message);
      }
    };

    if (userId) {
      getWorks();
    }
  }, [userId, dispatch]);

  return (
    <div className="work__main">
      <div className="work__top">
        <h2>Work History</h2>
        {allowed && (
          <div className="blue__icon move" onClick={() => setIsCreating(true)}>
            <GrAdd />
          </div>
        )}
      </div>

      {work.length > 0 ? (
        work?.map((data) => (
          <div key={data._id}>
            <WorkDisplay
              data={data}
              axiosPrivate={axiosPrivate}
              dispatch={dispatch}
              id={id}
              allowed={allowed}
            />
          </div>
        ))
      ) : (
        <>
          <p>{allowed ? 'Any work experience is great' : 'No working expirience yet'}</p>
        </>
      )}

      {isCreating && (
        <CreateWork
          setIsCreating={setIsCreating}
          id={id}
          axiosPrivate={axiosPrivate}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

const CreateWork = ({ setIsCreating, id, axiosPrivate, dispatch }) => {
  const [isLoading, setIsLoading] = useState(false);

  const createObj = async (data) => {
    try {
      setIsLoading(true);
      const response = await axiosPrivate.post(
        `/api/functions/create/work`,
        data
      );
      dispatch(createWork(response.data));
      setIsLoading(true);
      setIsCreating(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      company: "",
      position: "",
      period: "",
    },
    validationSchema: Yup.object({
      company: Yup.string().required("company is required"),
      position: Yup.string().required("description is required"),
      period: Yup.string().required("period is required"),
    }),
    onSubmit: (values) => {
      const data = {
        userId: id,
        company: values.company,
        position: values.position,
        period: values.period,
      };

      createObj(data);
    },
  });

  return (
    <div className="popup_outer stop">
      <div className="popup__inner height">
        <div className="popup_top">
          <p className="popup__top__text">Add Projects</p>
          <div className="close__icon" onClick={() => setIsCreating(false)}>
            <AiOutlineClose />
          </div>
        </div>
        <div className="form__inputs">
          <form className="form__inner" onSubmit={formik.handleSubmit}>
            <div className="input__order">
              <label htmlFor="company">company</label>
              <input
                type="text"
                name="company"
                id="company"
                value={formik.values.company}
                onChange={formik.handleChange}
              />
            </div>

            <div className="input__order">
              <label htmlFor="position">position</label>
              <input
                type="text"
                name="position"
                id="position"
                value={formik.values.position}
                onChange={formik.handleChange}
              />
            </div>

            <div className="input__order">
              <label htmlFor="period">period</label>
              <input
                type="text"
                name="period"
                id="period"
                value={formik.values.period}
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

const WorkDisplay = ({ data, axiosPrivate, dispatch, id, allowed }) => {
  const [edit, setEdit] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const remove = async () => {
    try {
      const res = await axiosPrivate.delete(`/api/functions/${data._id}`);
      dispatch(deleteWork(res.data));
      setConfirm(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {edit && (
        <EditWork
          setEdit={setEdit}
          datas={data}
          axiosPrivate={axiosPrivate}
          dispatch={dispatch}
          id={id}
        />
      )}
      {confirm && (
        <DeleteWork
          data={data}
          axiosPrivate={axiosPrivate}
          dispatch={dispatch}
          setConfirm={setConfirm}
          remove={remove}
        />
      )}

      <div className="main__content">
        <div className="work__card">
          <h1>{data.company}</h1>
          {allowed && (
            <>
              <div className="blue__icon">
                <AiFillEdit onClick={() => setEdit(true)} />
              </div>
              <div className="blue__icon">
                <AiOutlineClose onClick={() => setConfirm(true)} />
              </div>
            </>
          )}
        </div>
        <div className="work__content">
          <p className="work__position">{data.position}</p>
          <p className="work__period">{data.period}</p>
        </div>
      </div>
    </>
  );
};

const EditWork = ({ setEdit, datas, axiosPrivate, dispatch, id }) => {
  const [isLoading, setIsLoading] = useState(false);

  const update = async (data) => {
    try {
      setIsLoading(true);
      const res = await axiosPrivate.put("/api/functions/work/edit", data);
      dispatch(updateWork(res.data));
      setIsLoading(false);
      setEdit(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      company: `${datas.company}`,
      position: `${datas.position}`,
      period: `${datas.period}`,
    },
    validationSchema: Yup.object({
      company: Yup.string().required("company is required"),
      position: Yup.string().required("position is required"),
      period: Yup.string().required("period is required"),
    }),
    onSubmit: (values) => {
      const data = {
        userId: id,
        workId: datas._id,
        company: values.company,
        position: values.position,
        period: values.period,
      };

      update(data);
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
              <label htmlFor="title">company</label>
              <input
                type="text"
                name="company"
                id="company"
                value={formik.values.company}
                onChange={formik.handleChange}
              />
            </div>

            <div className="input__order">
              <label htmlFor="link">position</label>
              <input
                type="text"
                name="position"
                id="position"
                value={formik.values.position}
                onChange={formik.handleChange}
              />
            </div>

            <div className="input__order">
              <label htmlFor="period">period</label>
              <input
                type="text"
                name="period"
                id="period"
                value={formik.values.period}
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

const DeleteWork = ({ remove, setConfirm }) => {
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
            <p className="yes" onClick={remove}>
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

export default WorkHistory;
