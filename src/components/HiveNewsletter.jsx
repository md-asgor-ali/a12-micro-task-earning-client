import React from "react";
import { motion } from "framer-motion";
import { FaEnvelopeOpenText, FaRegPaperPlane } from "react-icons/fa";

export default function HiveNewsletter() {
  return (
    <section className="py-16 bg-blue-100">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-blue-900 "
        >
           Join the Hive Updates 🐝
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 max-w-xl mx-auto"
        >
          Stay updated with the latest tasks, earning opportunities, and exclusive
          offers from <span className="font-semibold">TaskHive</span>.  
          Enter your email and be part of the buzz!
        </motion.p>

        {/* Newsletter Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
        >
          <div className="relative w-full md:flex-1">
            <FaEnvelopeOpenText className="absolute left-3 top-3 text-neutral-400" />
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-neutral-300 
              focus:ring-2 focus:ring-yellow-400 outline-none dark:bg-yellow-500 text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-600 
            text-gray-700 font-semibold shadow-md transition"
          >
            Subscribe <FaRegPaperPlane />
          </button>
        </motion.form>

        {/* Small note */}
        <p className="mt-4 text-xs ">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
