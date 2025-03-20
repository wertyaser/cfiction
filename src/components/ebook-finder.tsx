import React from "react";
// import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
// import {
//   ChatBubble,
//   ChatBubbleAvatar,
//   ChatBubbleMessage,
// } from "@/components/ui/chat/chat-bubble";
import { SendHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
// import { useEffect } from "react";

export default function EbookFinder() {
  // const [messages, setMessages] = useState<{ role: string; content: string }[]>(
  //   []
  // );
  // const [inputValue, setInputValue] = useState("");
  // const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center items-center mt-5 border border-foreground rounded-lg">
      <Card className=" h-[90vh] w-full max-w-5xl md:w-[1000px] sm:w-[900px] shadow-xl bg-background">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Scrollable message list */}
          <div className="flex-1 overflow-y-auto">
            {/* <ChatMessageList>
              <ChatBubble>
                <ChatBubbleAvatar />
                <ChatBubbleMessage></ChatBubbleMessage>
              </ChatBubble>

              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            </ChatMessageList> */}
          </div>

          <Separator className="my-2" />

          {/* Chat Input */}
          <div className="flex items-center">
            <ChatInput
              placeholder="Type your message here!"
              className="flex-grow rounded-r-none min-h-12 resize-none bg-background border-0 p-4 shadow-none focus-visible:ring-0"
            />

            <Button className="ml-auto gap-1.5 h-full">
              Send
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
