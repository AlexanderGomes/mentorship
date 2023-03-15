import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Register.css";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      code: "",
      email: "",
      password: "",
      password2: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("name is required")
        .min(3, "name must be 2 characters or longer"),
      email: Yup.string().email("invalid email").required("Email Required"),
      password: Yup.string()
        .min(8, "password must be 8 characters or longer")
        .required("Password Required"),
      password2: Yup.string()
        .min(8, "password must be 8 characters or longer")
        .required("Password Required")
        .oneOf([Yup.ref("password"), null], "Passwords don't match"),
    }),
    onSubmit: (values) => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      dispatch(register(userData));
    },
  });

  useEffect(() => {
    if (isSuccess || accessToken) {
      navigate("/dash");
    }

    dispatch(reset());
  }, [accessToken, isSuccess]);

  return (
    <div className="register__main">
      <form onSubmit={formik.handleSubmit} className="register__form">
        <div className="register__top">
          <h2>Mentor</h2>
          <p>guide others into a better career</p>
        </div>
        <div>
          <input
            className="input"
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            onBlur={formik.handleBlur}
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.touched.name && formik.errors.name && (
            <div className="register__input__error">
              <AiOutlineCloseCircle size={23} />
            </div>
          )}
        </div>
        <div>
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            placeholder="example@test.com"
            onBlur={formik.handleBlur}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="register__input__error">
              <AiOutlineCloseCircle size={23} />
            </div>
          )}
        </div>
        <div>
          <input
            className="input"
            id="password"
            name="password"
            type="password"
            placeholder="password min 8 charaters"
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="register__input__error">
              <AiOutlineCloseCircle size={23}/>
            </div>
          )}
        </div>

        <div>
          <input
            className="input"
            id="password2"
            name="password2"
            type="password"
            placeholder="confirm password"
            onBlur={formik.handleBlur}
            value={formik.values.password2}
            onChange={formik.handleChange}
          />
          {formik.touched.password2 && formik.errors.password2 && (
            <div className="register__input__error">
              <AiOutlineCloseCircle size={23} />
            </div>
          )}
        </div>
        <button className="register__btn" type="submit">
          Register
        </button>
        <div className="register__redirect">
          <p>
            Already have an account? <a className="register__redirect__link" href="/auth/login">Login</a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
