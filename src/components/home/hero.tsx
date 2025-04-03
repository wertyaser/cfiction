// import Image from "next/image";
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[50vh] flex flex-col items-center justify-center pt-20 pb-5 text-center">
      <h1 className="text-8xl font-bold">Ctrl+F[iction]</h1>
      <p className="mt-4 max-w-3xl text-xl font-light leading-relaxed md:text-md sm:text">
        Unleash a world of <b>ebooks</b> with lightning-fast searches across top libraries and chat
        with
        <b>Ctrl</b>, your <b>AI Librarian</b>, for instant answers. Discover, download, and dive
        in—reading has never been this smart or simple!
      </p>
    </section>
  );
}
