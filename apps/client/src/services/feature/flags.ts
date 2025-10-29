import type { FeatureDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";
import { localStorageService } from "@/client/services/local-storage/local-storage.service";

export const fetchFeatureFlags = async (): Promise<FeatureDto> => {
  try {
    const response = await axios.get<FeatureDto>(`/feature/flags`);
    return response.data;
  } catch (error) {
    // Fallback to default feature flags when API call fails
    console.warn('Feature flags API failed, using default flags:', error);
    return {
      isSignupsDisabled: false,
      isEmailAuthDisabled: false,
    };
  }
};

export const useFeatureFlags = () => {
  const {
    error,
    isPending: loading,
    data: flags,
  } = useQuery({
    queryKey: ["feature_flags"],
    queryFn: () => fetchFeatureFlags(),
    refetchOnMount: "always",
    initialData: {
      isSignupsDisabled: false,
      isEmailAuthDisabled: false,
    },
  });

  return { flags, loading, error };
};
