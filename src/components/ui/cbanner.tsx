import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex flex-col justify-center">
      <div className="py-5 mx-auto">
        <Image src="/LOGO.png" width={150} height={150} alt="Logo" />
      </div>
      <h1 className="text-7xl font-bold">Ctrl + F[iction]</h1>
      <p className="font-thin text-sm">
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
    </div>
  );
}
