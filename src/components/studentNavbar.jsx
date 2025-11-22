

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; 
import { Check} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#5B4F9B] p-3 rounded-xl  shadow-sm border-b border-gray-100">
        <div className="max-w-7xl ms-7">
          <div className="flex items-center h-16">

            {/* Left= Logo + App Name */}
            <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-md flex items-center justify-center">
            <Check color="#FFD85A" strokeWidth={6}/>
          </div>
              <span className="text-2xl font-bold text-[#FAFAFA]">WellCheck</span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}