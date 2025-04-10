"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./theme-switch";
import { Button } from "./button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const items = ["Home", "About", "Preview", "Contact Us"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="p-6 max-w-screen-lg mx-auto flex items-center justify-between text-foreground">
      {/* Logo */}
      <Link href="/">
        <Image src="/LOGO.png" alt="Logo" width={60} height={60} />
      </Link>

      {/* Desktop Navbar Links */}
      <div className="hidden md:flex items-center space-x-6">
        {items.map((item) => (
          <Link key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}>
            {item}
          </Link>
        ))}
      </div>

      {/* Authentication */}
      <div className="hidden md:flex items-center space-x-3">
        <Link href="/register">Register</Link>
        <Button asChild variant="outline">
          <Link className="bg-foreground text-background p-2" href="/sign-in">
            Sign in
          </Link>
        </Button>
        <ThemeSwitch />
      </div>

      {/* Mobile Burger Menu */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="p-2">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background shadow-lg z-50">
          <div className="flex flex-col items-center space-y-4 p-4">
            {items.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg">
                {item}
              </Link>
            ))}
            <div className="flex flex-col items-center space-y-3 mt-4">
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
              <Button asChild variant="outline">
                <Link
                  className="bg-foreground text-background p-2"
                  href="/sign-in"
                  onClick={() => setIsMenuOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <ThemeSwitch />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
