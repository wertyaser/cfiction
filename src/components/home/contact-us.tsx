"use client";

import { useState, useTransition } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { JSX } from "react";

// Array of social media links
type SocialMedia = {
  name: string;
  link: string;
  icon: JSX.Element;
};

const socialMedia: SocialMedia[] = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/RizTechUniversity",
    icon: <Facebook />,
  },
  {
    name: "Twitter",
    link: "https://twitter.com/",
    icon: <Twitter />,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/",
    icon: <Instagram />,
  },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await fetch("/api/contact-us", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to send message");
        setResponseMessage("Thank you! Your message has been sent.");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } catch (error) {
        setResponseMessage(
          error instanceof Error ? error.message : "An error occurred. Try again."
        );
      }
    });
  };

  return (
    <div id="contact-us" className="max-w-4xl mx-auto mt-20 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
        <span className="font-semibold">Contact Us</span>
      </h2>
      <div className="flex justify-center items-center mt-4">
        <span className="text-base sm:text-lg lg:text-xl font-thin leading-relaxed text-center max-w-3xl">
          Got a technical issue? Want to send feedback about a beta feature?
          <br />
          Need details about our Business plan? Let us know.
        </span>
      </div>
      <Card className="max-w-4xl mx-auto mt-5 p-5">
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="ex. John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="ex. 2021-******@rtu.edu.ph"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Your message</Label>
              <Textarea
                name="message"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                {isPending ? "Sending..." : "Submit"}
              </Button>
            </div>
            {responseMessage && <p className="text-center">{responseMessage}</p>}
          </form>
        </CardContent>
      </Card>
      <div className="flex flex-wrap justify-center items-center gap-5 mt-5">
        {socialMedia.map((social, index) => (
          <a
            key={index}
            href={social.link}
            className="text-2xl hover:text-blue-700 flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer">
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
