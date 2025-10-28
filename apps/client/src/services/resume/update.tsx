import type { ResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import debounce from "lodash.debounce";

import { axios } from "@/client/libs/axios";
import { queryClient } from "@/client/libs/query-client";

export const updateResume = async (data: UpdateResumeDto) => {
  // Check if using local storage
  const USE_LOCAL_STORAGE = import.meta.env.VITE_USE_LOCAL_STORAGE === "true";
  
  let responseResume: ResumeDto;
  
  if (USE_LOCAL_STORAGE) {
    // Update locally and return the updated resume
    const resumeData = await axios.patch<ResumeDto, AxiosResponse<ResumeDto>, UpdateResumeDto>(
      `/resume/${data.id}`,
      data,
    );
    responseResume = resumeData.data;
  } else {
    const response = await axios.patch<ResumeDto, AxiosResponse<ResumeDto>, UpdateResumeDto>(
      `/resume/${data.id}`,
      data,
    );
    responseResume = response.data;
  }

  queryClient.setQueryData<ResumeDto>(["resume", { id: responseResume.id }], responseResume);

  queryClient.setQueryData<ResumeDto[]>(["resumes"], (cache) => {
    if (!cache) return [responseResume];
    return cache.map((resume) => {
      if (resume.id === responseResume.id) return responseResume;
      return resume;
    });
  });

  return responseResume;
};

export const debouncedUpdateResume = debounce(updateResume, 500);

export const useUpdateResume = () => {
  const {
    error,
    isPending: loading,
    mutateAsync: updateResumeFn,
  } = useMutation({
    mutationFn: updateResume,
  });

  return { updateResume: updateResumeFn, loading, error };
};
