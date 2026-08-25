import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";

const ProtectedRoute = () => {
  const { employee, loading } = useSelector((state) => state.auth);

  if (loading) {
    return null;
  }

  if (!employee) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
