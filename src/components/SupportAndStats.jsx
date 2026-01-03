import { motion } from "framer-motion";
import { Users, Globe, BookOpen, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router";

const SupportAndStats = () => {
  const navigate = useNavigate();

  const linkToContactSupport = () => navigate("/contact-support");
  const linkToBrowseDocumentation = () => navigate("/browse-documentation");

  const stats = [
    { number: "24/7", label: "Expert Support", icon: Clock },
    { number: "98%", label: "Worker Satisfaction", icon: Star },
    { number: "500+", label: "Active Users", icon: Users },
    { number: "50+", label: "Countries Served", icon: Globe },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-blue-900/95">
      {/* Animated Background */}
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

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Title & Subtitle */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">TaskHive</span>{" "}
            <span className="text-yellow-400">Support & Stats</span>
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg md:text-xl">
            Explore our support resources and see how TaskHive connects Buyers and Workers worldwide.
          </p>
        </motion.div>

        {/* Support Card */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:shadow-2xl transition-all duration-500">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center backdrop-blur-sm border border-yellow-300/20">
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Our TaskHive support team is available 24/7 to assist Buyers and Workers. Get help quickly and easily.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={linkToContactSupport}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="h-5 w-5" />
                <span>Contact Support</span>
              </motion.button>

              <motion.button
                onClick={linkToBrowseDocumentation}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="h-5 w-5" />
                <span>Browse Documentation</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              <stat.icon className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-200 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportAndStats;
