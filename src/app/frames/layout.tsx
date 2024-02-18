import type { Metadata } from "next";
import { APP_NAME } from "@/utils/env";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Shines - your digital representative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <body>{children}</body>
    </html>
  );
}
