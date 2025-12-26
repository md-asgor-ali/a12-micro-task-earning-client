import { Link, useNavigate } from "react-router";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCoins,
  FaGithub,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
} from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

 

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [availableCoin, setAvailableCoin] = useState(0);


      const handleDashboardClick = async () => {
  if (!user?.email) return;

  try {
    const res = await axiosSecure.get(`/users/${user.email}`);
    const userRole = res.data.role;

    const dashboardLink =
      userRole === "Admin"
        ? "/dashboard/admin-home"
        : userRole === "Buyer"
        ? "/dashboard/buyer-home"
        : "/dashboard/worker-home";

    navigate(dashboardLink);
  } catch (error) {
    console.error("Failed to fetch user role:", error);
  }
};


  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setAvailableCoin(res.data.coins || 0))
        .catch((err) => console.error("Failed to fetch coins", err));
    }
  }, [user, axiosSecure]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar bg-blue-950 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-2xl font-bold text-white flex items-center gap-1"
          >
            <FaCoins className="text-yellow-400" />
            <span>
              Task<span className="text-warning">Hive</span>
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <>
              <Link
                to="/login"
                className="btn btn-warning font-bold flex items-center gap-1"
              >
                <FaSignInAlt /> Login
              </Link>
              <Link
                to="/register"
                className="btn btn-warning font-bold flex items-center gap-1"
              >
                <FaUserPlus /> Register
              </Link>
              <a
                href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-md-asgor-ali"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-warning font-bold flex items-center gap-1"
              >
                <FaGithub /> Join as Developer
              </a>
            </>
          ) : (
            <>
              <Link
                onClick={handleDashboardClick}
                className="btn btn-outline btn-warning flex items-center gap-1"
              >
                <FaTachometerAlt /> Dashboard
              </Link>

              <a
                href="https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-md-asgor-ali"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-warning font-bold flex items-center gap-1"
              >
                <FaGithub /> Join as Developer
              </a>

              {/* Avatar + Coins */}
              <div className="flex items-center gap-2">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    {user?.photoURL ? (
                      <img
                        className="w-8 h-8 rounded-full"
                        src={user.photoURL}
                        alt="User"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl text-white" />
                    )}
                  </label>
                  <ul
                    tabIndex={0}
                    className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-48"
                  >
                    <li>
                      <p className="text-sm font-bold">
                        {user?.displayName || "User"}
                      </p>
                    </li>
                    <li>
                      <p className="flex items-center gap-2 text-yellow-600 font-medium">
                        <FaCoins /> {availableCoin}
                      </p>
                    </li>
                  </ul>
                </div>
                <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <FaCoins /> {availableCoin}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-warning font-bold flex items-center gap-1"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52"
          >
            {!user ? (
              <>
                <li>
                  <Link
                    className="text-yellow-400 font-bold flex items-center gap-2"
                    to="/login"
                  >
                    <FaSignInAlt /> Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-yellow-400 font-bold flex items-center gap-2"
                    to="/register"
                  >
                    <FaUserPlus /> Register
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/your-client-repo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellow-400 font-bold flex items-center gap-2"
                  >
                    <FaGithub /> Join as Developer
                  </a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="text-yellow-400 flex items-center gap-2"
                    onClick={handleDashboardClick}
                  >
                    <FaTachometerAlt /> Dashboard
                  </Link>
                </li>
                <li>
                  <span className="flex items-center gap-2 text-yellow-400 font-medium">
                    <FaCoins /> {availableCoin}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-yellow-400 flex items-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
                <li>
                  <a
                    href="https://github.com/your-client-repo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-yellow-400 flex items-center gap-2"
                  >
                    <FaGithub /> Join as Developer
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
