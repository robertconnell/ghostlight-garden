import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[95vh] flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <GlobalFooter />
    </div>
  );
}
