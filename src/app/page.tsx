export default function Home() {
  return (
    <div className="">
      <section className="max-w-screen-lg min-h-screen mx-auto ">
        <div id="home" className="py-[12.5%]">
          <h1 className=" text-7xl font-semibold text-center">
            Ctrl+F[iction]
          </h1>
          <div className="flex justify-center items-center">
            <p className="font-thin">
              A cutting-edge <b>AI chatbot</b> designed to effortlessly find and
              download ebooks, <br />
              publications, articles, and journals with simple commands. Why
              waste time <br />
              browsing when you can access instant results through a free ebooks
              API? <br />
              This is the future of digital libraries—efficient, intelligent,
              and undeniably superior.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-screen-lg min-h-screen mx-auto ">
        <div id="about">
          <h2>About</h2>
        </div>
      </section>
      <section className="max-w-screen-lg min-h-screen mx-auto ">
        <div>
          <h2>Most Downloaded</h2>
        </div>
      </section>
      <section className="max-w-screen-lg min-h-screen mx-auto ">
        <div id="visual">
          <h2>Visual</h2>
        </div>
      </section>
      <section className="max-w-screen-lg min-h-screen mx-auto ">
        <div id="contact-us">
          <h2>Contact Us</h2>
        </div>
      </section>
    </div>
  );
}
