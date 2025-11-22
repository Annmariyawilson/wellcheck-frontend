import React, { useState } from "react";
import axios from "axios";

import StudentSidebar from "../components/studentSidebar";
import StudentNavbar from "../components/studentNavbar";

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

const emotions = [
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
  { label: "Worried", img: worried },
];

export default function StudentCheckin() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedEmotion) return;

    const student_id = localStorage.getItem("student_id");
    if (!student_id) {
      alert("Student ID not found. Please login again.");
      return;
    }

    const body = {
      value: emotions.findIndex((e) => e.label === selectedEmotion),
      remark,
      student_id: Number(student_id),
    };

    setLoading(true);
    try {
      const res = await axios.post(
        "https://wellcheck-backend.onrender.com/api/student/activity",
        body
      );

      alert("Check-in submitted successfully!");
      setSelectedEmotion(null);
      setRemark("");
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col sm:flex-row">
      <StudentSidebar />

      <div className="flex-1 md:ml-0 ml-0 p-4 md:p-6 mb-16 sm:mb-0 overflow-y-auto">
        <StudentNavbar />

        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">
            How are you feeling today?
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
            {emotions.map((e, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedEmotion(e.label)}
                className={`text-center bg-white p-4 rounded-xl shadow transition border
                ${
                  selectedEmotion === e.label
                    ? "border-[#5B4F9B] shadow-lg scale-105"
                    : "border-transparent"
                }`}
              >
                <img
                  src={e.img}
                  alt={e.label}
                  className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
                />
                <p className="mt-2 font-semibold text-base sm:text-lg">
                  {e.label}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <label className="text-xl sm:text-2xl block font-bold mb-2">
              Tell us more
            </label>
            <textarea
              className="w-full p-3 rounded-xl border border-[#5B4F9B] bg-white 
                focus:outline-none focus:ring-1 focus:ring-[#5B4F9B] resize-none"
              rows={4}
              placeholder="Describe your feelings..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            ></textarea>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              disabled={!selectedEmotion || loading}
              onClick={handleSubmit}
              className="px-6 sm:px-8 py-3 bg-[#5B4F9B] text-white text-lg sm:text-2xl font-semibold rounded-xl disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

