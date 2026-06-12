import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
