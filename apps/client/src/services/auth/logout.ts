import { useMutation } from "@tanstack/react-query";
import { MutationFunction } from "@tanstack/react-query";

import { localStorageService } from "@/client/services/local-storage/local-storage.service";
import { queryClient } from "@/client/libs/query-client";
import { useAuthStore } from "@/client/stores/auth";

export const logout: MutationFunction<void, void> = async () => {
  localStorageService.logout();
  return Promise.resolve(); // Return a resolved promise as expected by useMutation
};

export const useLogout = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const {
    error,
    isPending: loading,
    mutateAsync: logoutFn,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setUser(null);
      queryClient.clear();
    },
    onError: () => {
      setUser(null);
      queryClient.clear();
    },
  });

  return { logout: logoutFn, loading, error };
};
