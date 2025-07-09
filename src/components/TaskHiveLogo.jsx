import React from 'react';
import logo from '../assets/logo.png'; // Adjust path if necessary

const TaskHiveLogo = ({ size = "w-32" }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={logo}
        alt="TaskHive Logo"
        className={`${size} h-auto object-contain`}
      />
      <span className="text-2xl font-bold text-primary hidden sm:inline">TaskHive</span>
    </div>
  );
};

export default TaskHiveLogo;
