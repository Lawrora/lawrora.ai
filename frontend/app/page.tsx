import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="relative z-30 flex items-center justify-between px-8 py-4">

        <h1 className="text-2xl font-bold text-white">
          Home
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
          <h2 className="pl-6 text-9xl text-white font-sans font-bold animate-reveal">
            LAWRORA
          </h2>

          <p className="pl-7 text-2xl text-white font-sans font-bold animate-reveal">
            Coming soon ..
          </p>
        </div>

      </section>

      <section className="relative flex items-center h-[80vh] bg-black">
        <div id = "hero-section" className="text-white">
          <h2 className="pl-6 text-9xl font-sans font-bold">
            What do we do
          </h2>

          <p className="pl-7">
            We listen, help and improve.
          </p>
        </div>

      </section>

      <footer className="bg-black text-white px-8 py-16">
        <div className="mx-auto max-w-7xl">

          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold">
                Lawrora.ai
              </h3>
              <p className="mt-4 text-sm text-white/70 max-w-xs">
                Intelligent legal assistance designed to simplify workflows and improve clarity.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Product
              </h4>

              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">Pricing</li>
                <li className="hover:text-white cursor-pointer">Security</li>
                <li className="hover:text-white cursor-pointer">Integrations</li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Company
              </h4>

              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Blog</li>
                <li className="hover:text-white cursor-pointer">Contact</li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">
                Legal
              </h4>

              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Terms of Service</li>
                <li className="hover:text-white cursor-pointer">Compliance</li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div className="mt-12 border-t border-white/10" />

          {/* Bottom Row */}
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/60">

            <p>
              © {new Date().getFullYear()} Lawrora.ai. All rights reserved.
            </p>

            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="https://x.com/lawrora_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                Twitter
              </a>
              <a
                href="https://www.linkedin.com/company/lawrora/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Lawrora"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                GitHub
              </a>
            </div>

          </div>

        </div>
      </footer>

    </main>
  );
}
