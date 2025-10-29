import type { ResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";

import { localStorageService } from "@/client/services/local-storage/local-storage.service";
import { queryClient } from "@/client/libs/query-client";

type LockResumeArgs = {
  id: string;
  set: boolean;
};

export const lockResume = async ({ id, set }: LockResumeArgs) => {
  // Use localStorageService instead of API call
  const resume = localStorageService.lockResume(id, set);

  queryClient.setQueryData<ResumeDto>(["resume", { id: resume.id }], resume);

  queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
    if (!cache) return [resume];
    return cache.map((cachedResume) => {
      if (cachedResume.id === resume.id) return resume;
      return cachedResume;
    });
  });

  return resume;
};

export const useLockResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: lockResumeFn,
  } = useMutation({
    mutationFn: lockResume,
  });

  return { lockResume: lockResumeFn, loading, error };
};
