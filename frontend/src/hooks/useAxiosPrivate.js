import { axiosPrivate } from "../Api/axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refresh, logout, setErrorMsg } from "../features/auth/authSlice";

const useAxiosPrivate = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = dispatch(refresh());

          newAccessToken
            .then((token) => {
              prevRequest.headers["Authorization"] = `Bearer ${token.payload}`;
              return axiosPrivate(prevRequest);
            })
            .catch((error) => {
              if (error?.response?.status === 403) {
                dispatch(setErrorMsg("token expired"));
                dispatch(logout());
              }
            });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, dispatch]);

  return axiosPrivate;
};

export default useAxiosPrivate;
