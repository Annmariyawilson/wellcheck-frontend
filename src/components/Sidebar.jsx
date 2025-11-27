import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../components/LogoutModal";
import { Check, House, History, LogOut, ChartColumn, KeyRound, UserCheck } from "lucide-react";

function TeacherSidebar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("teacher_id");
    navigate("/");
  };

  const links = [
    { to: "/teacher-dashboard", icon: <House className="w-6 h-6 sm:w-6 sm:h-6" />, label: "Dashboard", mobileLabel: "Home" },
    { to: "/teacher-history", icon: <History className="w-6 h-6 sm:w-6 sm:h-6" />, label: "History", mobileLabel: "History" },
    { to: "/teacher/MoodGraph", icon: <ChartColumn className="w-6 h-6 sm:w-6 sm:h-6" />, label: "Mood Graph", mobileLabel: "Graph" },
    { to: "/teacher/Studentlist", icon: <UserCheck className="w-6 h-6 sm:w-6 sm:h-6" />, label: "Reset Password", mobileLabel: "Reset Password" },
  ];

  return (
    <>
  
      <aside className="hidden sm:flex flex-col min-h-screen" style={{ backgroundColor: "#A0E7E5" }}>
        <div className="flex-1 flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-8 bg-[#03045E] rounded-full flex items-center justify-center text-white font-bold text-xl">
              <Check />
            </div>
            <h1 className="text-3xl font-bold hidden lg:block" style={{ color: "#03045E" }}>WellCheck</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-6 text-lg font-medium">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="flex items-center gap-4" style={{ color: "#333333" }}>
                    {link.icon}
                    <span className="hidden lg:block">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="mt-auto pt-8 border-t border-opacity-20" style={{ borderColor: "#333333" }}>
            <button onClick={() => setShowLogout(true)} className="flex items-center gap-4 w-full text-red-600">
              <LogOut className="w-6 h-6" />
              <span className="hidden lg:block">Logout</span>
            </button>
          </div>
        </div>
      </aside>

  
      <div className="fixed bottom-0 left-0 right-0 bg-[#A0E7E5] text-white sm:hidden flex justify-around items-center py-4 z-50 shadow-2xl">
        {links.map((link) => (
          <Link key={link.to} to={link.to} className="flex flex-col items-center gap-1" style={{ color: "#333333" }}>
            {link.icon}
            <span className="text-xs">{link.mobileLabel}</span>
          </Link>
        ))}
        <button onClick={() => setShowLogout(true)} className="flex flex-col items-center gap-1 text-red-600">
          <LogOut className="w-5 h-5" />
          <span className="text-xs">Logout</span>
        </button>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogout}
        onClose={() => setShowLogout(false)}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
}

export default TeacherSidebar;
