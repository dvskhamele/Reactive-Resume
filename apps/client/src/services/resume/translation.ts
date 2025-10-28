import type { Language } from "@reactive-resume/utils";
import { useQuery } from "@tanstack/react-query";

import { LANGUAGES_KEY } from "@/client/constants/query-keys";
import { axios } from "@/client/libs/axios";

export const fetchLanguages = async () => {
  try {
    const response = await axios.get<Language[]>(`/translation/languages`);

    return response.data;
  } catch (error) {
    // Fallback to default languages if API call fails
    console.warn('Translation languages API failed, using fallback:', error);
    // Return default languages from utils
    const { languages } = await import("@reactive-resume/utils");
    return languages;
  }
};

export const useLanguages = () => {
  const {
    error,
    isPending: loading,
    data: languages,
  } = useQuery({
    queryKey: [LANGUAGES_KEY],
    queryFn: fetchLanguages,
  });

  return { languages: languages ?? [], loading, error };
};
