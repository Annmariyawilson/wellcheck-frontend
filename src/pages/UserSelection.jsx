import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserTypeSelect() {
  const [userType, setUserType] = useState("Teacher");
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/signup", { state: { userType } });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-3"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <div
        className="rounded-2xl p-8 w-full max-w-sm text-center border border-[#33333380]"
        style={{ backgroundColor: "#FDFEFE" }}
      >
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#333333" }}>
          Select Your User Type
        </h1>

        <div className="flex bg-gray-100 rounded-lg overflow-hidden mb-8 border border-[#33333380]">
          <button
            onClick={() => setUserType("Teacher")}
            className="w-1/2 py-3 font-semibold transition"
            style={{
              backgroundColor:
                userType === "Teacher" ? "#A0E7E54D" : "#FDFEFE",
              color: "#333333",
            }}
          >
            Teacher
          </button>

          <button
            onClick={() => setUserType("Student")}
            className="w-1/2 py-3 font-semibold transition"
            style={{
              backgroundColor:
                userType === "Student" ? "#A0E7E54D" : "#FDFEFE",
              color: "#333333",
            }}
          >
            Student
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="w-1/2 py-3 rounded-lg font-semibold border hover:opacity-90 transition"
            style={{
              borderColor: "#33333380",
              color: "#333333",
              backgroundColor: "#FDFEFE3F",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleContinue}
            className="w-1/2 py-3 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
            style={{ backgroundColor: "#A0E7E5", color: "#333333" }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
