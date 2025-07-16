import { useEffect, useState } from "react";
import useAxiosSecure from "./useAxiosSecure";

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [coins, setCoins] = useState(0);
  const axiosSecure = useAxiosSecure(); 

  useEffect(() => {
    if (email) {
      axiosSecure.get(`/users/${email}`).then((res) => {
        setRole(res.data.role);
        setCoins(res.data.coins);
      }).catch(err => {
        console.error("Role fetching error:", err);
      });
    }
  }, [email, axiosSecure]);

  return { role, coins };
};

export default useRole;

