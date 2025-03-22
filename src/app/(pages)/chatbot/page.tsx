import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AiChatbot from "@/components/ai-chatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EbookFinder from "@/components/ebook-finder";

export default function ChatBot() {
  return (
    <div className="m-5">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="max-h-screen max-w-5xl mx-auto pb-28">
          <Tabs defaultValue="ebook" className="min-w-full">
            <TabsList className="grid w-full grid-cols-2 bg-foreground text-background">
              <TabsTrigger value="ebook" className="shadow-muted-foreground">
                Ebook Finder
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="shadow-muted-foreground">
                AI Chatbot
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ebook">
              <EbookFinder />
            </TabsContent>
            <TabsContent value="chatbot">
              <AiChatbot />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarProvider>
    </div>
  );
}
