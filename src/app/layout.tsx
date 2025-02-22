import Link from "next/link";
import Image from "next/image";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <header className="relative">
          <nav className="sticky top-0 z-50 p-6 max-w-screen-lg mx-auto flex items-center justify-between">
            <Link href="/">
              <Image src="/LOGO.png" alt="Logo" width={50} height={50} />
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
        <main>{children}</main>
        <footer>
          <p className="text-center">© 2025 Ctrl + Fiction</p>
        </footer>
      </body>
    </html>
  );
}
