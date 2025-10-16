import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useProfile(userId: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `/api/profile/${userId}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    profile: data,
    isLoading,
    error,
    mutate,
  };
}
