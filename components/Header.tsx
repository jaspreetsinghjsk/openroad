import Link from "next/link";

export function Header() {
  return (
    <header className="siteHeader">
      <Link className="brand" href="/">
        <span className="brandMark">OR</span>
        <span>OpenRoad</span>
      </Link>
      <nav className="navLinks" aria-label="Primary navigation">
        <Link href="/trainee">Trainee</Link>
        <Link href="/trainer">Trainer</Link>
      </nav>
    </header>
  );
}
