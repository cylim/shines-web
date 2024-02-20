"use client";

import { Video } from "@/utils/scheme";
import { VideoListItem } from "./VideoListItem";
import { useAccount } from "wagmi";
import { EmptyComponent } from "../EmptyComponent";
import { CircularProgress } from "@nextui-org/react";


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
    <div className="w-full mx-auto mt-2 flex flex-col items-start">
      <div className="py-3">
        {!items.length ? <EmptyComponent /> : null}
        <div className="flex flex-row flex-wrap justify-start gap-4">
          {items.map(renderItem)}
        </div>
      </div>
    </div>
  );
};
