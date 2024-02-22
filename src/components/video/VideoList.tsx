"use client";

import { Video } from "@/utils/scheme";
import { VideoListItem } from "./VideoListItem";
import { useAccount } from "wagmi";
import { EmptyComponent } from "../EmptyComponent";
import { CircularProgress } from "@nextui-org/react";
import { useLens } from "@/utils/lens";


export const VideoList = ({ items, loading }: { items: Video[], loading: boolean}) => {
  const { isConnected } = useAccount()
  const lensClient = useLens()

  if (loading) {
    return <div className="w-full mx-auto mt-8 flex flex-col items-center">
      <CircularProgress size="lg" />
    </div>
  }
  
  if(!isConnected) {
    return <EmptyComponent />
  }

  const renderItem = (item: Video) => {
    return <VideoListItem key={item.id} item={item} lensClient={lensClient} />
  }

  return (
    <div className="w-full mx-auto mt-2 flex flex-col">
      <div className="py-3">
        {!items.length ? <EmptyComponent /> : null}
        <div className="flex flex-row flex-wrap items-center justify-start gap-4">
          {items.map(renderItem)}
        </div>
      </div>
    </div>
  );
};
