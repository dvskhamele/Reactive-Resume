import type { ContributorDto } from "@reactive-resume/dto";
import { useQuery } from "@tanstack/react-query";

import { axios } from "@/client/libs/axios";

export const fetchGitHubContributors = async () => {
  try {
    const response = await axios.get<ContributorDto[]>(`/contributors/github`);

    return response.data;
  } catch (error) {
    // Fallback to empty array if API call fails
    console.warn('GitHub contributors API failed, using fallback:', error);
    return [];
  }
};

export const fetchCrowdinContributors = async () => {
  try {
    const response = await axios.get<ContributorDto[]>(`/contributors/crowdin`);

    return response.data;
  } catch (error) {
    // Fallback to empty array if API call fails
    console.warn('Crowdin contributors API failed, using fallback:', error);
    return [];
  }
};

export const useContributors = () => {
  const {
    error: githubError,
    isPending: githubLoading,
    data: github,
  } = useQuery({
    queryKey: ["contributors", "github"],
    queryFn: fetchGitHubContributors,
  });

  const {
    error: crowdinError,
    isPending: crowdinLoading,
    data: crowdin,
  } = useQuery({
    queryKey: ["contributors", "crowdin"],
    queryFn: fetchCrowdinContributors,
  });

  const error = githubError ?? crowdinError;
  const loading = githubLoading || crowdinLoading;

  return { github, crowdin, loading, error };
};
