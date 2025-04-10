import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex flex-col items-center justify-center text-center lg:text-left">
      <div className="flex justify-center py-5">
        <Image src="/LOGO.png" width={150} height={150} alt="Logo" />
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Ctrl + F[iction]</h1>
      <p className="mt-4 max-w-3xl text-base sm:text-lg lg:text-xl font-light leading-relaxed">
        Unleash a world of <b>ebooks</b> with lightning-fast searches across top libraries and chat
        with <b>Ctrl</b>, your <b>AI Librarian</b>, for instant answers. Discover, download, and
        dive in—reading has never been this smart or simple!
      </p>
    </div>
  );
}
