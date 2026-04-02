export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "4rem 1.5rem" }}>
      <section style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Your Brand Name
        </h1>
        <p style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
          A clear one-sentence description of what your website is about.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>What you do</h2>
        <p style={{ lineHeight: 1.7 }}>
          Explain your product, service, project, or portfolio here.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Why choose you</h2>
        <ul style={{ paddingLeft: "1.25rem", lineHeight: 1.9 }}>
          <li>Benefit one</li>
          <li>Benefit two</li>
          <li>Benefit three</li>
        </ul>
      </section>

      <section>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Contact</h2>
        <p>Email: hello@yourdomain.com</p>
      </section>
    </main>
  );
}