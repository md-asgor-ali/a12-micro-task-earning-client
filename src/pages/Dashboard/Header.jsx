// components/Header.jsx
import { useContext } from "react";
import { BellIcon } from "lucide-react"; // optional, use lucide/react
import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-900">🔰 MicroTask</h1>
      <div className="flex items-center gap-4">
        <p className="text-sm font-semibold">Coins: {user?.coins || 0}</p>
        <div className="flex flex-col items-end text-right">
          <p className="font-medium">{user?.displayName || "No Name"}</p>
          <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
        </div>
        <img src={user?.photoURL} alt="profile" className="w-10 h-10 rounded-full border" />
        <button className="btn btn-ghost btn-circle text-lg">
          <BellIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
