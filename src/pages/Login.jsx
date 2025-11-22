import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        {/* Logo & Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#4BAED1] rounded-full flex items-center justify-center text-white font-bold text-xl">
            <Check />
          </div>
          <h1 className="text-2xl font-bold text-[#5B4F9B]">WellCheck</h1>
        </div>

        <h2 className="text-left font-semibold text-[#5B4F9B] mb-4">Login</h2>

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* User Type Dropdown */}
        <div className="mb-6">
          <label className="text-left block text-sm font-medium text-[#5B4F9B] mb-2">
            User Type
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg flex justify-between items-center hover:bg-gray-50 focus:outline-none"
            >
              <span className="font-medium">{userType}</span>
              <ChevronDown
                size={20}
                className={`transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setUserType("Teacher");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#4BAED1] hover:text-white transition-colors"
                >
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserType("Student");
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-[#4BAED1] hover:text-white transition-colors rounded-b-lg"
                >
                  Student
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg bg-[#4BAED1] text-white font-semibold hover:bg-[#3d99b8] transition-colors shadow-md"
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default Login;
