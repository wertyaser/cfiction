import About from "@/components/home/about";
import ContactUs from "@/components/home/contact-us";
import Preview from "@/components/home/preview";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Trending from "@/components/home/most-downloaded";
import Image from "next/image";
// import { useEffect, useState } from "react";
// import dynamic from "next/dynamic";

export default async function Home() {
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
      <Trending />
      <Preview />
      <ContactUs />
      <Footer />
      {/* <NoSSR /> */}
    </div>
  );
}
