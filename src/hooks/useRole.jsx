import { useEffect, useState } from "react";
import axios from "axios";

const useRole = (email) => {
  const [role, setRole] = useState(null);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (email) {
      axios.get(`http://localhost:5000/users/${email}`).then((res) => {
        setRole(res.data.role);
        setCoins(res.data.coins);
      });
    }
  }, [email]);

  return { role, coins };
};

export default useRole;
