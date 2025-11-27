import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("overview");
  const [teacherName, setTeacherName] = useState("Teacher");



  // Fetch teacher details
  useEffect(() => {
    const id = localStorage.getItem("teacher_id");

    if (!id) return;

    axios
      .get(`https://wellcheck-backend.onrender.com/api/teacher/${id}`)
      .then((res) => {
        setTeacherName(res.data.data.username);
      })
      .catch(() => {
        setTeacherName("Teacher");
      });
  }, []);

  return (
    <div
      className="p-6 rounded-xl"
      style={{ backgroundColor: "#A0E7E5",color:"#03045E" }}
    >
      <h1 className="text-3xl font-bold">
        Welcome back, {teacherName}
      </h1>
    </div>
  );
}

export default Navbar;
