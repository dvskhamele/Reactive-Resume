import type { ResumeDto } from "@reactive-resume/dto";

import { axios } from "@/client/libs/axios";

export const findResumeById = async (data: { id: string }) => {
  // Check if using local storage
  const USE_LOCAL_STORAGE = import.meta.env.VITE_USE_LOCAL_STORAGE === "true";
  
  if (USE_LOCAL_STORAGE) {
    // Get resume from local storage
    const response = await axios.get<ResumeDto>(`/resume/${data.id}`);
    return response.data;
  } else {
    const response = await axios.get<ResumeDto>(`/resume/${data.id}`);
    return response.data;
  }
};

export const findResumeByUsernameSlug = async (data: { username: string; slug: string }) => {
  const response = await axios.get<ResumeDto>(`/resume/public/${data.username}/${data.slug}`);

  return response.data;
};
