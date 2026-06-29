import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ClientErrorLogger from '@/components/ClientErrorLogger';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';
import ClientSessionProvider from '@/components/ClientSessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const outfit = Outfit({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <ClientSessionProvider session={session}>
              <ClientErrorLogger />
              <ClientErrorBoundary>{children}</ClientErrorBoundary>
            </ClientSessionProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
