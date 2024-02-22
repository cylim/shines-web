"use client";

import { Post } from "@/utils/scheme";
import { PostListItem } from "./PostListItem";
import { useAccount } from "wagmi";
import { EmptyComponent } from "../EmptyComponent";
import { CircularProgress } from "@nextui-org/react";
import { LensClient } from "@lens-protocol/client";


export const PostList = ({ items, loading, lensClient }: { items: Post[], loading: boolean, lensClient: LensClient | undefined }) => {
  const { isConnected } = useAccount()


  if (loading) {
    return <div className="w-full mx-auto mt-8 flex flex-col items-center">
      <CircularProgress size="lg" />
    </div>
  }

  if (!isConnected) {
    return <EmptyComponent />
  }

  const renderItem = (item: Post) => {
    return <PostListItem key={item.id} item={item} lensClient={lensClient} />
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
