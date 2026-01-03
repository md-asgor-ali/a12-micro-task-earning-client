import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';

// Variants for staggered entry
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 70, damping: 12 },
  },
};

const contentVariants = {
  hidden: { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    paddingTop: '1rem',
    paddingBottom: '1.5rem',
    transition: {
      opacity: { duration: 0.2, ease: "easeOut" },
      height: { type: "spring", stiffness: 70, damping: 15, duration: 0.4 },
      paddingTop: { duration: 0.2, ease: "easeOut" },
      paddingBottom: { duration: 0.2, ease: "easeOut" },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: {
      opacity: { duration: 0.2, ease: "easeIn" },
      height: { type: "spring", stiffness: 70, damping: 15, duration: 0.3 },
      paddingTop: { duration: 0.2, ease: "easeOut" },
      paddingBottom: { duration: 0.2, ease: "easeOut" },
    },
  },
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: "How do I register and what are the initial benefits?",
      answer: "Upon registration, you'll choose your role: Worker or Buyer. Workers receive 10 coins, Buyers receive 50 coins. Sign up using your name, email, profile picture URL, and password."
    },
    {
      id: 2,
      question: "What login options are available on the platform?",
      answer: "You can sign in using your registered email/password or use Google Sign-In for convenience."
    },
    {
      id: 3,
      question: "How can Buyers create new tasks on the platform?",
      answer: "Buyers fill out a form with task title, description, required workers, payment per worker, deadline, submission requirements, and optional image. Total cost is automatically calculated."
    },
    {
      id: 4,
      question: "What happens if a Buyer has insufficient coins for a task?",
      answer: "An alert 'Not available Coin. Purchase Coin' appears. You'll then be redirected to the Coin Purchase Page."
    },
    {
      id: 5,
      question: "How do Workers earn and withdraw their rewards?",
      answer: "Workers earn coins by completing tasks. Withdrawal is available once coins reach 200 (equivalent to $10 at 20 coins = $1)."
    },
    {
      id: 6,
      question: "Does the platform include a notification system?",
      answer: "Yes, Workers and Buyers receive real-time notifications about task submissions, approvals, rejections, and withdrawal status."
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-blue-900/95">
        <motion.div
          className="absolute top-0 left-0 w-[200px] h-[200px] bg-yellow-400 rounded-full opacity-20"
          animate={{ x: [0, 800, 0], y: [0, 400, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white rounded-full opacity-10"
          animate={{ x: [-200, 0, -200], y: [-100, 200, -100] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-yellow-400 uppercase tracking-wider mb-2">Support</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-white">Frequently Asked</span>{" "}
            <span className="text-yellow-400">Questions</span>
          </h2>
          <p className="text-gray-200 max-w-3xl mx-auto text-lg md:text-xl">
            Quick answers to the most common questions about using our Micro-Task and Earning Platform.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px) brightness(1.2)',
                WebkitBackdropFilter: 'blur(10px) brightness(1.2)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
              onClick={() => toggleFAQ(index)}
            >
              {/* Question */}
              <div className={`p-6 flex justify-between items-center ${activeIndex === index ? 'border-b border-gray-700' : ''}`}>
                <h3 className="text-xl font-semibold text-white pr-4">{faq.question}</h3>
                <span className="text-yellow-400 text-2xl flex-shrink-0">
                  {activeIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <p className="text-gray-200 text-lg leading-relaxed px-6">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
