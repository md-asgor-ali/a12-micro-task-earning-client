import React from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaCoins } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo & Description */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaCoins className="text-yellow-400 text-3xl" />
            <Link to="/" className="text-3xl font-bold text-white select-none">
              Task<span className="text-warning">Hive</span>
            </Link>
          </div>
          <p className="mt-2 text-sm max-w-sm">
            A Micro-Task & Earning Platform where Workers earn and Buyers grow their reach. Powered by MERN.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-warning mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li>
              <a
                href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-md-asgor-ali"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Join as Developer
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-warning mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://github.com/md-asgor-ali" target="_blank" rel="noreferrer" className="hover:text-warning">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/asgor542" target="_blank" rel="noreferrer" className="hover:text-warning">
              <FaLinkedin />
            </a>
            <a href="https://web.facebook.com/md.asgor.ali.416176" target="_blank" rel="noreferrer" className="hover:text-warning">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-sm border-t border-gray-700 py-4">
        © {new Date().getFullYear()} TaskHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
