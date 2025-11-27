import React, { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// Mood icons
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

const moodMap = {
  0: { text: "Ecstatic", icon: ecstatic },
  1: { text: "Happy", icon: happy },
  2: { text: "Good", icon: good },
  3: { text: "Inspired", icon: inspired },
  4: { text: "Calm", icon: calm },
  5: { text: "Numb", icon: numb },
  6: { text: "Worried", icon: worried },
  7: { text: "Sad", icon: sad },
  8: { text: "Lethargic", icon: lethargic },
  9: { text: "Grumpy", icon: grampy },
  10: { text: "Stressed", icon: stressed },
  11: { text: "Angry", icon: angry }
};

export default function StudentsResult() {
  const [students, setStudents] = useState([]);

  const teacherId = localStorage.getItem("teacher_id");

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        `https://wellcheck-backend.onrender.com/api/teacher/class-activity/${teacherId}`
      );

      setStudents(res.data.students);

    } catch (err) {
      console.log(err);
      alert("Failed to load students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 ml-0 md:ml-0 p-4 md:p-6">
        <Navbar />

        <div className="mt-6 lg:mb-0 md:mb-0 mb-20">
          <h2 className="text-2xl font-bold mb-6">Students</h2>

          <div className="bg-white rounded-xl shadow overflow-hidden">
            {/* Header - Desktop */}
            <div className="hidden sm:grid grid-cols-2 px-4 py-2 border-b text-sm font-semibold text-gray-500">
              <p>Student</p>
              <p>Latest Mood (Today)</p>
            </div>

            {/* Student List */}
            <div className="max-h-[60vh] overflow-y-auto">
            {students.map((s, i) => {
              const latestActivity = s.student_activity?.[0];

              const mood =
                latestActivity && moodMap[latestActivity.value]
                  ? moodMap[latestActivity.value]
                  : null;

              return (
                <div
                  key={i}
                  className="
                    grid sm:grid-cols-2 
                    grid-cols-1 
                    gap-2 sm:gap-0
                    px-4 py-3 
                    border-b last:border-none
                  "
                >
                  {/* Student Name */}
                  <p className="text-gray-800 font-semibold text-base">
                    {s.username}
                  </p>

                  {/* Mood */}
                  {mood ? (
                    <div className="flex items-center gap-3">
                      <img src={mood.icon} alt={mood.text} className="w-6 h-6" />
                      <span className="text-gray-700">{mood.text}</span>
                    </div>
                  ) : (
                    <p className="text-gray-500">No activity today</p>
                  )}
                </div>
              );
            })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
