import Link from "next/link";

export default function Nav() {
  return (
    <nav style={{ display: "flex", gap: "1rem", padding: "1.5rem" }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
}