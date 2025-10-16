"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useProfile } from "@/hooks/use-profile";
import PostCard from "@/components/PostCard";

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const { profile, isLoading, error } = useProfile(userId);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error loading profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-teal-500 flex-shrink-0">
            {profile.imageUrl ? (
              <Image
                src={profile.imageUrl}
                alt={profile.username}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-teal-100 flex items-center justify-center">
                <span className="text-4xl text-teal-600 font-bold">
                  {profile.username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {profile.username}
            </h1>

            {profile.firstName && (
              <p className="text-lg text-gray-600 mb-4">
                {profile.firstName} {profile.lastName}
              </p>
            )}

            {/* Stats */}
            <div className="flex gap-6 justify-center md:justify-start mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-teal-600">
                  {profile.postsCount}
                </p>
                <p className="text-sm text-gray-500">Posts</p>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="mt-4">
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Posts</h2>

        {profile.posts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">No posts yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {profile.posts.map((post: any) => (
              <PostCard
                key={post.id}
                username={profile.username}
                timeAgo={new Date(post.createdAt).toLocaleDateString()}
                userAvatar={profile.imageUrl}
                postImage={post.imageUrl}
                title={post.title}
                caption={post.body}
                likes={0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
