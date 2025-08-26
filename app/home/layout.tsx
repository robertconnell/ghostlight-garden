import Navigation from "@/components/Navigation";
import GlobalFooter from "@/components/GlobalFooter";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Navigation />
      <main>
        {children}
      </main>
      <GlobalFooter />
    </div>
  );
}
