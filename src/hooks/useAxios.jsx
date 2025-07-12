import axios from "axios";

const useAxios = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:5000", // ✅ your backend URL
    withCredentials: false,           // set to true if using cookies
  });

  return axiosSecure;
};

export default useAxios;
