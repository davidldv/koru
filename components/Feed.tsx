"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/PostCard";
import { postsQueryOptions, type Post } from "@/lib/api";

interface FeedProps {
  initialPosts: Post[];
}

export default function Feed({ initialPosts }: FeedProps) {
  const {
    data: posts = initialPosts,
    isLoading,
    error,
  } = useQuery({
    ...postsQueryOptions,
    initialData: initialPosts,
  });

  if (isLoading && posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">Error loading posts</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No posts yet. Be the first to share your story!
          </p>
        </div>
      ) : (
        posts.map((post: Post, index: number) => (
          <PostCard
            key={post.id}
            username={post.username}
            timeAgo={new Date(post.createdAt).toLocaleDateString()}
            userAvatar={post.userAvatar ?? undefined}
            postImage={post.imageUrl}
            title={post.title}
            caption={post.body}
            likes={0} // TODO: Add likes functionality
            index={index}
          />
        ))
      )}
    </div>
  );
}
