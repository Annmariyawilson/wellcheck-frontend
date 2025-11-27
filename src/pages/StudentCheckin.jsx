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
  { label: "Ecstatic", img: ecstatic },   // 0
  { label: "Happy", img: happy },         // 1
  { label: "Good", img: good },           // 2
  { label: "Inspired", img: inspired },   // 3
  { label: "Calm", img: calm },           // 4
  { label: "Numb", img: numb },           // 5
  { label: "Worried", img: worried },     // 6
  { label: "Sad", img: sad },             // 7
  { label: "Lethargic", img: lethargic }, // 8
  { label: "Grumpy", img: grampy },       // 9
  { label: "Stressed", img: stressed },   // 10
  { label: "Angry", img: angry }          // 11
];

const moodMessages = {
  Happy: "Happiness grows when we recognize it. What’s one thing you’re grateful for today?",
  Ecstatic: "Recognize what made the day feel incredible and bring similar moments into everyday life.",
  Inspired: "Capture and preserve the ideas that sparked inspiration today for the future.",
  Calm: "Acknowledge the moments of calm and keep them as tools for busy times.",
  Numb: "Allow yourself to experience the quiet space—what might your body need right now?",
  Worried: "Focusing on small manageable actions can reduce the heaviness of worry.",
  Lethargic: "Low energy is a sign to recharge—rest without pressure.",
  Grumpy: "Step back and notice what caused irritation to separate the feeling from the situation.",
  Sad: "Sadness is valid—giving it space allows comfort and healing.",
  Stressed: "Small adjustments can create space to breathe and think clearly.",
  Angry: "Anger highlights needs or boundaries—acknowledge them to communicate clearly.",
  Good: "Appreciate the balance—steady progress matters more than intensity."
};

export default function StudentCheckin() {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
      await axios.post(
        "https://wellcheck-backend.onrender.com/api/student/activity",
        body
      );

      // Show modal instead of alert
      setShowModal(true);

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

        {/*  Custom Navbar Added Here */}
        <div className="bg-[#A0E7E5] p-3 rounded-xl shadow-sm border-b border-gray-100">
          <div className="max-w-7xl ms-7">
            <div className="flex items-center h-16">

              {/* Left = Logo + App Name */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-[#03045E]">
                  Dashboard
                </span>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-4">How are you feeling today?</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6">
            {emotions.map((e, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedEmotion(e.label)}
                className={`text-center bg-white p-4 rounded-xl shadow transition border ${
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
            <label className="text-xl sm:text-2xl block font-bold mb-2">Tell us more</label>
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
              className="px-6 sm:px-8 py-3 bg-[#A0E7E5] text-[#333333] text-lg sm:text-2xl font-semibold rounded-xl disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>

          {/* -------- MODAL -------- */}
          {showModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-8">
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full text-center">

                <img
                  src={emotions.find((e) => e.label === selectedEmotion)?.img}
                  alt={selectedEmotion}
                  className="w-20 h-20 mx-auto mb-4"
                />

                <h2 className="text-2xl font-bold mb-2"style={{color:"#333333"}}>{selectedEmotion}</h2>
                <p className=" text-lg mb-6"style={{color:"#333333"}}>
                  {moodMessages[selectedEmotion]}
                </p>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedEmotion(null);
                    setRemark("");
                  }}
                  className="px-6 py-2 bg-[#A0E7E5] text-[#333333] rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {/* ---------------------- */}

        </div>
      </div>
    </div>
  );
}
