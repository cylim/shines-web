"use client"
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Footer from "./Footer";
import Header from "./Header";

const AuthProvider = dynamic(async () => (await import('@/components/auth/AuthProvider')).AuthProvider, { ssr: false })

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>
    <AuthProvider>
      <div className="background overflow-y-auto bg-cover bg-center bg-[#00000090] bg-blend-hue overflow-x-hidden">
        <Header />
        <main className="flex min-h-screen flex-col items-center justify-between px-10">
          {children}
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
  </NextUIProvider >
}

export default AppLayout