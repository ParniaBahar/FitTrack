import { useEffect, useState } from "react";
import api from "../Api/axios";

const Header = () => {
  const [user, setUser] = useState({
    name: "there",
    goal: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get("/users/me");

        setUser({
          name: response.data.name || "there",
          goal: response.data.goal || "",
        });
      } catch (error: any) {
        console.log(error.response?.data);
      }
    };

    getUser();
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-3xl px-6 pt-10 pb-25 text-white shadow-lg">
      <p className="text-green-100 text-sm font-medium">Welcome back</p>

      <h1 className="mt-2 text-3xl font-bold">Hi {user.name}! 👋</h1>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-12 w-full items-center py-8 px-6 gap-2 rounded-2xl bg-white/20">
          <span className="text-2xl">💪</span>

          <p className="text-green-50 text-l">
            {user.goal
              ? `Ready to crush your ${user.goal} goal today!`
              : "Ready to crush today? Start logging!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
