import { Outfit } from 'next/font/google';
import './globals.css';
import "flatpickr/dist/flatpickr.css";
import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ClientErrorLogger from '@/components/ClientErrorLogger';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <SidebarProvider>
            <ClientErrorLogger />
            <ClientErrorBoundary>{children}</ClientErrorBoundary>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
