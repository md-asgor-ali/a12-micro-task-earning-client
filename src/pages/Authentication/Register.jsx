import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import { motion } from "framer-motion";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Default dashboard redirect
  const dashboardLink =
    role === "Admin"
      ? "/dashboard/admin-home"
      : role === "Buyer"
      ? "/dashboard/buyer-home"
      : "/dashboard/worker-home";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Image upload handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`,
        formData
      );
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error("Image upload error:", err);
      setErrorMsg("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // Form submission
  const onSubmit = async (data) => {
    setErrorMsg("");
    if (!profilePic) {
      setErrorMsg("Please upload your profile picture.");
      return;
    }

    try {
      const result = await createUser(data.email, data.password);

      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: profilePic,
      });

      const userData = {
        name: data.name,
        email: data.email,
        photoURL: profilePic,
        role: data.role,
      };

      await axiosSecure.post("/users", userData);
      const userdata = await axiosSecure.get(`/users/${result.user.email}`);
      const userRole = userdata.data.role;

      const dashboardLink =
        userRole === "Admin"
          ? "/dashboard/admin-home"
          : userRole === "Buyer"
          ? "/dashboard/buyer-home"
          : "/dashboard/worker-home";

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: `${data.role} registered with default coins!`,
        confirmButtonColor: "#f59e0b",
      });

      reset();
      navigate(dashboardLink);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email already exists. Try logging in instead.");
      } else {
        setErrorMsg(error.message || "Registration failed");
      }
    }
  };

  // Floating background blobs
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
          transition={{
            duration: 25 + blob.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Registration card */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-yellow-400 mb-6">
          TaskHive Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label font-semibold text-white">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="input input-bordered w-full bg-white/10 text-white border-white/30 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.name && (
              <p className="text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label className="label font-semibold text-white">
              Profile Picture
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full bg-white/10 text-white border-white/30"
            />
            {uploading && (
              <p className="text-sm text-yellow-400">Uploading...</p>
            )}
            {profilePic && (
              <img
                src={profilePic}
                alt="Preview"
                className="w-16 h-16 rounded-full border mt-2"
              />
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label font-semibold text-white">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              className="input input-bordered w-full bg-white/10 text-white border-white/30 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.email && (
              <p className="text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label font-semibold text-white">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                  message: "Include uppercase, number & special char",
                },
              })}
              className="input input-bordered w-full bg-white/10 text-white border-white/30 focus:border-yellow-400 focus:ring-yellow-400"
            />
            {errors.password && (
              <p className="text-red-400">{errors.password.message}</p>
            )}
          </div>

          {/* Role */}
          <div className="relative z-20">
            <label className="label font-semibold text-white">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="select select-bordered w-full bg-white/20 text-white border-white/30 focus:border-yellow-400 focus:ring-yellow-400 appearance-none"
              style={{ zIndex: 50 }} // Ensure dropdown appears above other elements
            >
              <option value="">Select a role</option>
              <option value="Worker">Worker</option>
              <option value="Buyer">Buyer</option>
            </select>
            {errors.role && (
              <p className="text-red-400 mt-1">{errors.role.message}</p>
            )}
            <small className="text-gray-300">
              Workers get 10 coins, Buyers get 50 coins upon registration.
            </small>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <p className="text-red-500 font-semibold text-center">{errorMsg}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold hover:from-yellow-300 hover:to-yellow-400 shadow-lg"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-white/80 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
