import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";

const MainLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <div className="lg:ml-64">
        <Header />

        <main className="p-5 pb-24 lg:pb-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
