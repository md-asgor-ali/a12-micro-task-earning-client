import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // REQUEST interceptor
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          const token = await user.getIdToken(); // ✅ Firebase JWT
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        console.log("🔐 Sending token:", config.headers.Authorization);
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE interceptor
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          logOut()
            .then(() => {
              localStorage.removeItem("access-token");
              navigate("/login");
            })
            .catch(() => {});
        }

        return Promise.reject(error);
      }
    );

    // Cleanup on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure; // ✅ MUST return in array format
};

export default useAxiosSecure;
