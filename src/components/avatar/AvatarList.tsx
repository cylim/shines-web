"use client";

import { useEffect, useState } from "react";
import { Doc, listDocs } from "@junobuild/core-peer";
import { Avatar } from "@/utils/scheme";
import { AvatarItem } from "./AvatarItem";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { EmptyComponent } from "../EmptyComponent";

const CreateModal = dynamic(async () => (await import('@/components/avatar/CreateModal')).CreateModal, { ssr: false })

export const AvatarList = () => {
  const { address, isConnected } = useAccount()
  const [items, setItems] = useState<Doc<Avatar>[]>([]);

  useEffect(() => {
    window.addEventListener("reloadAvatar", list);

    return () => {
      window.removeEventListener("reloadAvatar", list);
    };
  }, []);

  const list = async () => {
    if (!address) return

    const { items } = await listDocs<Avatar>({
      collection: "avatars",
      filter: {
        order: {
          desc: true,
          field: 'created_at'
        },
      },
    });
    console.log(items)

    setItems(items.filter(v => v.data.address === address));
  };

  useEffect(() => {
    if (!address) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [address]);

  const renderAvatarItem = ({ key, data, created_at, updated_at }: Doc<Avatar>) => {
    return <AvatarItem key={key} item={data} createdAt={created_at} updatedAt={updated_at} />
  }

  return (
    <div className="w-full mx-auto shadow-lg mt-8 flex flex-col items-center">
      <div className="py-3">
            {!items.length ? <EmptyComponent/> : null}
          <div className=" flex flex-row flex-wrap items-center justify-start gap-4">
            {items.map(renderAvatarItem)}
          </div>
      </div>
      {!isConnected ? <div className="flex flex-col items-center"><ConnectButton /></div> : <CreateModal />}

    </div>
  );
};
