import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const { data: role, isLoading: isRoleLoading, refetch } = useQuery({
    enabled: !!user?.email && !loading, // Wait until auth is ready and email exists
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data.role; 
      
    },
    
  });
console.log("Role:", role);
  return [role, isRoleLoading, refetch];
};

export default useUserRole;
