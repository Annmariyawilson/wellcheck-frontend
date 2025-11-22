import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentCheckin from "./pages/StudentCheckin";
import StudentHistory from "./pages/StudentHistory";

import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherHistory from "./pages/TeacherHistory";
import MoodGraph from "./pages/MoodGraph";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />

      {/* Teacher Routes */}
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher-history" element={<TeacherHistory />} />
      <Route path="/teacher/MoodGraph" element={<MoodGraph />} />
      {/* Student Routes */}
      <Route path="/student/checkin" element={<StudentCheckin />} />
      <Route path="/student/history" element={<StudentHistory />} />
    </Routes>
  );
}

export default App;
