import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/app";

const useAuthUser = () => {
  const { data: authUser, isLoading, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false,
  });

  // console.log("*******************",authUser?.user)

  return {
    isLoading,
    authUser: authUser?.user || null,  // ✅ get user safely
  };
};

export default useAuthUser;
