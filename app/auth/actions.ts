"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authCookieName, encodeUser, isValidEmail, normalizeEmail } from "@/lib/auth";

export async function registerTrainer(formData: FormData) {
  const email = normalizeEmail(String(formData.get("email") ?? ""));

  if (!isValidEmail(email)) {
    redirect("/auth?error=Enter%20a%20valid%20email%20address");
  }

  const cookieStore = await cookies();
  cookieStore.set(authCookieName, encodeUser({ email, role: "trainer" }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30
  });

  redirect("/trainer");
}

export async function loginTrainer(formData: FormData) {
  return registerTrainer(formData);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(authCookieName);
  redirect("/");
}
