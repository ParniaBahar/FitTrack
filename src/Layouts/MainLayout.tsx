import { Navigate, Outlet } from "react-router";

const MainLayout = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
