import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Header } from "@/components/dashboard/header";
import { DashboardProvider } from "@/components/providers/dashboard-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 pb-24 md:pb-6 overflow-auto">
            {children}
            <footer className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
              © 2025 SR AI LLC. All rights reserved.
            </footer>
          </main>
        </div>
        <MobileNav />
      </div>
    </DashboardProvider>
  );
}
