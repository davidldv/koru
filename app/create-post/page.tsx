"use client";

import { useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreatePost } from "@/hooks/use-posts";
import { Editor, Toolbar, EditorHandle } from "@/components/editor";
import { EditorView } from "prosemirror-view";

const CreatePost = () => {
  const router = useRouter();
  const createPost = useCreatePost();
  const editorRef = useRef<EditorHandle>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get markdown content from editor
    const markdown = editorRef.current?.getMarkdown() || "";

    if (!title || !imageFile) {
      toast.error("Please provide a title and image");
      return;
    }

    setUploading(true);
    setError(null);
    setUploadedFileUrl(null);

    try {
      // Get a presigned URL from our API
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: imageFile.name,
          contentType: imageFile.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get presigned URL.");
      }

      const { url, key } = await response.json();

      // Use the presigned URL to upload the file
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: imageFile,
        headers: {
          "Content-Type": imageFile.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload failed.");
      }

      // Construct the public URL of the uploaded file
      const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${key}`;
      setUploadedFileUrl(publicUrl);

      // Create the post in the database
      await createPost.mutateAsync({
        title,
        body: markdown,
        imageUrl: publicUrl,
      });

      toast.success("Post created successfully!");
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-16 px-4">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-smooth"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
            Create Post
          </h1>
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Photo</label>
            {!imagePreview ? (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-smooth">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            ) : (
              <div className="relative w-full rounded-lg overflow-hidden shadow-card">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-auto object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 p-2 bg-background/90 rounded-full hover:bg-background transition-smooth"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-3">
            <label
              htmlFor="title"
              className="text-sm font-medium text-foreground"
            >
              Title
            </label>
            <Input
              id="title"
              placeholder="Give your photo a title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-base"
            />
          </div>

          {/* Body */}
          <div className="space-y-3">
            <label
              htmlFor="body"
              className="text-sm font-medium text-foreground"
            >
              Caption
            </label>
            <div className="border border-border rounded-lg overflow-hidden bg-background">
              <Toolbar view={editorView} />
              <Editor
                ref={editorRef}
                placeholder="Share your story..."
                onChange={setBody}
                onViewReady={setEditorView}
                className="min-h-[200px]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full font-semibold"
            disabled={uploading || createPost.isPending}
          >
            {uploading || createPost.isPending ? "Creating..." : "Share Post"}
          </Button>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {uploadedFileUrl && (
          <div className="mt-6 text-center">
            <p className="text-green-600 font-medium">Upload successful!</p>
            <a
              href={uploadedFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-violet-600 hover:underline break-all"
            >
              View Uploaded File: {uploadedFileUrl}
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreatePost;
