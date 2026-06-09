import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenRoad",
  description: "Video training for trainers and trainees"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
