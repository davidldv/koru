import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <Header />
      <main className="pt-24 pb-16 px-6">
        {children}
      </main>
    </div>
  );
}
