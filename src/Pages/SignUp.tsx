import { FaRegEnvelope, FaLock,} from "react-icons/fa6";
import { CiAt } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [error, setError] = useState("");
const handleSignup = () => {
  if (!username || !email || !password) {
    setError("Please fill in all fields.");
    setTimeout(() => {
      setError("");
    }, 5000);
    return;
  }

  setError("");

  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  navigate("/personal");
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center">Sign Up</h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Please enter your details to create an account.
        </p>

        <div className="space-y-5">
          <div>
            <label htmlFor="username" className="font-medium select-none">
              Username
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3">
              <CiAt className="text-gray-400" />

              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="ml-3 w-full outline-none bg-transparent"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="font-medium select-none">
              Email
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3">
              <FaRegEnvelope className="text-gray-400" />

              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="ml-3 w-full outline-none bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="font-medium select-none">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3">
              <FaLock className="text-gray-400" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="ml-3 w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-s text-center">{error}</p>}
          <button
            onClick={handleSignup}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
