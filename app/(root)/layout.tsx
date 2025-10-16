import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50">
      <Header />
      <Sidebar />
      <main className="pt-24 pb-16 px-6 ml-64">
        {children}
      </main>
    </div>
  );
}
