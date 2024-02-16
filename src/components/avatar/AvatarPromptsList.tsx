"use client";

import { useEffect, useState } from "react";
import { Prompt } from "@/utils/scheme";
import { AvatarPromptItem } from "./AvatarPromptItem";
import { useAccount } from "wagmi";
import { EmptyComponent } from "../EmptyComponent";
import { useParams } from "next/navigation";
import { list as listDoc } from "@/utils/firebaseHelper";

export const AvatarPromptsList = () => {
  const { address } = useAccount()
  const params = useParams()
  const [items, setItems] = useState<Prompt[]>([]);


  const list = async () => {
    if (!address) return

    const items = await listDoc('prompts') as Prompt[]
    console.log(items)

    setItems(items.filter(v => v.avatarPrompted === params?.id));
  };

  useEffect(() => {
    if (!address) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [address]);

  const renderAvatarItem = (item: Prompt) => {
    return <AvatarPromptItem key={item.id} item={item} timestamp={item.timestamp}/>
  }

  return (
    <div className="w-full mx-auto shadow-lg mt-8 flex flex-col items-center">
      <div className="py-3">
        {!items.length ? <EmptyComponent /> : null}
        <div className=" flex flex-row flex-wrap items-center justify-start gap-4">
          {items.map(renderAvatarItem)}
        </div>
      </div>

    </div>
  );
};
