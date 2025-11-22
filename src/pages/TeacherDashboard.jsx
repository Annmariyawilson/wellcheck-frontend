import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCircle from "../components/circular-progressbar";

import angry from "../assets/images/emojis/angry.png";
import calm from "../assets/images/emojis/calm.png";
import ecstatic from "../assets/images/emojis/ecstatic.png";
import good from "../assets/images/emojis/good.png";
import grampy from "../assets/images/emojis/grampy.png";
import happy from "../assets/images/emojis/happy.png";
import inspired from "../assets/images/emojis/inspired.png";
import lethargic from "../assets/images/emojis/lethargic.png";
import numb from "../assets/images/emojis/numb.png";
import sad from "../assets/images/emojis/sad.png";
import stressed from "../assets/images/emojis/stressed.png";
import worried from "../assets/images/emojis/worried.png";

// Order must match backend mood values (0-11)
const moodList = [
  { label: "Angry", img: angry },
  { label: "Calm", img: calm },
  { label: "Ecstatic", img: ecstatic },
  { label: "Good", img: good },
  { label: "Grumpy", img: grampy },
  { label: "Happy", img: happy },
  { label: "Inspired", img: inspired },
  { label: "Lethargic", img: lethargic },
  { label: "Numb", img: numb },
  { label: "Sad", img: sad },
  { label: "Stressed", img: stressed },
  { label: "Worried", img: worried }
];

export default function TeacherDashboard() {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  const teacher_id = localStorage.getItem("teacher_id");

  useEffect(() => {
    if (!teacher_id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://wellcheck-backend.onrender.com/api/teacher/class-activity/${teacher_id}`
        );
        setActivity(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [teacher_id]);

  if (loading) return <p className="p-6 text-lg">Loading...</p>;
  if (!activity) return <p className="p-6 text-lg">No data found</p>;

  // Prepare emotion counts
  const emotionCounts = moodList.map((m, index) => {
    return {
      ...m,
      count: activity.groups[index]?.length || 0
    };
  });

  // Students sad or stressed
  const sadOrStressed =
    (activity.groups[9]?.length || 0) + (activity.groups[10]?.length || 0);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex-1 md:ml-0 ml-0 p-4 md:p-6">

        <Navbar />

        {/* CLASSROOM EMOTIONS GRID */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">Your Classroom Today</h3>

          <div
            className="
              grid 
              grid-cols-2 
              sm:grid-cols-3 
              md:grid-cols-4 
              lg:grid-cols-6 
              xl:grid-cols-8 
              gap-4 sm:gap-6
            "
          >
            {emotionCounts.map((e, idx) => (
              <div
                key={idx}
                className="text-center bg-white p-4 rounded-xl shadow"
              >
                <img
                  src={e.img}
                  alt={e.label}
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
                />
                <p className="font-semibold mt-2 text-base sm:text-lg">
                  {e.count}
                </p>
                <p className="text-sm text-gray-700">{e.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* INSIGHT CARDS */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 lg:mb-0 md:mb-0 mb-20">

          {/* Student Logins */}
          <div className="bg-white p-6 rounded-xl shadow flex justify-center">
            <StatCircle
              size={130}
              value={activity.completed}
              label="Student logins"
            />
          </div>

          {/* Engagement */}
          <div className="bg-white p-6 rounded-xl shadow flex justify-center">
            <StatCircle
              size={130}
              value={activity.completed}
              label="Student engagement"
            />
          </div>

          {/* Action Required */}
          <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4">
            <img src={sad} alt="Sad" className="w-12 h-12" />
            <p className="text-lg font-semibold leading-tight">
              {sadOrStressed} students are sad or stressed
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
