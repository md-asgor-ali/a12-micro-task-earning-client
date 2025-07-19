import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const { role } = useRole();
  const navigate = useNavigate();
  const location = useLocation();

  // Default dashboard redirect based on role
  const dashboardLink =
    role === "admin"
      ? "/dashboard/admin-home"
      : role === "buyer"
      ? "/dashboard/buyer-home"
      : "/dashboard/worker-home";

  const from = location.state?.from?.pathname || dashboardLink;

  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMsg, setErrorMsg] = useState("");

  // ✅ Email/password login handler
  const onSubmit = async (data) => {
    setErrorMsg("");
    try {
      await signIn(data.email, data.password);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg("Invalid email or password.");
    }
  };

  // ✅ Google login handler
  const handleGoogleLogin = async () => {
    setErrorMsg("");
    try {
      const result = await googleLogin();
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "user", // default role
      };

    // Try to create user in DB
    try {
      await axiosSecure.post("/users", userData);
    } catch (err) {
      if (err.response?.status !== 409) {
        throw err; // Only ignore duplicate user error
      }
    }
      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(dashboardLink);
    } catch (error) {
      console.error("Google login failed:", error);
      setErrorMsg("Google sign-in failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-yellow-100 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl border-t-4 border-warning">
        <div className="card-body">
          <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-4">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label font-semibold text-blue-800">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
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
                    message: "Minimum 6 characters required",
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="text-red-600 font-semibold text-center">{errorMsg}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-warning w-full text-white font-bold"
            >
              Login
            </button>
          </form>

          <div className="divider text-blue-600">OR</div>

          {/* Google Sign-in */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-warning w-full text-white font-semibold flex items-center justify-center gap-2"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </button>

          {/* Register Link */}
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
