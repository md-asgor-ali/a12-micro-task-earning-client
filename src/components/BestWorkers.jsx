import React, { useEffect, useState } from 'react';
import { FaCoins } from 'react-icons/fa';
import useAxios from '../hooks/useAxios';


const BestWorkers = () => {
  const axiosSecure = useAxios(); // ✅ use your custom axios hook
  const [topWorkers, setTopWorkers] = useState([]);

  useEffect(() => {
    axiosSecure.get('/top-workers')
      .then(res => {
        if (Array.isArray(res.data)) {
          setTopWorkers(res.data);
        } else {
          console.warn("Unexpected response:", res.data);
          setTopWorkers([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch top workers:", err);
        setTopWorkers([]);
      });
  }, [axiosSecure]);

  return (
    <div className="py-12 bg-white px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        🏆 Top 6 Best Workers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topWorkers.map(worker => (
          <div
            key={worker._id}
            className="bg-blue-50 p-6 rounded-lg shadow text-center hover:shadow-lg transition-all duration-300"
          >
            <img
              src={worker.photoURL || 'https://i.ibb.co/yW5bqLT/user.png'}
              alt={worker.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-300 object-cover"
            />
            <h3 className="text-xl font-semibold text-blue-800">{worker.name}</h3>
            <p className="flex justify-center items-center gap-1 mt-2 text-gray-600 text-sm">
              <FaCoins className="text-yellow-500" />
              <span className="text-yellow-600 font-bold">{worker.coins} Coins</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
