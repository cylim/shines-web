"use client";

import { useEffect, useState } from "react";
import { Avatar, Video } from "@/utils/scheme";
import { VideoListItem } from "./VideoListItem";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { EmptyComponent } from "../EmptyComponent";
import { CircularProgress } from "@nextui-org/react";

const CreateModal = dynamic(async () => (await import('@/components/avatar/CreateModal')).CreateModal, { ssr: false })

export const VideoList = ({ items, loading }: { items: Video[], loading: boolean}) => {
  const { address, isConnected } = useAccount()

  if (loading) {
    return <div className="w-full mx-auto mt-8 flex flex-col items-center">
      <CircularProgress size="lg" />
    </div>
  }
  
  if(!isConnected) {
    return <EmptyComponent />
  }

  const renderItem = (item: Video) => {
    return <VideoListItem key={item.id} item={item} />
  }

  return (
    <div className="w-full mx-auto mt-8 flex flex-col items-center">
      <div className="py-3">
        {!items.length ? <EmptyComponent /> : null}
        <div className=" flex flex-row flex-wrap justify-start gap-4">
          {items.map(renderItem)}
        </div>
      </div>
    </div>
  );
};
