"use client";

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const StudentForgotPassword = () => {
  const [form, setForm] = useState({
    phone: "",
    dob: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const navigate = useNavigate();


  const handleResetPassword = async () => {
    const { phone, dob, newPassword } = form;

    if (!phone || !dob || !newPassword) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://wellcheck-backend.onrender.com/api/student/forgot-password",
        { phone, dob, newPassword }
      );

      alert("Password reset successful");
navigate("/"); 

      setForm({ phone: "", dob: "", newPassword: "" });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
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
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#87D8D6] outline-none shadow-sm"
          />

          <button
            onClick={handleResetPassword}
            className="w-full py-3 rounded-lg bg-[#87D8D6] text-white font-semibold hover:bg-[#6CCBC8] transition shadow-md"
          >
            Reset Password
          </button>
        </div>

      </div>
    </div>
  );
};

export default StudentForgotPassword;
