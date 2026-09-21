import { useState } from "react";
import { LuPersonStanding } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { FaBalanceScale } from "react-icons/fa";

const PersonalInfo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [age, setAge] = useState("");
  const steps = [1, 2, 3];

  return (
    <div className="min-h-screen bg-linear-to-b from-green-100 via-green-50 to-white flex items-center justify-center">
      <div className="w-full max-w-3xl min-h-screen flex flex-col">
        {}
        <div className="px-5 pt-6">
          <div className="flex gap-3 items-center">
            <LuPersonStanding className="text-3xl text-white bg-green-500 py-1 px-2 rounded-xl" />

            <h1 className="text-3xl font-semibold">FitTrack</h1>
          </div>

          <p className="text-gray-500 mt-2 text-base">
            Let's personalize your experience
          </p>
        </div>

        {}
        <div className="px-5 mt-8">
          <div className="flex gap-2">
            {steps.map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all duration-500 ${
                  step <= currentStep ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-500 mt-3 text-sm">Step {currentStep} of 3</p>
        </div>

        {}
        <div className="mt-10 flex flex-col justify-center px-5">
          {currentStep === 1 && (
            <>
              <div className="flex gap-3 items-center">
                <FiUser className="text-3xl text-green-500 bg-green-200 py-1 px-2 rounded-xl" />

                <h2 className="text-2xl font-semibold">How old are you?</h2>
              </div>

              <p className="text-gray-500 mt-3 text-base">
                This helps us calculate your needs
              </p>

              <label className="mt-8 font-medium text-base">Age*</label>

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 text-base outline-none focus:border-green-500"
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

              <p className="text-gray-500 mt-3 text-base">
                Help us track your progress
              </p>

              <label className="mt-8 font-medium text-base">Weight (kg)*</label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3 text-base outline-none focus:border-green-500"
                placeholder="Enter your weight"
              />

              <label className="mt-5 font-medium text-base">
                Height (cm) - Optional
              </label>

              <input
                type="number"
                className="w-full border rounded-xl px-4 py-3 text-base outline-none focus:border-green-500"
                placeholder="Enter your height"
              />
            </>
          )}
        </div>

        {}
        <div className="flex-1 gap-5 pb-6 flex items-end justify-center lg:px-0">
          <div className="flex justify-between  gap-5 mt-8">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-10 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => {
                if (currentStep < 3) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className="px-10 py-3 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
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
