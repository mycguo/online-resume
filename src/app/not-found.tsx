import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404 / A SMALL DETOUR</span>
      <h1>Nothing here just yet.</h1>
      <p>Let’s get you back to the projects.</p>
      <Link className="button-primary" href="/">
        Explore the portfolio →
      </Link>
    </main>
  );
}
