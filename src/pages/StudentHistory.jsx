import React, { useEffect, useState } from "react";
import axios from "axios";

import StudentSidebar from "../components/studentSidebar";
import StudentNavbar from "../components/studentNavbar";

// mood icons
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
  0: { text: "Angry", icon: angry },
  1: { text: "Calm", icon: calm },
  2: { text: "Ecstatic", icon: ecstatic },
  3: { text: "Good", icon: good },
  4: { text: "Grumpy", icon: grampy },
  5: { text: "Happy", icon: happy },
  6: { text: "Inspired", icon: inspired },
  7: { text: "Lethargic", icon: lethargic },
  8: { text: "Numb", icon: numb },
  9: { text: "Sad", icon: sad },
  10: { text: "Stressed", icon: stressed },
  11: { text: "Worried", icon: worried }
};

export default function StudentHistory() {
  const [history, setHistory] = useState([]);
  const studentId = localStorage.getItem("student_id");

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `https://wellcheck-backend.onrender.com/api/student/activity/${studentId}`
      );

      const activities = res.data.activities;

      // sort by latest date
      activities.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setHistory(activities);
    } catch (err) {
      console.log(err);
      alert("Unable to fetch history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      
      <StudentSidebar />
      

      <div className="flex-1 md:ml-0 ml-0 p-4 md:p-6 mb-16 sm:mb-0">
        <StudentNavbar />

        <div className="py-6 lg:mb-0 md:mb-0 mb-20">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            My Mood History
          </h2>

          <div className="bg-white rounded-xl shadow p-4 md:p-6">
            <div className="hidden sm:grid grid-cols-3 px-4 py-2 border-b text-sm font-semibold text-gray-500">
              <p>Mood</p>
              <p>Remark</p>
              <p>Date</p>
            </div>
          <div className="max-h-[60vh] overflow-y-auto">
            {history.map((item, i) => {
              const mood = moodMap[item.value];
              return (
                <div
                  key={i}
                  className="flex flex-col sm:grid sm:grid-cols-3 px-3 py-4 border-b last:border-none"
                >
                  {/* Mood */}
                  <div className="flex items-center gap-3">
                    <img src={mood.icon} alt={mood.text} className="w-7 h-7" />
                    <span className="text-gray-700">{mood.text}</span>
                  </div>

                  {/* Remark */}
                  <p className="text-gray-600 mt-3 sm:mt-0">{item.remark || "-"}</p>

                  {/* Date */}
                  <p className="text-gray-500 text-sm mt-3 sm:mt-0">
{new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              );
            })}

            {history.length === 0 && (
              <p className="text-center py-6 text-gray-500">
                No history found.
              </p>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
