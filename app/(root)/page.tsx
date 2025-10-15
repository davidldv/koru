"use client";

import Image from "next/image";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { usePosts } from "@/hooks/use-posts";

export default function Home() {
  const { data: posts = [], isLoading, error } = usePosts();

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-16">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-16">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error loading posts</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[70vh] flex flex-col items-center justify-center text-center">
          {/* Background Hero Image */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <Image
              src="/assets/images/hero-image.jpeg"
              alt="Hero background"
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-teal-100/80 via-teal-50/70 to-cyan-100/80"></div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl"></div>

          {/* Hero Content */}
          <div className="relative z-10 space-y-6 mb-16">
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 tracking-tight">
              Share Your Story
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
              A minimalist space for creative expression through photography
            </p>
            <Link href="/create-post">
              <button className="bg-teal-500 cursor-pointer text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-colors font-medium text-lg">
                Share Your First Photo
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className="max-w-2xl mx-auto mt-16 space-y-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No posts yet. Be the first to share your story!
            </p>
          </div>
        ) : (
          posts.map((post: any) => (
            <PostCard
              key={post.id}
              username={post.username}
              timeAgo={new Date(post.createdAt).toLocaleDateString()}
              userAvatar={post.userAvatar ?? undefined}
              postImage={post.imageUrl}
              title={post.title}
              caption={post.body}
              likes={0} // TODO: Add likes functionality
            />
          ))
        )}
      </div>
    </>
  );
}
