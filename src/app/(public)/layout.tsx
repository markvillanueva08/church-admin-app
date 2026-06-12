import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
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
    </>
  );
}
