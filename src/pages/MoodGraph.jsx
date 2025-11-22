import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Graph from "../components/Graph";
import Sidebar from "../components/Sidebar";

export const Moods = {
  Angry: 0,
  Calm: 1,
  Ecstatic: 2,
  Good: 3,
  Grumpy: 4,
  Happy: 5,
  Inspired: 6,
  Lethargic: 7,
  Numb: 8,
  Sad: 9,
  Stressed: 10,
  Worried: 11,
};

const emotions = Object.keys(Moods);

export default function StudentMoodHistory() {
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [graphData, setGraphData] = useState([]);
  const [dominantMood, setDominantMood] = useState("");

  const teacherId = localStorage.getItem("teacher_id");
  const BASE_URL = "https://wellcheck-backend.onrender.com/api";

  useEffect(() => {
    if (!teacherId) return;
    fetchGraphData();
    fetchDominantMood();
  }, [selectedMood]);

  //  Weekly mood graph API
  const fetchGraphData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/teacher/class-weekly-activity/${teacherId}`,
        { moodValue: Moods[selectedMood] }
      );

      const last7Days = response.data.last7Days; // object (date → count)
      const formatted = Object.entries(last7Days)
        .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB)) // ensure correct order
        .map(([date, value]) => ({
          date: new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          value,
        }));

      setGraphData(formatted);
    } catch (error) {
      console.log("Graph API error:", error);
    }
  };

  //  Highest weekly average mood (✔ matches backend)
  const fetchDominantMood = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/teacher/class-highest-weekly/${teacherId}`
      );

      const highestMoodNumber = response.data.highestMood.mood;
      const moodName = Object.keys(Moods).find(
        (mood) => Moods[mood] === highestMoodNumber
      );

      setDominantMood(moodName || "No data");
    } catch (error) {
      console.log("Highest mood API error:", error);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-0 p-4 md:p-6">
        <Navbar />

        <div className="p-0 lg:mt-10 md:mt-10 mt-2  max-h-[70vh] overflow-y-auto">
          <div className="bg-white rounded-xl shadow p-6">
            {/* Mood Selector */}
            <label className="font-medium text-gray-600 mt-4">
              Select Mood <span>{"  "}</span>
            </label>
            <select
              className="border rounded-lg p-2 w-full max-w-xs mt-2 mb-6 focus:ring-2 focus:ring-[#4BAED1]"
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
            >
              {emotions.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-1">Student Mood History</h2>
            <p className="text-gray-500 mb-4">
              Mood trend for <span className="font-medium">{selectedMood}</span>{" "}
              (Last 7 Days)
            </p>

            {/* Graph */}
            <Graph data={graphData} />

            {/* Dominant Mood */}
            <div className="w-full p-3 mt-8 mb-2">
              <p className="text-lg font-semibold text-black">
                This week most students felt{" "}
                <span className="text-xl">{dominantMood}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
