import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState("");
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        formData
      );
      setProfilePic(res.data.data.url);
    } catch (err) {
      setErrorMsg("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setErrorMsg("");

    if (!profilePic) {
      setErrorMsg("Please upload your profile picture.");
      return;
    }

    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePic,
      });

      // You can store role/coin in DB later
      console.log("User created:", result.user);

      reset();
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message || "Registration failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/");
    } catch (error) {
      setErrorMsg("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-br from-yellow-50 to-blue-100">
      <div className="card w-full max-w-md bg-white shadow-2xl border-t-4 border-warning">
        <div className="card-body">
          <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-4">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label font-semibold text-blue-800">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered w-full"
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            {/* Profile Picture */}
            <div>
              <label className="label font-semibold text-blue-800">Profile Picture</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
              {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
            </div>

            {/* Email */}
            <div>
              <label className="label font-semibold text-blue-800">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="label font-semibold text-blue-800">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="label font-semibold text-blue-800">Role</label>
              <select
                {...register("role", { required: "Role is required" })}
                className="select select-bordered w-full"
              >
                <option value="">Select a role</option>
                <option value="Worker">Worker</option>
                <option value="Buyer">Buyer</option>
              </select>
              {errors.role && <p className="text-red-500">{errors.role.message}</p>}
            </div>

            {/* Error Message */}
            {errorMsg && <p className="text-red-600 font-semibold">{errorMsg}</p>}

            {/* Submit */}
            <button type="submit" className="btn btn-warning w-full text-white font-bold">
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-blue-600">OR</div>

          {/* Google Login */}
          <button onClick={handleGoogleLogin} className="btn btn-warning w-full text-white font-semibold">
            <FcGoogle className="text-xl mr-2" /> Sign up with Google
          </button>

          {/* Footer */}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
