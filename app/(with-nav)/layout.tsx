import GlobalFooter from "@/components/GlobalFooter";
import Navigation from "@/components/Navigation";

export default function WithNavLayout({
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
