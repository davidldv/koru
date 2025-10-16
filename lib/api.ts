import { queryOptions } from "@tanstack/react-query";

export interface Post {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  userId: string;
  username: string;
  userAvatar: string | null;
  createdAt: string;
}

export interface CreatePostData {
  title: string;
  body: string;
  imageUrl: string;
}

export const postsQueryFn = async (): Promise<Post[]> => {
  const res = await fetch("/api/posts");
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
};

export const postsQueryOptions = queryOptions({
  queryKey: ["posts"],
  queryFn: postsQueryFn,
});
