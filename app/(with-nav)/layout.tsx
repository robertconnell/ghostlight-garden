import GlobalFooter from "@/components/GlobalFooter";
import Navigation from "@/components/Navigation";

export default function WithNavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[95vh] flex flex-col w-full relative left-0 right-0">
      <Navigation />
      <main className="flex-1 w-full">
        {children}
      </main>
      <GlobalFooter />
    </div>
  );
}
