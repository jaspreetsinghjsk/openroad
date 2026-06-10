import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { getCurrentUser } from "@/lib/auth";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="siteHeader">
      <Link className="brand" href="/">
        <span className="brandMark">OR</span>
        <span>OpenRoad</span>
      </Link>
      <nav className="navLinks" aria-label="Primary navigation">
        <Link href="/trainee">Trainee</Link>
        <Link href="/trainer">Trainer</Link>
        {user ? (
          <form action={logout}>
            <button className="linkButton" type="submit">
              Log out
            </button>
          </form>
        ) : (
          <Link href="/auth">Log in</Link>
        )}
      </nav>
    </header>
  );
}
