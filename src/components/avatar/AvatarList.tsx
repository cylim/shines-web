"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/utils/scheme";
import { AvatarItem } from "./AvatarItem";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { EmptyComponent } from "../EmptyComponent";
import { list as listDoc } from "@/utils/firebaseHelper";

const CreateModal = dynamic(async () => (await import('@/components/avatar/CreateModal')).CreateModal, { ssr: false })

export const AvatarList = () => {
  const { address, isConnected } = useAccount()
  const [items, setItems] = useState<Avatar[]>([]);

  useEffect(() => {
    window.addEventListener("reloadAvatar", list);

    return () => {
      window.removeEventListener("reloadAvatar", list);
    };
  }, []);

  const list = async () => {
    if (!address) return

    const items = await listDoc("avatars") as Avatar[]
    console.log(items)

    setItems(items.filter(v => v.address === address));
  };

  useEffect(() => {
    if (!address) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [address]);

  const renderAvatarItem = (item: Avatar) => {
    return <AvatarItem key={item.id} item={item} />
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
