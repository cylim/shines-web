"use client";

import { useEffect, useState } from "react";
import { Doc, listDocs } from "@junobuild/core-peer";
import { Avatar } from "@/utils/scheme";
import { AvatarItem } from "./AvatarItem";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const CreateModal = dynamic(async () => (await import('@/components/avatar/CreateModal')).CreateModal, { ssr: false })

export const AvatarList = () => {
  const { address, isConnected } = useAccount()
  const [items, setItems] = useState<Doc<Avatar>[]>([]);

  useEffect(() => {
    window.addEventListener("reload", list);

    return () => {
      window.removeEventListener("reload", list);
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
    <div className="w-full max-w-2xl mx-auto shadow-lg mt-8">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800 text-4xl">Resolution</h2>
      </header>
      <div className="py-3">
        <div className="overflow-x-auto">
          {!items.length ? <div className="py-8">
            <h1 className="text-9xl py-4">🧗‍♂️</h1>
            <span className="text-xl text-stone-900">Create a challenge, step out of comfort zone!</span>
          </div> : null}
          <div className="max-h-[320px] overflow-y-auto">
            {items.map(renderAvatarItem)}
          </div>
        </div>
      </div>
      {!isConnected ? <div className="flex flex-col items-center"><ConnectButton /></div> : <CreateModal />}

    </div>
  );
};
