import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast/ToastProvider";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/Editor-v2/theme-provider';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Script Box",
  description: "Your online code workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <ToastProvider>
          <body className={inter.className}>{children}</body>
        </ToastProvider>
      </ThemeProvider>
      <Analytics />
    </html>
  );
}
