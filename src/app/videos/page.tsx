"use client";

import dynamic from "next/dynamic";

const AppLayout = dynamic(async () => (await import('@/components/layouts/AppLayout')).AppLayout, { ssr: false })

export default function Home() {
  return (
    <AppLayout>
      <div />
    </AppLayout>
  );
}
