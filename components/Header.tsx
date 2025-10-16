"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Search, Plus, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const router = useRouter();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 1.02, 0.73, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/" className="text-2xl font-bold text-teal-500">
            Koru
          </Link>
        </motion.div>

        <motion.nav
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.button
            className="hover:text-teal-500 cursor-pointer transition-colors"
            aria-label="Search"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Search size={24} />
          </motion.button>
          <SignedIn>
            <motion.button
              onClick={() => router.push("/create-post")}
              className="hover:text-teal-500 cursor-pointer transition-colors"
              aria-label="Create Post"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={24} />
            </motion.button>
          </SignedIn>
          <motion.button
            className="hover:text-teal-500 cursor-pointer transition-colors"
            aria-label="Favorites"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={24} />
          </motion.button>

          <SignedOut>
            <SignInButton mode="modal">
              <motion.button
                className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 cursor-pointer transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            </SignInButton>
          </SignedOut>
        </motion.nav>
      </div>
    </motion.header>
  );
}
