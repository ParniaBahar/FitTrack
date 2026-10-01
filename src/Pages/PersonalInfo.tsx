import { useState } from "react";
import { FaBalanceScale } from "react-icons/fa";
import { LuTarget, LuPersonStanding } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../Api/axios";

const PersonalInfo = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [1, 2, 3];

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [calories, setCalories] = useState(2500);
  const [burn, setBurn] = useState(550);

  const [goal, setGoal] = useState("");

  const saveData = async () => {
    try {
      const userResponse = await api.get("/users/me");

      const userId = userResponse.data.id;

      await api.put(`/users/${userId}`, {
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        goal,
        calories,
        burn,
      });

      console.log("Personal information saved");
    } catch (error: any) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-100 via-green-50 to-white flex items-center justify-center">
      <div className="w-full max-w-3xl min-h-screen flex flex-col">
        <div className="px-5 pt-6">
          <div className="flex gap-3 items-center">
            <LuPersonStanding className="text-3xl text-white bg-green-500 py-1 px-2 rounded-xl" />

            <h1 className="text-3xl font-semibold">FitTrack</h1>
          </div>

          <p className="text-gray-500 mt-2">
            Let's personalize your experience
          </p>
        </div>

        <div className="px-5 mt-8">
          <div className="flex gap-2">
            {steps.map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full ${
                  step <= currentStep ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-500 mt-3 text-sm">Step {currentStep} of 3</p>
        </div>

        <div className="mt-10 px-5">
          {currentStep === 1 && (
            <>
              <div className="flex gap-3 items-center">
                <FiUser className="text-3xl text-green-500 bg-green-200 py-1 px-2 rounded-xl" />

                <h2 className="text-2xl font-semibold">How old are you?</h2>
              </div>

              <p className="text-gray-500 mt-3">
                This helps us calculate your needs
              </p>

              <label className="mt-8 block font-medium">Age*</label>

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
                placeholder="Enter your age"
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="flex gap-3 items-center">
                <FaBalanceScale className="text-3xl text-green-500 bg-green-200 py-1 px-2 rounded-xl" />

                <h2 className="text-2xl font-semibold">Your measurements</h2>
              </div>

              <p className="text-gray-500 mt-3">Help us track your progress</p>

              <label className="mt-8 block font-medium">Weight (kg)*</label>

              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />

              <label className="mt-5 block font-medium">Height (cm)</label>

              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
            </>
          )}

          {currentStep === 3 && (
            <>
              <div className="flex gap-3 items-center">
                <LuTarget className="text-3xl text-green-500 bg-green-200 py-1 px-2 rounded-xl" />

                <h2 className="text-2xl font-semibold">What's your goal?</h2>
              </div>

              <p className="text-gray-500 mt-3">We'll tailor your experience</p>

              <div className="flex flex-col gap-6 py-10">
                <button
                  onClick={() => {
                    setGoal("lose");
                    setCalories(2100);
                    setBurn(650);
                  }}
                >
                  Lose Weight
                </button>

                <button
                  onClick={() => {
                    setGoal("maintain");
                    setCalories(2500);
                    setBurn(550);
                  }}
                >
                  Maintain Weight
                </button>

                <button
                  onClick={() => {
                    setGoal("gain");
                    setCalories(3000);
                    setBurn(450);
                  }}
                >
                  Gain Weight
                </button>
              </div>

              <h3>Daily Calorie Intake</h3>

              <p className="text-xl font-bold text-green-600">
                {calories} kcal
              </p>

              <input
                type="range"
                min={120}
                max={3970}
                step={50}
                value={calories}
                onChange={(e) => setCalories(Number(e.target.value))}
              />

              <h3 className="mt-10">Daily Calorie Burn</h3>

              <p className="text-xl font-bold text-green-600">{burn} kcal</p>

              <input
                type="range"
                min={100}
                max={5000}
                step={25}
                value={burn}
                onChange={(e) => setBurn(Number(e.target.value))}
              />
            </>
          )}
        </div>

        <div className="flex-1 flex items-end justify-center pb-6">
          <div className="flex gap-5">
            {currentStep > 1 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-10 py-3 rounded-xl border"
              >
                Back
              </button>
            )}

            <button
              onClick={async () => {
                if (currentStep < 3) {
                  setCurrentStep(currentStep + 1);
                } else {
                  await saveData();

                  navigate("/");
                }
              }}
              className="px-10 py-3 rounded-xl bg-green-600 text-white"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
