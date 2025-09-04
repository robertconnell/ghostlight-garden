import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col w-full relative left-0 right-0" style={{ position: 'relative' }}>
      <Navigation />
      <main className="flex-1 w-full" style={{ position: 'relative' }}>
        {children}
      </main>
      <GlobalFooter />
    </div>
  );
}
