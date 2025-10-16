import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import type { Post } from "./api";

export const fetchPosts = async (): Promise<Post[]> => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const postsWithUsers = await Promise.all(
    posts.map(async (post) => {
      try {
        const client = await clerkClient();
        const user = await client.users.getUser(post.userId);
        return {
          id: post.id,
          title: post.title,
          body: post.body,
          imageUrl: post.imageUrl,
          userId: post.userId,
          username:
            user.username ||
            `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
            "User",
          userAvatar: user.imageUrl,
          createdAt: post.createdAt.toISOString(),
        };
      } catch (error) {
        // If user not found, use default
        return {
          id: post.id,
          title: post.title,
          body: post.body,
          imageUrl: post.imageUrl,
          userId: post.userId,
          username: "User",
          userAvatar: null,
          createdAt: post.createdAt.toISOString(),
        };
      }
    })
  );

  return postsWithUsers;
};
