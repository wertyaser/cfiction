"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import AiChatbot from "./ai-chatbot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import EbookFinder from "@/components/ebook-finder";
import BookSearch from "./ebook-search";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ChatBot() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated and not loading, redirect to sign-in
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  // Show loading or redirect
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null; // This prevents content flash before redirect
  }

  return (
    <div className="m-5">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <div className="max-h-screen min-w-5xl mx-auto pb-28">
          <Tabs defaultValue="ebook" className="min-w-full">
            <TabsList className="grid grid-cols-2 bg-foreground text-background">
              <TabsTrigger value="ebook" className="shadow-muted-foreground">
                Ebook Finder
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="shadow-muted-foreground">
                AI Chatbot
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ebook">
              <BookSearch />
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
