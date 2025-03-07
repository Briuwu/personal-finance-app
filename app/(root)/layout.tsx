import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-beige-100">
        <div className="w-full px-4 py-6 md:p-[40px] lg:px-10 lg:py-8">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
