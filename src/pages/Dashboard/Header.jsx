// components/Header.jsx
import { useContext } from "react";
import { BellIcon } from "lucide-react";
import { AuthContext } from "../../contexts/AuthContext";
import { FaCoins } from "react-icons/fa";
import { Link } from "react-router";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-blue-950 text-white shadow">
      {/* Left: Logo */}
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-2"
      >
        <FaCoins className="text-yellow-400 text-3xl" />
        <span>
          Task<span className="text-yellow-400">Hive</span>
        </span>
      </Link>

      {/* Right: User Info and Notifications */}
      <div className="flex items-center gap-4">
        <p className="text-sm font-semibold">Coins: {user?.coins || 0}</p>

        <div className="flex flex-col items-end text-right">
          <p className="font-medium">{user?.displayName || "No Name"}</p>
          <p className="text-xs text-gray-300 capitalize">{user?.role}</p>
        </div>

        <img
          src={user?.photoURL}
          alt="profile"
          className="w-10 h-10 rounded-full border-2 border-white object-cover"
        />

        <button className="btn btn-ghost btn-circle text-white text-xl">
          <BellIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;

