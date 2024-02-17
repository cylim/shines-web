"use client";

import { AvatarPromptsList } from "@/components/avatar/AvatarPromptsList";
import AppLayout from "@/components/layouts/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <AvatarPromptsList />
    </AppLayout>
  );
}
