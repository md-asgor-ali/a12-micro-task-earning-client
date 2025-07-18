import React from "react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-red-500">403</h1>
        <p className="text-xl">Forbidden: You don’t have access to this page.</p>
      </div>
    </div>
  );
};

export default Forbidden;
