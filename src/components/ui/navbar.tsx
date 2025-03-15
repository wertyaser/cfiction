import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const items = ["Home", "About", "Demo", "Contact Us"];
  const { setTheme } = useTheme();

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
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
