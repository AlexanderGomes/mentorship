import { useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const useRequireAuth = () => {
  const { accessToken } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  if (!accessToken) {
     navigate("/auth/register", { state: { from: location }, replace: true })
  }

  return accessToken && <Outlet />
};

export default useRequireAuth;
