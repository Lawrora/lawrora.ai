import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-8 py-4 bg-black shadow">

        <h1 className="text-2xl font-bold text-white">
          Lawrora.ai
        </h1>

      </header>

      <section className="flex items-center h-[80vh]">

        <div id = "hero-section">
        
          <Image
            src="/hero.jpg"
            alt="Hero background"
            fill
            priority
            className="object-cover brightness-75"
          />
          <h2 className="text-9xl text-white font-sans font-bold animate-reveal">
            LAWRORA
          </h2>
        </div>

      </section>

      <section className="relative flex items-center h-[80vh] bg-black">
        <div id = "hero-section" className="text-white">
          <h2 className="text-9xl font-sans font-bold">
            what do we do
          </h2>

          <p>
            We listen, help and improve.
          </p>
        </div>

      </section>

    </main>
  );
}
