import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Check, Eye, EyeOff, ChevronDown } from "lucide-react";

function Login() {
  const [userType, setUserType] = useState("Teacher");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = "https://wellcheck-backend.onrender.com/api";

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username & password");
      return;
    }

    try {
      const url =
        userType === "Teacher"
          ? `${BASE_URL}/teacher/login`
          : `${BASE_URL}/student/login`;

      const res = await axios.post(url, { username, password });

      alert(res.data.message);

      if (userType === "Teacher") {
        localStorage.setItem("teacher_id", res.data.data.id);
        navigate("/teacher-dashboard");
      } else {
        localStorage.setItem("student_id", res.data.data.id);
        navigate("/student/checkin");
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    if (userType === "Teacher") navigate("/teacher-forgot-password");
    else navigate("/student-forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <div className="bg-[#FDFEFE] shadow-xl rounded-2xl p-8 w-full max-w-sm text-center border border-gray-200">

        {/* LOGO */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-[#03045E] rounded-full flex items-center justify-center text-white font-bold text-xl">
            <Check />
          </div>
          <h1 className="text-3xl font-bold text-[#03045E] tracking-wide">
            WellCheck
          </h1>
        </div>

        {/* TITLE */}
        <h2 className="text-left font-semibold text-[#333333] mb-4 text-xl">
          Login
        </h2>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-[#4BAED1]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* PASSWORD */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#4BAED1]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* FORGOT PASSWORD */}
        <p
          onClick={handleForgotPassword}
          className="text-sm text-[#03045E] font-medium hover:underline cursor-pointer mb-4 text-right"
        >
          Forgot Password?
        </p>

        {/* USER TYPE */}
        <div className="mb-6">
          <label className="text-left block text-sm font-medium text-[#333333] mb-2">
            User Type
          </label>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex justify-between items-center hover:bg-gray-50"
            >
              <span className="font-medium">{userType}</span>
              <ChevronDown
                size={20}
                className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  type="button"
                  onClick={() => {
                    setUserType("Teacher");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#4BAED1] hover:text-white"
                >
                  Teacher
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserType("Student");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#4BAED1] hover:text-white rounded-b-lg"
                >
                  Student
                </button>
              </div>
            )}
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-[#A0E7E5] text-[#333333] font-semibold hover:bg-[#6CCBC8] transition shadow-md"
        >
          Log in
        </button>

        <p className="text-sm text-[#333333] mt-3">
          Don’t have an account?{" "}
          <Link to="/userSelection" className="font-semibold text-[#03045E] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
