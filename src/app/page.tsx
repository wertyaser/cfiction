"use client";

import About from "@/components/about";
import ContactUs from "@/components/contact-us";
import Demo from "@/components/demo";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import MostDownloaded from "@/components/most-downloaded";
import Image from "next/image";
// import dynamic from "next/dynamic";

export default function Home() {
  // const NoSSR = dynamic(() => import("../components/no-ssr"), { ssr: false });
  return (
    <div className="bg-background text-foreground">
      <Header />
      <Hero />
      <Image
        className="min-w-full block dark:hidden"
        src="/parallax.svg"
        width={1080}
        height={720}
        alt="Parallax"
      />
      <Image
        src="/parallax-white.svg"
        alt="Dark Mode Logo"
        width={1080}
        height={720}
        className="hidden dark:block min-w-full"
      />
      <About />
      <MostDownloaded />
      <Demo />
      <ContactUs />
      <Footer />
      {/* <NoSSR /> */}
    </div>
  );
}
