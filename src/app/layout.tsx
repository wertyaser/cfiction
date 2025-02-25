import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--font-archivo",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
