"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Graph from "../components/Graph";
import Sidebar from "../components/Sidebar";

export const Moods = {
  Ecstatic: 0,
  Happy: 1,
  Good: 2,
  Inspired: 3,
  Calm: 4,
  Numb: 5,
  Worried: 6,
  Sad: 7,
  Lethargic: 8,
  Grumpy: 9,
  Stressed: 10,
  Angry: 11
};


const emotions = Object.keys(Moods);

export default function StudentMoodHistory() {
  const [selectedMood, setSelectedMood] = useState("Happy");
  const [graphData, setGraphData] = useState([]);
  const [dominantMood, setDominantMood] = useState("");
  const [dominantStudents, setDominantStudents] = useState([]);

  const teacherId = localStorage.getItem("teacher_id"); // or however you store it
  const API = "https://wellcheck-backend.onrender.com/api";

  const dates = Array.from({ length: 7 }, (_, i) =>
    new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric" }
    )
  );

  const fetchWeeklyMoodTrend = async () => {
    try {
      const moodValue = Moods[selectedMood];

      const { data } = await axios.post(
        `${API}/teacher/class-weekly-activity/${teacherId}`,
        { moodValue }
      );

      const weeklyData = data.last7Days; // { "2025-11-22": 3, ... }

      const formatted = Object.keys(weeklyData).map((date, index) => ({
        date: dates[index],
        value: weeklyData[date].value,
        names: weeklyData[date].names,
      }));

      setGraphData(formatted);
    } catch (err) {
      console.error("Weekly Mood Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (teacherId) fetchWeeklyMoodTrend();
  }, [selectedMood]);

  const fetchDominantMood = async () => {
    try {
      const { data } = await axios.post(
        `${API}/teacher/class-highest-weekly/${teacherId}`
      );

      const moodIndex = data.highestMood.mood;
      const moodName = Object.keys(Moods).find(
        (key) => Moods[key] === moodIndex
      );

      setDominantMood(moodName || "N/A");

      // Fetch students grouped by mood (today)
      const todayGroup = await axios.get(
        `${API}/teacher/class-activity/${teacherId}`
      );

      const groupData = todayGroup.data.groups[moodIndex] || [];

      const students = groupData.map((s) => s.name || s.username);

      setDominantStudents(students);
    } catch (err) {
      console.error("Dominant Mood Error:", err);
    }
  };

  useEffect(() => {
    if (teacherId) fetchDominantMood();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-0 p-4 md:p-6">
        <Navbar />

        <div className="bg-white lg:mt-10 md:mt-10 mt-2 rounded-xl shadow p-3 max-h-[75vh] overflow-y-auto">
          {/* Mood Selector */}
          <label className="font-medium text-gray-600">Select Mood</label>
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

          {/* Graph */}
          <h2 className="text-xl font-semibold mb-1">Student Mood History</h2>
          <p className="text-gray-500 mb-4">
            Mood trend for <b>{selectedMood}</b> (Last 7 Days)
          </p>

          <Graph
            data={graphData}
            tooltipRenderer={({ payload, label }) => {
              if (!payload || payload.length === 0) return null;
              const point = payload[0].payload;

              return (
                <div
                  style={{
                    background: "white",
                    padding: 10,
                    borderRadius: 10,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
                  <p style={{ margin: 0 }}>Value: {point.value}</p>
                  {point.names?.length > 0 && (
                    <div
                      style={{
                        marginTop: 6,
                        maxHeight: "70px",
                        overflowY: "auto",
                      }}
                    >
                      {point.names.map((s, i) => (
                        <p>{s}</p>
                      ))}
                    </div>
                  )}
                </div>
              );
            }}
          />

          {/* Dominant Mood */}
          <div className="w-full p-3 mt-8 mb-2">
            <p className="text-lg font-semibold text-gray-800">
              This week most students felt{" "}
              <span className="text-xl text-[#4BAED1] font-bold">
                {dominantMood}
              </span>
            </p>
          </div>

          {/* Table of Students */}
          <table className="w-full mt-4 bg-white border rounded-lg overflow-hidden py-6 lg:mb-0 md:mb-0 mb-20">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="p-3 text-left font-semibold">#</th>
                <th className="p-3 text-left font-semibold">Student Name</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {dominantStudents.length > 0 ? (
                dominantStudents.map((student, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{student}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-3" colSpan={2}>
                    No students available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
