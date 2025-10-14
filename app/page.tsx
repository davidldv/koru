import Image from "next/image";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16 px-6">
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
            </div>
            
          </div>
        </div>

        {/* Feed Section */}
        <div className="max-w-2xl mx-auto mt-16 space-y-8">
          <PostCard 
            username="nature_lens"
            timeAgo="2 hours ago"
            postImage="/assets/images/sample-post-1.jpeg"
            caption="Chasing sunrise in the mountains. There's nothing quite like the peace you find at dawn."
            likes={1247}
          />
          
          <PostCard 
            username="arch_daily"
            timeAgo="5 hours ago"
            postImage="/assets/images/sample-post-2.jpeg"
            likes={892}
          />

          <PostCard 
            username="food_stories"
            timeAgo="1 day ago"
            postImage="/assets/images/sample-post-3.jpeg"
            caption="Simple ingredients, extraordinary flavors. Sometimes less really is more."
            likes={634}
          />
        </div>
      </main>
    </div>
  );
}
