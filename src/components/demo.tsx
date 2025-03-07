import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { SendHorizontal } from "lucide-react";
// import { Input } from "./ui/input";
import { ChatBubble } from "./ui/chat/chat-bubble";
import { ChatMessageList } from "./ui/chat/chat-message-list";
import { ChatBubbleMessage } from "./ui/chat/chat-bubble";
import { ChatBubbleAvatar } from "./ui/chat/chat-bubble";
import { ChatInput } from "./ui/chat/chat-input";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Separator } from "@radix-ui/react-separator";

export default function Demo() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div id="demo" className="max-h-screen max-w-5xl mx-auto pb-28">
      <h2 className="text-7xl font-bold">
        <span>D</span>
        <span className="font-thin">emo</span>
      </h2>
      <div className="flex justify-center items-center mt-5">
        <Tabs defaultValue="ebook" className="min-w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ebook">Ebook Finder</TabsTrigger>
            <TabsTrigger value="chatbot">AI Chatbot</TabsTrigger>
          </TabsList>

          {/* E BOOK */}
          <TabsContent value="ebook">
            <Card className="w-full">
              <CardContent className="p-10">
                <ChatMessageList>
                  {/* user chat */}
                  <ChatBubble variant="sent">
                    <ChatBubbleAvatar fallback="US" />
                    <ChatBubbleMessage>
                      <span className="font-bold">/Atomic Habits</span>
                    </ChatBubbleMessage>
                  </ChatBubble>

                  {/* bot reply */}
                  <ChatBubble variant="received">
                    <ChatBubbleAvatar fallback="AI" />
                    <ChatBubbleMessage className="flex items-center space-x-2">
                      <span className="font-bold">AtomicHabits.pdf</span>
                      <Download className="h-4 w-4 cursor-pointer" />
                    </ChatBubbleMessage>
                  </ChatBubble>

                  <ChatBubble variant="received">
                    <ChatBubbleAvatar fallback="AI" />
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>

                  <Separator className="my-2" />

                  <div className="flex justify-center items-center">
                    <ChatInput
                      placeholder="Type your message here!"
                      className="flex-grow rounded-r-none min-h-12 resize-none rounded-lg bg-background border-0 p-4 shadow-none focus-visible:ring-0"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />

                    <Button className="ml-auto gap-1.5 h-full">
                      Send
                      <SendHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </ChatMessageList>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CHAT BOT */}
          <TabsContent value="chatbot">
            <Card>
              <CardContent className="p-10">
                <ChatMessageList>
                  {/* user chat */}
                  <ChatBubble variant="sent">
                    <ChatBubbleAvatar fallback="US" />
                    <ChatBubbleMessage>
                      <span className="font-bold">What is AI</span>
                    </ChatBubbleMessage>
                  </ChatBubble>

                  {/* bot reply */}
                  <ChatBubble variant="received">
                    <ChatBubbleAvatar fallback="AI" />
                    <ChatBubbleMessage className="flex items-center space-x-2">
                      <span className="">
                        AI (Artificial Intelligence) is the simulation of human
                        intelligence in machines, allowing them to perform tasks
                        that typically require human thinking, such as
                        problem-solving, learning, reasoning, and
                        decision-making. AI systems can be rule-based
                        (traditional programming) or use machine learning, where
                        they learn from data and improve over time. There are
                        different types of AI: Narrow AI (Weak AI) Designed for
                        specific tasks, like chatbots, trading bots, or
                        recommendation systems (e.g., Netflix suggestions).
                      </span>
                      <Download className="h-4 w-4 cursor-pointer" />
                    </ChatBubbleMessage>
                  </ChatBubble>

                  <ChatBubble variant="received">
                    <ChatBubbleAvatar fallback="AI" />
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>

                  <Separator className="my-2" />

                  <div className="flex justify-center items-center">
                    <ChatInput
                      placeholder="Type your message here!"
                      className="flex-grow rounded-r-none min-h-12 resize-none rounded-lg bg-background border-0 p-4 shadow-none focus-visible:ring-0"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />

                    <Button className="ml-auto gap-1.5 h-full">
                      Send
                      <SendHorizontal className="h-5 w-5" />
                    </Button>
                  </div>
                </ChatMessageList>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
