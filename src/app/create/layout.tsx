"use client"

import { Inter } from "next/font/google";
import "../globals.css";
import AppLayout from "@/components/layouts/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body className={inter.className}>
        <AppLayout>
        {children}
        </AppLayout>
        </body>
    </html>
  );
}
