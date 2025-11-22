import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "../components/LogoutModal";
import React from "react";
import { Check, House, History, LogOut } from "lucide-react";


function StudentSidebar() {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    setShowLogout(false);
    localStorage.removeItem("student_id");
    navigate("/");
  };

  return (
    <>
      {/* Sidebar  */}
      <aside className="hidden sm:flex flex-col bg-[#5B4F9B] text-white min-h-screen">
        <div className="flex-1 flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-md flex items-center justify-center">
              <Check color="#FFD85A" strokeWidth={6} />
            </div>
            <h1 className="text-2xl font-bold hidden lg:block">WellCheck</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-6 text-lg font-medium">
              <li>
                <Link
                  to="/student/checkin"
                  className="flex items-center gap-3"
                >
                  <House className="w-6 h-6" />
                  <span className="hidden lg:block">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/student/history"
                  className="flex items-center gap-3"
                >
                  <History className="w-6 h-6" />
                  <span className="hidden lg:block">History</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logout at Bottom */}
          <div className="mt-auto pt-10 border-t border-white border-opacity-20">
            <button
              onClick={() => setShowLogout(true)}
              className="flex items-center gap-3 w-full"
            >
              <LogOut className="w-6 h-6" />
              <span className="hidden lg:block">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#5B4F9B] text-white sm:hidden flex justify-around items-center py-4 z-50 shadow-2xl">
        <Link to="/student/checkin" className="flex flex-col items-center gap-1">
          <House className="w-6 h-6" />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/student/history" className="flex flex-col items-center gap-1">
          <History className="w-6 h-6" />
          <span className="text-xs">History</span>
        </Link>
        <button onClick={() => setShowLogout(true)} className="flex flex-col items-center gap-1">
          <LogOut className="w-6 h-6" />
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

export default StudentSidebar;