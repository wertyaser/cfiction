import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Input } from "./ui/input";
import { ChatBubble } from "./ui/chat/chat-bubble";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import { ChatBubbleMessage } from "./ui/chat/chat-bubble";
// import { ChatInput } from "./ui/chat/chat-input";

export default function Demo() {
  const [inputValue, setInputValue] = useState("");

  return (
    <section id="demo" className="min-h-screen max-w-4xl mx-auto">
      <h2 className="text-7xl font-bold">
        <span>D</span>
        <span className="font-thin">emo</span>
      </h2>
      <div className="flex justify-center items-center mt-5">
        <Card className="w-full">
          <CardContent className="p-10">
            <ChatMessageList>
              {/* user chat */}
              <ChatBubble variant="sent">
                <ChatBubbleMessage>
                  <span className="font-bold">/Atomic Habits</span>
                </ChatBubbleMessage>
              </ChatBubble>

              {/* bot reply */}
              <ChatBubble variant="received">
                <ChatBubbleMessage className="flex items-center space-x-2">
                  <span className="font-bold">AtomicHabits.pdf</span>
                  <Download className="h-4 w-4 cursor-pointer" />
                </ChatBubbleMessage>
              </ChatBubble>

              <div className="flex mt-4">
                <Input
                  placeholder="Type your message here!"
                  className="flex-grow rounded-r-none min-h-12 resize-none rounded-lg bg-background border-0 p-4 shadow-none focus-visible:ring-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button size="sm" className="ml-auto gap-1.5">
                  Send Message
                </Button>
              </div>
            </ChatMessageList>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
