import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Login = () => {
  const [isWrongEmail, setIsWrongEmail] = useState(false);
  let wrongEmailMsg = "you email was not found";

  const [isWrongPassWord, setIsWrongPassWord] = useState(false);
  let wrongPassword = "passwords don't match";

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  let tokenExpired = "token expired";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").required("Email Required"),
      password: Yup.string()
        .min(8, "password must be 8 characters or longer")
        .required("Password Required"),
    }),
    onSubmit: (values) => {
      const userData = {
        email: values.email,
        password: values.password,
      };
      dispatch(login(userData));
    },
  });

  useEffect(() => {
    if (isSuccess || accessToken) {
      navigate("/dash");
      dispatch(reset());
    }
  }, [accessToken, isSuccess]);

  useEffect(() => {
    if (isError && message === wrongEmailMsg) {
      setIsWrongEmail(true);
    }

    if (isError && message === wrongPassword) {
      setIsWrongPassWord(true);
    }

    if (message === tokenExpired) {
      setIsTokenExpired(true);
    }

    dispatch(reset());
  }, [message, isError]);

  return (
    <div className="register__main">
      <form onSubmit={formik.handleSubmit} className="register__form">
        <div className="register__top">
          <h2>
            Career<span className="register__span">Connect</span>
          </h2>
          <p>Empowering through Mentorship: Connect, Grow, Succeed.</p>
          <div className="register__token__error">
            {isTokenExpired && <p>Session expired, please login</p>}
          </div>
        </div>
        <div>
          <div className="login__email__error">
            {isWrongEmail && <p>wrong email</p>}
          </div>
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
          <div className="login__email__error">
            {isWrongPassWord && <p>wrong password</p>}
          </div>
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
              <AiOutlineCloseCircle size={23} />
            </div>
          )}
        </div>

        <button className="register__btn" type="submit">
          Login
        </button>
        <div className="register__redirect">
          <p>
            Don't have an account?{" "}
            <a className="register__redirect__link" href="/auth/register">
              Register
            </a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
