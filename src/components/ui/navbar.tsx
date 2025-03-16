"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./theme-switch";

export default function Navbar() {
  const items = ["Home", "About", "Demo", "Contact Us"];

  return (
    <nav className="p-6 max-w-screen-lg mx-auto flex items-center justify-between text-">
      {/* Logo */}
      <Link href="/">
        <Image src="/LOGO.png" alt="Logo" width={60} height={60} />
      </Link>

      {/* Navbar Links */}
      <div className="hidden md:flex items-center space-x-6">
        {items.map((item) => (
          <Link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}>
            {item}
          </Link>
        ))}
      </div>

      {/* Authentication */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/register">Register</Link>
        <Link className="bg-background text-foreground" href="/sign-in">
          Sign in
        </Link>
        <ThemeSwitch />
      </div>
      {/* <div></div> */}
    </nav>
  );
}
