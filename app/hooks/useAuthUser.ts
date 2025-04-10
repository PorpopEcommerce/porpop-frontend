import { useQuery } from "@tanstack/react-query";
import { fetchUserThunk } from "@/app/redux/features/users/userSlice"; // Import from Redux slice

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["authUser"], // Can be any unique name
    queryFn: fetchUserThunk, // Call Redux function
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: false,
  });
};
