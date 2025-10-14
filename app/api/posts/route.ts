import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, body, imageUrl } = await request.json();

    if (!title || !body || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        body,
        imageUrl,
        userId,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
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
            ...post,
            username:
              user.username ||
              `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
              "User",
            userAvatar: user.imageUrl,
          };
        } catch (error) {
          // If user not found, use default
          return {
            ...post,
            username: "User",
            userAvatar: null,
          };
        }
      }),
    );

    return NextResponse.json(postsWithUsers);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
