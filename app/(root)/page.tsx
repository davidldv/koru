import Hero from "@/components/Hero";
import Feed from "@/components/Feed";
import { fetchPosts } from "@/lib/queries";
import type { Post } from "@/lib/api";

export default async function Home() {
  let posts: Post[] = [];

  try {
    posts = await fetchPosts();
  } catch (err) {
    console.error("Error fetching posts:", err);
  }

  return (
    <>
      <Hero />

      {/* Feed Section */}
      <div className="max-w-2xl mx-auto mt-16">
        <Feed initialPosts={posts} />
      </div>
    </>
  );
}
