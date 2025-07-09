import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    setErrorMsg("");
    try {
      await signIn(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg("Login failed. Check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-yellow-100 px-4">
      <div className="card w-full max-w-md bg-white shadow-xl border-t-4 border-warning">
        <div className="card-body">
          <h2 className="text-3xl font-extrabold text-center text-blue-900 mb-4">Login to Your Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label font-semibold text-blue-800">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered w-full"
              />
              {errors.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="label font-semibold text-blue-800">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="input input-bordered w-full"
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            {/* Error Message */}
            {errorMsg && <p className="text-red-600 font-semibold">{errorMsg}</p>}

            {/* Submit */}
            <button type="submit" className="btn btn-warning w-full text-white font-bold">
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="divider text-blue-600">OR</div>

          {/* Google Login */}
          <button onClick={handleGoogleLogin} className="btn btn-warning w-full text-white font-semibold">
            <FcGoogle className="text-xl mr-2" /> Sign in with Google
          </button>

          {/* Footer */}
          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-700 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
