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
          <Tabs defaultValue="chatbot" className="min-w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ebook">Ebook Finder</TabsTrigger>
              <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
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
