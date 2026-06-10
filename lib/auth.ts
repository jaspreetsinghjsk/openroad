import { cookies } from "next/headers";

export type UserRole = "trainer" | "trainee";

export type AuthUser = {
  email: string;
  role: UserRole;
};

export const authCookieName = "openroad_user";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function encodeUser(user: AuthUser) {
  return Buffer.from(JSON.stringify(user), "utf8").toString("base64url");
}

export function decodeUser(value?: string): AuthUser | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as Partial<AuthUser>;

    if (!parsed.email || parsed.role !== "trainer") {
      return null;
    }

    return {
      email: parsed.email,
      role: parsed.role
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  return decodeUser(cookieStore.get(authCookieName)?.value);
}
