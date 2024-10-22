import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/Toast/ToastProvider";
import { Analytics } from '@vercel/analytics/react';


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
      <ToastProvider>
        <body className={inter.className}>{children}</body>
      </ToastProvider>
      <Analytics />
    </html>
  );
}
