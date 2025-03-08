import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Card } from "@/components/ui/card";

export default function ChatBot() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <Card className="w-full max-h-screen p-5"></Card>
    </SidebarProvider>
  );
}
