import React, { useEffect, useState } from "react";
import { FaCoins, FaTrophy, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import useAxios from "../hooks/useAxios";

// Variants for container and cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BestWorkers = () => {
  const axiosSecure = useAxios();
  const [topWorkers, setTopWorkers] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/top-workers")
      .then((res) => setTopWorkers(Array.isArray(res.data) ? res.data : []))
      .catch(() => setTopWorkers([]));
  }, [axiosSecure]);

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-blue-900/95">
      {/* Animated Background Blobs */}
      <motion.div
        className="absolute top-0 left-0 w-[250px] h-[250px] bg-yellow-400 rounded-full opacity-20"
        animate={{ x: [0, 900, 0], y: [0, 500, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-white rounded-full opacity-10"
        animate={{ x: [-300, 0, -300], y: [-150, 250, -150] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 right-10 w-[200px] h-[200px] bg-yellow-300 rounded-full opacity-15"
        animate={{ x: [0, -200, 0], y: [0, 100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-[180px] h-[180px] bg-white rounded-full opacity-10"
        animate={{ x: [0, 150, 0], y: [0, -100, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 text-4xl md:text-5xl font-extrabold text-center mb-14"
      >
        <span className="text-white">🏆 Top 6 Best </span>
        <span className="text-yellow-400">Workers</span>
      </motion.h2>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {topWorkers.map((worker) => (
          <motion.div
            key={worker._id}
            variants={cardVariants}
            whileHover={{
              y: -12,
              boxShadow: "0 25px 50px rgba(234,179,8,0.25)",
            }}
            className="relative bg-white/5 backdrop-blur-md
              border border-yellow-400/20 rounded-2xl p-8
              text-center transition-all"
          >
            {/* Avatar with glow */}
            <div className="relative w-24 h-24 mx-auto mb-5">
              <motion.div
                className="absolute inset-0 rounded-full bg-yellow-400/30 blur-md"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              <img
                src={worker.photoURL || "https://i.ibb.co/yW5bqLT/user.png"}
                alt={worker.name}
                className="relative w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
              />
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-white">{worker.name}</h3>

            {/* Coins */}
            <motion.p
              className="flex justify-center items-center gap-2 mt-3 text-yellow-400 font-semibold"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <FaCoins />
              {worker.coins} Coins
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BestWorkers;
