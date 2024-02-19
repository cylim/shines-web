"use client";
import AppLayout from "@/components/layouts/AppLayout";
import dynamic from "next/dynamic";

const AvatarContainer = dynamic(async () => (await import('@/components/avatar/AvatarContainer')).AvatarContainer, { ssr: false })


export default function Home() {

  return (
    <AppLayout>
      <AvatarContainer />
    </AppLayout>
  );
}
