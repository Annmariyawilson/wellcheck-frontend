"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [resetting, setResetting] = useState(false);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          "https://wellcheck-backend.onrender.com/api/students"
        );
        setStudents(res.data.students);
      } catch (err) {
        console.error("Failed to fetch students", err);
        alert("Failed to fetch students");
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchStudents();
  }, []);

  const openModal = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPasswords({ newPassword: "", confirmPassword: "" });
  };

const handleResetPassword = async () => {
  if (passwords.newPassword !== passwords.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  setResetting(true);
  try {
    const res = await axios.post(
      "http://localhost:3000/api/teacher/reset-student-password",
      {
        student_id: selectedStudent.id,
        newPassword: passwords.newPassword,
      },
      { timeout: 20000 }
    );

    alert(res.data.message);
    closeModal();
  } catch (err) {
    alert(err.response?.data?.message || "Failed to reset password");
  } finally {
    setResetting(false);
  }
};

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-0 p-4 md:p-6">
        <Navbar />

        <h2 className="text-xl md:text-2xl font-bold mb-4 mt-5">
          Student List
        </h2>

        <div className="bg-white rounded-xl shadow p-4 md:p-6 mt-5 lg:mb-0 md:mb-0 mb-20">
          {loadingStudents ? (
            <p>Loading students...</p>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-5 px-4 py-2 border-b text-sm font-semibold text-gray-500">
                <p>Name</p>
                <p>Date of Birth</p>
                <p>Class</p>
                <p>Contact</p>
                <p>Actions</p>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="flex flex-col md:grid md:grid-cols-5 px-3 py-4 border-b last:border-none"
                  >
                    <p className="font-medium">{student.username}</p>
                    <p>{student.dob}</p>
                    <p>{student.class_id}</p>
                    <p>{student.phone}</p>

                    <div>
                      <button
                        onClick={() => openModal(student)}
                        className="px-3 py-1 rounded-md text-sm"
                        style={{ backgroundColor: "#A0E7E5", color: "#1A1A1A" }}
                      >
                        Reset Password
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Reset Password Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white w-11/12 sm:w-[400px] p-6 rounded-xl shadow-lg">
            <h3
              className="text-xl font-semibold mb-4 text-center"
              style={{ color: "#333333" }}
            >
              Reset Password
            </h3>

            <p className="text-gray-900 mb-3 text-center">
              {selectedStudent?.username}
            </p>

            <label
              className="block font-medium mb-1"
              style={{ color: "#333333" }}
            >
              New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md mb-4"
              style={{ color: "#333333" }}
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
            />

            <label
              className="block font-medium mb-1"
              style={{ color: "#333333" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-md mb-4"
              style={{ color: "#333333" }}
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md border"
                style={{
                  borderColor: "#33333380",
                  color: "#333333",
                  backgroundColor: "#FDFEFE3F",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={resetting}
                className="px-4 py-2 rounded-md"
                style={{ backgroundColor: "#A0E7E5", color: "#333333" }}
              >
                {resetting ? "Resetting..." : "Reset"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
