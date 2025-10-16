import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type CreatePostData, type Post } from "@/lib/api";

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreatePostData): Promise<Post> => {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
