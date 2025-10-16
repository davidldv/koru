import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

interface PostCardProps {
  username: string;
  timeAgo: string;
  userAvatar?: string;
  postImage?: string;
  title?: string;
  caption?: string;
  likes?: number;
  index?: number;
}

export default function PostCard({
  username,
  timeAgo,
  userAvatar,
  postImage,
  title,
  caption,
  likes,
  index = 0,
}: PostCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden w-full transition-shadow duration-100 ease-in-out group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.21, 1.02, 0.73, 1],
      }}
      whileHover={{ y: -2 }}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center text-white font-semibold text-sm">
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt={username}
              width={48}
              height={48}
              className="rounded-full"
            />
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
            <motion.button
              className="hover:text-red-500 transition-colors"
              aria-label="Like"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart size={24} />
            </motion.button>
            <motion.button
              className="hover:text-teal-500 transition-colors"
              aria-label="Comment"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={24} />
            </motion.button>
            <motion.button
              className="hover:text-teal-500 transition-colors"
              aria-label="Share"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={24} />
            </motion.button>
          </div>
          <motion.button
            className="hover:text-teal-500 transition-colors"
            aria-label="Save"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bookmark size={24} />
          </motion.button>
        </div>

        {/* Likes */}
        {likes !== undefined && (
          <p className="font-semibold text-sm">
            {likes.toLocaleString()} likes
          </p>
        )}

        {/* Title */}
        {title && <h3 className="font-bold text-lg text-gray-900">{title}</h3>}

        {/* Caption */}
        {caption && (
          <div className="text-sm prose prose-sm max-w-none">
            <span className="font-semibold">{username}</span>{" "}
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <span className="text-gray-700">{children}</span>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children }) => (
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">
                    {children}
                  </code>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {caption}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </motion.div>
  );
}
