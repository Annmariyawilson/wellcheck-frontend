"use client";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const TeacherForgotPassword = () => {
  const [form, setForm] = useState({
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleResetPassword = async () => {
    if (!form.phone || !form.dob || !form.password || !form.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "https://wellcheck-backend.onrender.com/api/teacher/forgot-password",
        {
          phone: form.phone,
          dob: form.dob,
          newPassword: form.password,
        }
      );

      alert(res.data.message);
      navigate("/"); 

      setForm({ phone: "", dob: "", password: "", confirmPassword: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#e0f7f7] to-[#c8eaea] p-4">

      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-8 border border-white/40">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Reset Password
        </h2>

        <div className="space-y-5">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#87D8D6] outline-none shadow-sm"
          />

          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#87D8D6] outline-none shadow-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#87D8D6] outline-none shadow-sm"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#87D8D6] outline-none shadow-sm"
          />

          <button
            onClick={handleResetPassword}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition shadow-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#87D8D6] hover:bg-[#6CCBC8]"
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TeacherForgotPassword;
