import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refresh, reset, setDecodedId } from "../features/auth/authSlice";
import { Outlet } from "react-router-dom";
import user from "../functionality/user";

function PersistentLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken, isError, isSuccess } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const id = user.getUserIdFromAccessToken(accessToken);
    dispatch(setDecodedId(id));
  }, [accessToken])
  

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        dispatch(refresh());
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    dispatch(reset());
  }, [isError, isSuccess]);

  return <>{isLoading ? <p>Loading....</p> : <Outlet />}</>;
}

export default PersistentLogin;
