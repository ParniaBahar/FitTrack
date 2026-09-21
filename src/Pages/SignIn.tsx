import { FaRegEnvelope, FaLock } from "react-icons/fa6";
import { Link } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const savedEmail = localStorage.getItem("email");
  const savedPassword = localStorage.getItem("password");
  const [error, setError] = useState("");
  const handleLogin = () => {
    if (email !== savedEmail || password !== savedPassword) {
      setError("Invalid email or password.");

      setTimeout(() => {
        setError("");
      }, 5000);

      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div
        className={`fixed top-5 left-1/2 -translate-x-1/2 flex items-center gap-3
    bg-red-50 text-red-500 px-4 py-2 rounded-xl shadow-md
    transition-all duration-500
    ${
      error
        ? "opacity-100 translate-y-0"
        : "opacity-0 -translate-y-4 pointer-events-none"
    }`}
      >
        <ImCross />
        <p>{error}</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center">Sign In</h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Please enter your email and password to access your account.
        </p>

        <div className="space-y-5">
          <div>
            <label htmlFor="email" className="font-medium select-none">
              Email
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-4 py-3">
              <FaRegEnvelope className="text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="ml-3 w-full outline-none bg-transparent"
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
          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Login
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
