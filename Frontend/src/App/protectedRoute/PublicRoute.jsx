import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const { employee, loading } = useSelector((state) => state.auth);
  console.log("employeee=>>>>", employee)
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (employee) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
