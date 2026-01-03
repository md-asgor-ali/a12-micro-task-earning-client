import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { motion } from "framer-motion";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const { role } = useRole();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();

  const dashboardLink =
    role === "Admin"
      ? "/dashboard/admin-home"
      : role === "Buyer"
      ? "/dashboard/buyer-home"
      : "/dashboard/worker-home";
  const from = location.state?.from?.pathname || dashboardLink;

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMsg, setErrorMsg] = useState("");

  // Email/password login
  const onSubmit = async (data) => {
    setErrorMsg("");
    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;

      const token = await user.getIdToken();
      axiosSecure.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      const userdata = await axiosSecure.get(`/users/${user.email}`);
      const userRole = userdata.data.role;

      const dashboardLink =
        userRole === "Admin"
          ? "/dashboard/admin-home"
          : userRole === "Buyer"
          ? "/dashboard/buyer-home"
          : "/dashboard/worker-home";

      navigate(dashboardLink);
    } catch (error) {
      console.error(error);
      setErrorMsg("Invalid email or password.");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    try {
      const result = await googleLogin();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "Worker",
      };

      try {
        await axiosSecure.post("/users", userData);
      } catch (err) {
        if (err.response?.status !== 409) throw err;
      }

      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        timer: 1500,
        showConfirmButton: false,
      });

      const userdata = await axiosSecure.get(`/users/${user.email}`);
      const userRole = userdata.data.role;

      const dashboardLink =
        userRole === "Admin"
          ? "/dashboard/admin-home"
          : userRole === "Buyer"
          ? "/dashboard/buyer-home"
          : "/dashboard/worker-home";

      navigate(dashboardLink);
    } catch (error) {
      console.error(error);
      setErrorMsg("Google sign-in failed. Try again.");
    }
  };

  // Floating blobs
  const floatingBlobs = [
    { size: 250, top: 0, left: 50, delay: 0 },
    { size: 350, bottom: 0, right: 0, delay: 2 },
    { size: 200, top: "30%", right: 40, delay: 1 },
    { size: 180, bottom: "25%", left: 20, delay: 3 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-blue-900/95 overflow-hidden">
      
      {/* Animated background */}
      {floatingBlobs.map((blob, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full bg-yellow-400/20"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
          }}
          animate={{ x: [0, 600, 0], y: [0, 400, 0] }}
          transition={{ duration: 25 + blob.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Login card */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-6">
          TaskHive Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label font-semibold text-white">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
              })}
              className="input input-bordered w-full bg-white/10 text-white border-white/30 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.email && <p className="text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="label font-semibold text-white">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="input input-bordered w-full bg-white/10 text-white border-white/30 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.password && <p className="text-red-400">{errors.password.message}</p>}
          </div>

          {errorMsg && <p className="text-red-500 font-semibold text-center">{errorMsg}</p>}

          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold hover:from-yellow-300 hover:to-yellow-400 shadow-lg"
          >
            Login
          </button>
        </form>

        <div className="divider text-white/70">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn w-full flex items-center justify-center gap-2 bg-white/10 text-white font-semibold border border-white/20 backdrop-blur-sm hover:bg-white/20"
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>

        <p className="mt-4 text-center text-white/80 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;
