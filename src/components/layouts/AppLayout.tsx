"use client"
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Footer from "./Footer";
import Header from "./Header";
import { Container } from "./Container";

const AuthProvider = dynamic(async () => (await import('@/components/auth/AuthProvider')).AuthProvider, { ssr: false })
const XmtpProvider = dynamic(() => import('@/utils/XmtpContext'), {
  suspense: false,
  ssr: false,
})

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return <NextUIProvider>
    <AuthProvider>
      <XmtpProvider>
        <div className="background overflow-hidden max-h-screen">
          <Header />
          <div className="flex flex-col items-center justify-between w-[100%] overflow-hidden max-h-screen">
            <Container>
              {children}
            </Container>
          </div>
        </div>
      </XmtpProvider>
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