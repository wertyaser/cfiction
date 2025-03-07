// import Image from "next/image";
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[50vh] flex flex-col items-center justify-center pt-20 pb-5 text-center"
    >
      <h1 className="text-8xl font-bold">Ctrl+F[iction]</h1>
      <p className="mt-4 max-w-3xl text-xl font-light leading-relaxed">
        A cutting-edge <b>AI chatbot</b> designed to effortlessly find and
        download <b>ebooks</b>,<b> publications</b>, <b>articles</b>, and
        <b>journals</b> with simple commands.
        <b> Why waste time browsing</b> when you can access instant results
        through a free ebooks API?
      </p>
    </section>
  );
}
