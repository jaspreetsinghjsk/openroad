import Link from "next/link";
import { Header } from "@/components/Header";
import { getCurrentUser } from "@/lib/auth";
import { loginTrainer, registerTrainer } from "./actions";

type AuthPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const [{ error }, user] = await Promise.all([searchParams, getCurrentUser()]);

  return (
    <>
      <Header />
      <main className="authShell">
        <section className="sectionHeader">
          <p className="eyebrow">Trainer access</p>
          <h1>Sign in to OpenRoad</h1>
          <p>
            Testing mode is open: any email address can register as a trainer and publish video courses.
          </p>
        </section>

        {error ? <p className="errorMessage">{error}</p> : null}

        {user ? (
          <section className="authPanel">
            <h2>You are signed in</h2>
            <p>{user.email} has trainer access.</p>
            <Link className="button" href="/trainer">
              Go to trainer dashboard
            </Link>
          </section>
        ) : (
          <div className="authGrid">
            <form className="authPanel" action={registerTrainer}>
              <h2>Register as trainer</h2>
              <label>
                Email
                <input name="email" type="email" placeholder="trainer@example.com" required />
              </label>
              <button className="button" type="submit">
                Register
              </button>
            </form>

            <form className="authPanel" action={loginTrainer}>
              <h2>Log in</h2>
              <label>
                Email
                <input name="email" type="email" placeholder="trainer@example.com" required />
              </label>
              <button className="button secondaryButton" type="submit">
                Log in
              </button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
