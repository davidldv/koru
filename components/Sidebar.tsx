"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  Home,
  Image as ImageIcon,
  FileText,
  BookOpen,
  User,
  Search,
  MessageCircle,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useClerk } from "@clerk/nextjs";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      onClick: null,
    },
    {
      name: "Search",
      href: "/search",
      icon: Search,
      onClick: null,
    },
    {
      name: "Messages",
      href: "/messages",
      icon: MessageCircle,
      onClick: null,
    },
    {
      name: "Photos",
      href: "/space/photos",
      icon: ImageIcon,
      onClick: null,
    },
    {
      name: "Text",
      href: "/space/text",
      icon: FileText,
      onClick: null,
    },
    {
      name: "Books",
      href: "/space/books",
      icon: BookOpen,
      onClick: null,
    },
    {
      name: "Profile",
      href: user ? `/profile/${user.id}` : "/profile",
      icon: User,
      onClick: null,
    },
    {
      name: "Settings",
      href: "#",
      icon: Settings,
      onClick: () => openUserProfile(),
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 pt-20 pb-6 px-4 z-40">
      <nav className="space-y-2">
        {navigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;

          if (item.onClick) {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-teal-50 text-teal-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50 hover:text-teal-600",
                )}
              >
                <Icon size={24} className="flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-base">{item.name}</span>
                </div>
              </button>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-teal-600",
              )}
            >
              <Icon size={24} className="flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-base">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
