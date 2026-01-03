import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaRegLightbulb, FaClipboardList, FaCheckSquare, FaWallet, FaHandshake } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: "easeOut",
    },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 15, mass: 0.5 },
  },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const HowItWorks = () => {
  const steps = [
    { id: 1, icon: FaUserPlus, title: "Sign Up", description: "Create your account as a Worker or Buyer. Quick and easy to get started.", role: "Both" },
    { id: 2, icon: FaRegLightbulb, title: "Post Tasks", description: "Buyers post tasks clearly with budget and deadlines to attract the best workers.", role: "Buyer" },
    { id: 3, icon: FaClipboardList, title: "Browse & Select", description: "Workers explore tasks that match their skills and submit proposals.", role: "Worker" },
    { id: 4, icon: FaCheckSquare, title: "Submit Work", description: "Workers deliver completed tasks. Buyers review for quality and satisfaction.", role: "Both" },
    { id: 5, icon: FaHandshake, title: "Approve & Pay", description: "Buyers approve submissions, and payments are sent securely to workers.", role: "Buyer" },
    { id: 6, icon: FaWallet, title: "Withdraw Earnings", description: "Workers withdraw earned coins easily once reaching the minimum threshold.", role: "Worker" },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-blue-900/95">
      {/* Animated Floating Circles */}
      <motion.div
        className="absolute top-0 left-0 w-[200px] h-[200px] bg-yellow-400 rounded-full opacity-20"
        animate={{ x: [0, 800, 0], y: [0, 400, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-400 rounded-full opacity-10"
        animate={{ x: [-200, 0, -200], y: [-100, 200, -100] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-white">How TaskHive</span>{' '}
            <span className="text-yellow-400">Works 🛠️</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Follow these six simple steps to start earning or getting your tasks done efficiently.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="p-8 rounded-2xl shadow-xl flex flex-col justify-between text-center"
              variants={cardVariants}
              whileHover="hover"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px) brightness(1.2)',
                WebkitBackdropFilter: 'blur(10px) brightness(1.2)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              <div>
                <div className="mb-6 flex justify-center items-center">
                  <step.icon className="text-5xl text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.id}. {step.title}</h3>
                <p className="text-gray-200 text-lg leading-relaxed">{step.description}</p>
              </div>
              <div className="mt-6">
                <span className="inline-block bg-yellow-400 bg-opacity-20 text-yellow-300 text-sm font-medium px-4 py-1 rounded-full border border-yellow-300 border-opacity-30">
                  For {step.role}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
