import { useEffect, useState } from "react";
import { RiFireLine } from "react-icons/ri";
import { PiHamburgerLight } from "react-icons/pi";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdElectricBolt } from "react-icons/md";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";
import { MdHeight } from "react-icons/md";
import api from "../Api/axios";

const HomePage = () => {
  const [userData, setUserData] = useState({
    calories: 2500,
    burn: 550,
  });

  const [consumed, setConsumed] = useState(0);
  const [burned, setBurned] = useState(0);
  const [activeMinutes, setActiveMinutes] = useState(0);
  const [workouts, setWorkouts] = useState(0);
  const [goal, setGoal] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [foodLogs, setFoodLogs] = useState<any[]>([]);

  const bmi =
    height && weight ? (weight / (height / 100) ** 2).toFixed(1) : "0";

  useEffect(() => {
    const getData = async () => {
      try {
        const [userResponse, foodResponse, activityResponse] =
          await Promise.all([
            api.get("/users/me"),
            api.get("/food-logs"),
            api.get("/activity-logs"),
          ]);

        const user = userResponse.data;
        const foodLogsData = foodResponse.data;
        const activityLogs = activityResponse.data;

        setFoodLogs(foodLogsData);

        setUserData({
          calories: user.calories || 2500,
          burn: user.burn || 550,
        });

        setWeight(user.weight || 0);
        setHeight(user.height || 0);
        setGoal(user.goal);

        const totalFoodCalories = foodLogsData.reduce(
          (total: any, item: any) => {
            return total + (item.calories || 0);
          },
          0,
        );

        const totalBurnCalories = activityLogs.reduce(
          (total: any, item: any) => {
            return total + (item.calories || 0);
          },
          0,
        );

        const totalMinutes = activityLogs.reduce((total: any, item: any) => {
          return total + (item.minutes || 0);
        }, 0);

        setConsumed(totalFoodCalories);
        setBurned(totalBurnCalories);
        setActiveMinutes(totalMinutes);
        setWorkouts(activityLogs.length);
      } catch (error: any) {
        console.log(error.response?.data);
      }
    };

    getData();
  }, []);

  const bmiColor =
    Number(bmi) < 18.5
      ? "text-blue-500"
      : Number(bmi) < 25
        ? "text-green-500"
        : Number(bmi) < 30
          ? "text-yellow-500"
          : "text-red-500";

  const remaining = userData.calories - consumed;

  const consumedPercentage = userData.calories
    ? (consumed / userData.calories) * 100
    : 0;

  const burnPercentage = userData.burn ? (burned / userData.burn) * 100 : 0;

  return (
    <div>
      <div className="relative -top-10 bg-white rounded-2xl shadow-sm p-6 w-full max-w-4xl">
        <div className="pb-2 border-b border-gray-200">
          <div className="flex justify-between">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <PiHamburgerLight className="text-orange-500 text-xl" />
              </div>

              <div>
                <h3 className="font-semibold text-lg">Calories Consumed</h3>

                <p className="text-xl font-bold">{consumed}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-500">Limit</p>

              <p className="text-xl font-semibold">{userData.calories}</p>
            </div>
          </div>
          <span className="font-semibold">{remaining}</span> kcal remaining
          <div className="mt-4 h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-green-500 rounded-full"
              style={{
                width: `${Math.min(consumedPercentage, 100)}%`,
              }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {Math.round(consumedPercentage)}%
          </p>
        </div>

        <div className="pt-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <RiFireLine className="text-orange-500 text-xl rotate-y-180" />
            </div>

            <div>
              <h3 className="font-semibold text-lg">Calories Burned</h3>

              <p className="text-xl font-bold">{burned}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-500">Goal</p>

            <p className="text-xl font-semibold">{userData.burn}</p>
          </div>

          <div className="mt-6 h-3 bg-gray-200 rounded-full">
            <div
              className="h-3 bg-orange-500 rounded-full"
              style={{
                width: `${Math.min(burnPercentage, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-5 w-full max-w-4xl">
        <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <TbActivityHeartbeat className="text-blue-600 text-2xl" />
            </div>

            <p className="text-gray-600 font-medium">Active</p>
          </div>

          <h2 className="text-3xl font-bold mt-5">{activeMinutes}</h2>
          <p className="text-gray-400 mt-1">minutes today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 w-full">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-xl">
              <MdElectricBolt className="text-blue-600 text-2xl" />
            </div>

            <p className="text-gray-600 font-medium">Active</p>
          </div>

          <h2 className="text-3xl font-bold mt-5">{workouts}</h2>
          <p className="text-gray-400 mt-1">activities logged</p>
        </div>
      </div>
      <div className=" flex gap-5 mt-10 bg-gradient-to-r from-gray-950 to-gray-700 rounded-2xl shadow-sm p-6  w-full max-w-4xl">
        <div className="bg-gray-800 p-3 rounded-2xl">
          <FaArrowTrendUp className="text-green-600 text-2xl" />
        </div>
        <div>
          <h2 className="text-gray-400">your goal</h2>
          <p className="capitalize text-white">🔥{goal} weight</p>
        </div>
      </div>
      <div className="mt-8 w-full max-w-4xl rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center">
            <FaBalanceScale className="text-2xl text-indigo-500" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Body Metrics</h2>
            <p className="text-gray-500">Your stats</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <FaBalanceScale className="text-gray-500" />
            </div>

            <p className="text-lg text-gray-600">Weight</p>
          </div>

          <p className="text-2xl font-semibold">
            {weight} <span className="text-lg">kg</span>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <MdHeight className="text-gray-500 text-xl" />
            </div>

            <p className="text-lg text-gray-600">Height</p>
          </div>

          <p className="text-2xl font-semibold">
            {height} <span className="text-lg">cm</span>
          </p>
        </div>

        <div className="my-6 border-t"></div>

        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">BMI</h3>

          <p className={`text-3xl font-bold ${bmiColor}`}>{bmi}</p>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full flex">
          <div className="w-1/4 bg-blue-200"></div>
          <div className="w-1/4 bg-green-200"></div>
          <div className="w-1/4 bg-yellow-200"></div>
          <div className="w-1/4 bg-red-200"></div>
        </div>

        <div className="mt-2 flex justify-between text-sm text-gray-400">
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
        </div>
      </div>
      <div className="mt-8 w-full max-w-4xl bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-5">Today's Summary</h2>

        <div className="divide-y">
          <div className="flex justify-between py-4">
            <span className="text-gray-500">Meals logged</span>

            <span className="font-semibold">{foodLogs?.length || 0}</span>
          </div>

          <div className="flex justify-between py-4">
            <span className="text-gray-500">Total calories</span>

            <span className="font-semibold">{consumed} kcal</span>
          </div>

          <div className="flex justify-between py-4">
            <span className="text-gray-500">Active time</span>

            <span className="font-semibold">{activeMinutes} min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
