import { X } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[50vh] flex flex-col items-center justify-center pt-20 pb-5 text-center px-4 sm:px-6 lg:px-8">
      <div className="flex gap-3">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold">Ctrl+F[iction]</h1>
        <X size={100} />
        <Image src={"/rtulogo.png"} width={100} height={100} alt="RTU logo" />
      </div>
      <p className="mt-4 max-w-3xl text-base sm:text-lg lg:text-xl font-light leading-relaxed">
        Unleash a world of <b>ebooks</b> with lightning-fast searches across top libraries and chat
        with <b>Ctrl</b>, your <b>AI Librarian</b>, for instant answers. Discover, download, and
        dive in—searching has never been this smart or simple!
      </p>
    </section>
  );
}
