"use client";

import Header from "@/components/layouts/Header";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import { NextUIProvider } from "@nextui-org/react";
import Footer from "@/components/layouts/Footer";
import { AvatarPromptsList } from "@/components/avatar/AvatarPromptsList";

const AuthProvider = dynamic(async () => (await import('@/components/auth/AuthProvider')).AuthProvider, { ssr: false })

export default function Home() {
  return (
    <NextUIProvider>
      <AuthProvider>
        <div className="background overflow-y-auto bg-cover bg-center bg-[#00000090] bg-blend-hue overflow-x-hidden">
          <Header />
          <main className="flex min-h-screen flex-col items-center justify-between px-24">
            <AvatarPromptsList />
          </main>
        </div>
        <Footer />
      </AuthProvider>
      <Toaster
        toastOptions={{
          className: 'w-full',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '8px',
          },
        }}
        position="bottom-center"
      />
    </NextUIProvider>
  );
}
