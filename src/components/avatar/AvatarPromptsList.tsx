"use client";

import { useEffect, useState } from "react";
import { Doc, listDocs } from "@junobuild/core-peer";
import { Prompt } from "@/utils/scheme";
import { AvatarPromptItem } from "./AvatarPromptItem";
import { useAccount } from "wagmi";
import { EmptyComponent } from "../EmptyComponent";
import { useParams } from "next/navigation";

export const AvatarPromptsList = () => {
  const { address } = useAccount()
  const params = useParams()
  const [items, setItems] = useState<Doc<Prompt>[]>([]);

  useEffect(() => {
    window.addEventListener("reloadAvatar", list);

    return () => {
      window.removeEventListener("reloadAvatar", list);
    };
  }, []);

  const list = async () => {
    if (!address) return

    const { items } = await listDocs<Prompt>({
      collection: "prompts",
      filter: {
        order: {
          desc: true,
          field: 'created_at'
        },
      },
    });
    console.log(items)

    setItems(items.filter(v => v.data.avatarPrompted === params?.id));
  };

  useEffect(() => {
    if (!address) {
      setItems([]);
      return;
    }

    (async () => await list())();
  }, [address]);

  const renderAvatarItem = ({ key, data, created_at, updated_at }: Doc<Prompt>) => {
    return <AvatarPromptItem key={key} item={data} createdAt={created_at} updatedAt={updated_at} />
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
