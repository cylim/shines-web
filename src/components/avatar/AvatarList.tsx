"use client";

import { Avatar } from "@/utils/scheme";
import { AvatarItem } from "@/components/avatar/AvatarItem";
import { useAccount } from "wagmi";
import { EmptyComponent } from "../EmptyComponent";
import { CircularProgress } from "@nextui-org/react";

export const AvatarList = ({ items, loading }: { items: Avatar[], loading: boolean}) => {
  if(loading){
    return <div className="w-full mx-auto mt-8 flex flex-col items-center">
      <CircularProgress size="lg" />
    </div>
  }

  const renderAvatarItem = (item: Avatar) => {
    return <AvatarItem key={item.id} item={item} />
  }

  return (
    <div className="w-full mx-auto mt-8 flex flex-col">
      <div className="py-3">
            {!items.length ? <EmptyComponent/> : null}
          <div className=" flex flex-row flex-wrap items-center justify-start gap-4">
            {items.map(renderAvatarItem)}
          </div>
      </div>
    </div>
  );
};
