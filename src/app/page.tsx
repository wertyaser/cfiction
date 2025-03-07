"use client";

import About from "@/components/about";
import ContactUs from "@/components/contact-us";
import Demo from "@/components/demo";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import MostDownloaded from "@/components/most-downloaded";
// import { Separator } from "@/components/ui/separator";

// import Link from "next/link";
import Image from "next/image";
// import { topBooks } from "@/lib/topBooks";

export default function Home() {
  return (
    <div className="">
      <Header />
      <Hero />
      <Image
        className="min-w-full"
        src="/parallax.png"
        width={1080}
        height={720}
        alt="Parallax"
      />
      <About />
      {/* <Separator /> */}
      <MostDownloaded />
      <Demo />
      <ContactUs />
      <Footer />
    </div>
  );
}
