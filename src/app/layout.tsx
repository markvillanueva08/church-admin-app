import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Church Volunteer Database",
  description: "A comprehensive platform to manage volunteers and schedules.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="glass navbar">
          <div className="container flex justify-between items-center">
            <Link href="/" className="gradient-text" style={{ fontSize: "1.5rem", fontWeight: "800" }}>
              ServeLink
            </Link>
            <nav className="nav-links">
              <Link href="/login" className="btn btn-secondary">Login</Link>
              <Link href="/dashboard" className="btn btn-primary">Dashboard</Link>
            </nav>
          </div>
        </header>
        <main className="container mt-8 animate-fade-in">
          {children}
        </main>
      </body>
    </html>
  );
}
