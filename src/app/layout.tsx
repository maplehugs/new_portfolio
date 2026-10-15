import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maple's Place",
  description: "Juan Guerrero (maple): Software Engineering, Linux & infrastructure. Projects, experience and CV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
