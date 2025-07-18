import axios from "axios";

const useAxios = () => {
  const axiosSecure = axios.create({
    baseURL: `a12-micro-task-earning-server.vercel.app`, 
    withCredentials: false,           
  });

  return axiosSecure;
};

export default useAxios;
