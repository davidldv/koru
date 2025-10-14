import Image from 'next/image';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

interface PostCardProps {
  username: string;
  timeAgo: string;
  userAvatar?: string;
  postImage?: string;
  caption?: string;
  likes?: number;
}

export default function PostCard({ username, timeAgo, userAvatar, postImage, caption, likes }: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden w-full transition-shadow duration-300 ease-in-out group">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center text-white font-semibold text-sm">
          {userAvatar ? (
            <Image src={userAvatar} alt={username} width={48} height={48} className="rounded-full" />
          ) : (
            username.substring(0, 2).toUpperCase()
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{username}</p>
          <p className="text-sm text-gray-500">{timeAgo}</p>
        </div>
      </div>
      
      {/* Post Image */}
      {postImage && (
        <div className="aspect-square relative bg-gradient-to-br from-yellow-100 via-pink-100 to-orange-100 overflow-hidden">
          <Image 
            src={postImage} 
            alt="Post content" 
            fill 
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
      )}

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="hover:text-red-500 transition-colors" aria-label="Like">
              <Heart size={24} />
            </button>
            <button className="hover:text-teal-500 transition-colors" aria-label="Comment">
              <MessageCircle size={24} />
            </button>
            <button className="hover:text-teal-500 transition-colors" aria-label="Share">
              <Send size={24} />
            </button>
          </div>
          <button className="hover:text-teal-500 transition-colors" aria-label="Save">
            <Bookmark size={24} />
          </button>
        </div>

        {/* Likes */}
        {likes !== undefined && (
          <p className="font-semibold text-sm">{likes.toLocaleString()} likes</p>
        )}

        {/* Caption */}
        {caption && (
          <p className="text-sm">
            <span className="font-semibold">{username}</span>{' '}
            <span className="text-gray-700">{caption}</span>
          </p>
        )}
      </div>
    </div>
  );
}
