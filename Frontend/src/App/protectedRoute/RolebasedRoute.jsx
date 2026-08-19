import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const RolebasedRoute = ({ allowedRole }) => {
  const { employee } = useSelector((state) => state.auth);

  if (!allowedRole.includes(employee?.role)) {
    return <Navigate to="/unauthoraized" />;
  }

  return <Outlet />;
};

export default RolebasedRoute;
