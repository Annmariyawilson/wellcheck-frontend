import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import StudentCheckin from "./pages/StudentCheckin";
import StudentHistory from "./pages/StudentHistory";

import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherHistory from "./pages/TeacherHistory";
import MoodGraph from "./pages/MoodGraph";
import Signup from "./pages/Signup";
import UserSelection from "./pages/UserSelection";
import Studentlist from "./pages/Studentlist";
import TeacherResetPassword from "./pages/TeacherForgotPassword";
import StudentForgotPassword from "./pages/StudentForgotPassword";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/userSelection" element={<UserSelection />} />

      {/* Teacher Routes */}
      <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      <Route path="/teacher-history" element={<TeacherHistory />} />
      <Route path="/teacher/MoodGraph" element={<MoodGraph />} />
      <Route path="/teacher/Studentlist" element={<Studentlist />} />
      {/* Student Routes */}
      <Route path="/student/student-checkin" element={<StudentCheckin />} />
      <Route path="/student/history" element={<StudentHistory />} />

      <Route
        path="/teacher-forgot-password"
        element={<TeacherResetPassword />}
      />
      <Route
        path="/student-forgot-password"
        element={<StudentForgotPassword />}
      />
    </Routes>
  );
}

export default App;
