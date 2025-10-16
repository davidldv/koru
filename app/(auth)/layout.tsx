export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-100 via-teal-50 to-cyan-100">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-teal-500">
              Koru
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Share Your Story
            </h2>
            <p className="text-xl text-gray-600 max-w-lg">
              A minimalist space for creative expression through photography.
              Join our community and start sharing your moments.
            </p>

            {/* Features */}
            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg">
                  Share photos with your community
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg">
                  Discover inspiring content
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 text-lg">
                  Connect with like-minded creators
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center">{children}</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        <p>© 2025 Koru. A space for creative expression.</p>
      </footer>
    </div>
  );
}
