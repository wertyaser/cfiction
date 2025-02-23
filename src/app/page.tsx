"use client";

import Link from "next/link";
import Image from "next/image";
import { topBooks } from "@/lib/topBooks";

export default function Home() {
  return (
    <div className="">
      <header className="relative">
        <nav className="p-6 max-w-screen-lg mx-auto flex items-center justify-between text-xl">
          <Link href="/">
            <Image src="/LOGO.png" alt="Logo" width={60} height={60} />
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/">Home</Link>
            <Link href="#about">About</Link>
            <Link href="#visual">Visual</Link>
            <Link href="#contact-us">Contact Us</Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/register">Register</Link>
            <Link className="dark-btn" href="/sign-in">
              Sign in
            </Link>
          </div>
        </nav>
      </header>
      <section
        className="min-h-[50vh] pt-[10%] pb-10 items-center flex flex-col "
        id="home"
      >
        <h1 className="text-8xl font-semibold text-center">Ctrl+F[iction]</h1>
        <p className="font-thin text-xl">
          A cutting-edge <b>AI chatbot</b> designed to effortlessly find and
          download <b>ebooks</b>, <br />
          <b>publications</b>, <b>articles</b>, and <b>journals</b> with simple
          commands.
          <b>
            Why waste time <br />
            browsing when you can access instant results through a free ebooks
            API?
          </b>
          <br />
          This is the future of digital libraries—efficient, intelligent, and
          undeniably superior.
        </p>
      </section>
      <div className="relative max-w-screen min-h-[50vh]">
        <Image src="/parallax.png" width={1943} height={774} alt="Parallax" />
        {/* <div className="">
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold whitespace-nowrap">
            Ctrl + [Fiction]
          </h1>
        </div>
        <div className="">
          <h1 className="text-4xl md:text-8xl lg:text-9xl font-bold whitespace-nowrap">
            Ctrl + [Fiction]
          </h1>
        </div> */}
      </div>
      <section className="min-h-[65vh] pt-12">
        <div className="flex pb-4">
          <h1 className="text-7xl font-semibold">A</h1>
          <h1 className="text-7xl font-thin ">bout</h1>
        </div>
        <p className="font-thin text-2xl">
          <b>Ctrl+F[iction]</b> is an intelligent library chatbot system
          designed to streamline the ebook search and retrieval process.
          Utilizing AI-powered natural language processing . users chan simply
          input commands to find and download ebooks instantly. This system
          offers a seamless and automated solution for accessing digital
          libraries, enhancing user experience through efficient, real-time
          results and intelligent recommendations.
        </p>
      </section>
      <div className="min-h-[50vh] ">
        <h2 className="text-bold text-7xl text-center pb-4">Most Downloaded</h2>
        <div className="bg-primary text-white p-4">
          <ul className="flex flex-wrap justify-center space-x-4 animate-marquee">
            {topBooks.map((book) => (
              <li key={book.id} className="p-4 rounded-lg">
                <h3 className="text-lg">{book.title}</h3>
                <p>{book.downloads} downloads</p>
              </li>
            ))}
          </ul>
          <style jsx>{`
            @keyframes marquee {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
            .animate-marquee {
              display: flex;
              white-space: nowrap;
              overflow: hidden;
              animation: marquee 15s linear infinite;
            }
          `}</style>
        </div>
      </div>
      <section className=" min-h-screen mx-auto ">
        <div id="visual">
          <h2>Visual</h2>
        </div>
      </section>
      <section className="min-h-screen mx-auto ">
        <div id="contact-us">
          <h2>Contact Us</h2>
        </div>
      </section>
    </div>
  );
}
