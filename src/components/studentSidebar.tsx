import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../components/LogoutModal";
import { Check, House, History, LogOut, KeyRound } from "lucide-react";
import React from "react";

function StudentSidebar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("student_id");
    navigate("/");
  };

  const links = [
    { to: "/student/checkin", icon: <House className="w-6 h-6" />, label: "Dashboard" },
    { to: "/student/history", icon: <History className="w-6 h-6" />, label: "History" },
  ];

  return (
    <>
    
      <aside className="hidden sm:flex flex-col bg-[#A0E7E5] text-white min-h-screen">
        <div className="flex-1 flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-[#03045E] rounded-full flex items-center justify-center text-white font-bold text-xl">
              <Check />
            </div>
            <h1 className="text-3xl font-bold hidden lg:block" style={{ color: "#03045E" }}>WellCheck</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-6 text-lg font-medium">
              {links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="flex items-center gap-3" style={{ color: "#333333" }}>
                    {link.icon}
                    <span className="hidden lg:block">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="mt-auto pt-10 border-t border-opacity-20" style={{ borderColor: "#333333" }}>
            <button onClick={() => setShowLogout(true)} className="flex items-center font-semibold gap-3 w-full text-red-600">
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
          </Link>
        ))}
        <button onClick={() => setShowLogout(true)} className="flex flex-col items-center gap-1" style={{ color: "#333333" }}>
          <LogOut className="w-6 h-6" />
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

export default StudentSidebar;
