import { useEffect, useState } from "react";
import { RiFireLine } from "react-icons/ri";
import { PiHamburgerLight } from "react-icons/pi";

const HomePage = () => {
  const [userData, setUserData] = useState({
    calories: 2500,
    burn: 550,
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData") || "{}");

    setUserData(savedData);
  }, []);

  const consumed = 0;
  const remaining = userData.calories - consumed;

  const consumedPercentage = (consumed / userData.calories) * 100;

  return (
    <div className="relative -top-20 bg-white rounded-2xl shadow-sm p-6 w-full max-w-4xl">
      <div className="pb-2 border-b border-b-gray-200">
        <div className="flex justify-between">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <PiHamburgerLight className="text-orange-500 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Calories Consumed</h3>
              <p className="text-xl font-bold">0</p>
            </div>
          </div>
          <div className="flex flex-col ">
            <p className="text-gray-500">Limit</p>
            <p className="text-xl font-semibold">{userData.calories}</p>{" "}
          </div>
        </div>
        <div className="flex justify-between items-center"></div>
        <span className="font-semibold">{remaining} kcal</span> remaining
        <div className="mt-4 h-3 bg-gray-200 rounded-full">
          <div className="h-3 bg-green-500 rounded-full w-0" />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {Math.round(consumedPercentage)}%
        </p>{" "}
      </div>

      <div className="pt-1">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <RiFireLine className="text-orange-500 text-xl rotate-y-180" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Calories Burned</h3>
            <p className="text-xl font-bold">0</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500">Goal</p>
          </div>
          <p className="text-xl font-semibold">{userData.burn}</p>{" "}
        </div>

        <div className="mt-6 h-3 bg-gray-200 rounded-full">
          <div className="h-3 bg-orange-500 rounded-full w-0" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
