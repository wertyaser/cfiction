"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { SendHorizontal, MessageSquarePlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";

// Define types for messages and chat
type Message = {
  id?: string;
  chat_id?: string;
  role: string;
  content: string;
  created_at?: string;
};

type Chat = {
  id: string;
  name: string;
  created_at: string;
};

export default function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [showChat, setShowChat] = useState(false);

  // Function to create a new chat
  const createNewChat = async () => {
    try {
      const res = await fetch("/api/chat/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // We'll update the name with the first message later
        body: JSON.stringify({ name: "New Chat", id: "1" }),
      });

      const data = await res.json();
      setActiveChat(data.chat);
      setShowChat(true);
      setMessages([]);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  // Function to update chat name based on first message
  const updateChatName = async (chatId: string, firstMessage: string) => {
    try {
      // Generate a name based on the first message (limit to first ~30 chars)
      const chatName =
        firstMessage.substring(0, 30) + (firstMessage.length > 30 ? "..." : "");

      await fetch(`/api/chat/${chatId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: chatName }),
      });

      // Update local state
      if (activeChat) {
        setActiveChat({
          ...activeChat,
          name: chatName,
        });
      }
    } catch (error) {
      console.error("Error updating chat name:", error);
    }
  };

  // Function to send a message
  const sendMessage = async () => {
    if (!inputValue.trim() || !activeChat) return;
    setLoading(true);

    const userMessage: Message = { role: "user", content: inputValue };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");

    try {
      // If this is the first message, update the chat name
      if (messages.length === 0) {
        updateChatName(activeChat.id, inputValue);
      }

      // Save the user message to the database
      await fetch("/api/message/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: activeChat.id,
          role: "user",
          content: inputValue,
        }),
      });

      // Get response from the AI
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      const botMessage = { role: "bot", content: data.message };

      // Save the bot response to the database
      await fetch("/api/message/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: activeChat.id,
          role: "llama", // Note: using 'llama' as the bot role name as per your DB schema
          content: data.message,
        }),
      });

      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...newMessages,
        { role: "bot", content: "Failed to get a response." },
      ]);
    }

    setLoading(false);
  };

  // Load messages if we have an active chat
  useEffect(() => {
    const loadMessages = async () => {
      if (!activeChat) return;

      try {
        const res = await fetch(`/api/message/${activeChat.id}`);
        const data = await res.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();
  }, [activeChat]);

  // Initial content with "Start new chat" button
  if (!showChat) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <Button onClick={createNewChat} size="lg" className="gap-2">
          <MessageSquarePlus className="h-5 w-5" />
          Start new chat
        </Button>
      </div>
    );
  }

  // Chat interface once started
  return (
    <div className="flex justify-center items-center mt-5">
      <Card className="h-[90vh] w-full max-w-5xl md:w-[1000px] sm:w-[900px] shadow-lg bg-background">
        <CardContent className="p-6 h-full flex flex-col">
          {/* Chat header with name */}
          {activeChat && (
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">{activeChat.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowChat(false);
                  setActiveChat(null);
                }}
              >
                New Chat
              </Button>
            </div>
          )}

          {/* Scrollable message list */}
          <div className="flex-1 overflow-y-auto">
            <ChatMessageList>
              {messages.map((msg, index) => (
                <ChatBubble
                  key={index}
                  variant={msg.role === "user" ? "sent" : "received"}
                >
                  <ChatBubbleAvatar
                    fallback={msg.role === "user" ? "Us" : "AI"}
                  />
                  <ChatBubbleMessage>
                    <span className="text-sm">{msg.content}</span>
                  </ChatBubbleMessage>
                </ChatBubble>
              ))}

              {loading && (
                <ChatBubble variant="received">
                  <ChatBubbleAvatar fallback="AI" />
                  <ChatBubbleMessage isLoading />
                </ChatBubble>
              )}
            </ChatMessageList>
          </div>

          <Separator className="my-2" />

          {/* Chat Input */}
          <div className="flex items-center">
            <ChatInput
              placeholder="Type your message here!"
              className="flex-grow rounded-r-none min-h-12 resize-none bg-background border-0 p-4 shadow-none focus-visible:ring-0"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <Button
              onClick={sendMessage}
              className="ml-auto gap-1.5 h-full"
              disabled={loading}
            >
              Send
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
