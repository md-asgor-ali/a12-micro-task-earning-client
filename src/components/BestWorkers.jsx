import React, { useEffect, useState } from 'react';

const BestWorkers = () => {
  const [topWorkers, setTopWorkers] = useState([]);

  useEffect(() => {
    // Fetch from your backend API
    fetch('https://your-backend-api.com/top-workers')
      .then(res => res.json())
      .then(data => setTopWorkers(data))
      .catch(err => {
        console.error("Failed to fetch top workers:", err);
        // fallback data
        setTopWorkers([
          {
            id: 1,
            name: 'Rakib Hasan',
            photo: 'https://randomuser.me/api/portraits/men/10.jpg',
            coins: 320,
          },
          {
            id: 2,
            name: 'Shamima Akter',
            photo: 'https://randomuser.me/api/portraits/women/22.jpg',
            coins: 290,
          },
          {
            id: 3,
            name: 'John Dev',
            photo: 'https://randomuser.me/api/portraits/men/18.jpg',
            coins: 275,
          },
          {
            id: 4,
            name: 'Lamia Jahan',
            photo: 'https://randomuser.me/api/portraits/women/27.jpg',
            coins: 250,
          },
          {
            id: 5,
            name: 'Ibrahim Hossain',
            photo: 'https://randomuser.me/api/portraits/men/30.jpg',
            coins: 240,
          },
          {
            id: 6,
            name: 'Nusaiba Noor',
            photo: 'https://randomuser.me/api/portraits/women/35.jpg',
            coins: 230,
          },
        ]);
      });
  }, []);

  return (
    <div className="py-12 bg-white px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        🔥 Best Workers of the Week
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {topWorkers.map(worker => (
          <div
            key={worker.id}
            className="bg-blue-50 p-6 rounded-lg shadow text-center hover:shadow-lg transition-all duration-300"
          >
            <img
              src={worker.photo}
              alt={worker.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-300"
            />
            <h3 className="text-xl font-semibold text-blue-800">{worker.name}</h3>
            <p className="text-gray-600 text-sm">Coins: <span className="text-yellow-500 font-bold">{worker.coins}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
