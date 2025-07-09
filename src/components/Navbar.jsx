import { Link, useNavigate } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import logo from '../assets/logo.png'

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  // Optional: You can add availableCoin and role later via custom user DB logic

  return (
    <div className="navbar bg-blue-950 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full px-4 flex justify-between items-center">
        {/* Left Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="text-2xl font-bold">
            <div className="text-white">Task<span className="text-warning">Hive</span></div>
          </Link>
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-warning font-bold">Login</Link>
              <Link to="/register" className="btn btn-warning font-bold">Register</Link>
              <a
                href="https://github.com/your-client-repo"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-warning font-bold"
              >
                Join as Developer
              </a>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white">Dashboard</Link>

              {/* Optional Coin Display */}
              {/* <div className="text-sm font-medium">
                <span className="text-gray-600">Coins:</span>{" "}
                <span className="text-primary font-bold">{availableCoin || 0}</span>
              </div> */}

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  {user?.photoURL ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.photoURL}
                      alt="User"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl text-primary" />
                  )}
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
                >
                  <li>
                    <p className="text-sm">
                      {user?.displayName || "User"}
                    </p>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>

              <a
                href="https://github.com/your-client-repo"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-warning"
              >
                Join as Developer
              </a>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <div className="md:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52"
          >
            {!user ? (
              <>
                <li><Link className="text-warning font-bold" to="/login">Login</Link></li>
                <li><Link className="text-warning font-bold" to="/register">Register</Link></li>
                <li>
                  <a
                    href="https://github.com/your-client-repo"
                    target="_blank"
                    rel="noreferrer"
                    className="text-warning font-bold"
                  >
                    Join as Developer
                  </a>
                </li>
              </>
            ) : (
              <>
                <li><Link className="text-white" to="/dashboard">Dashboard</Link></li>
                {/* <li><span>Coins: {availableCoin || 0}</span></li> */}
                <li><button onClick={handleLogout}>Logout</button></li>
                <li>
                  <a
                    href="https://github.com/your-client-repo"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Join as Developer
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
