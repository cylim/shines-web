"use client";

import { useCallback, useEffect, useState } from "react";
import { Avatar, Prompt } from "@/utils/scheme";
import { AvatarPromptItem } from "./AvatarPromptItem";
import { EmptyComponent } from "../EmptyComponent";
import { useParams } from "next/navigation";
import { get, list as listDoc } from "@/utils/firebaseHelper";
import Box from "../layouts/Box";
import { Image } from "@nextui-org/react";

export const AvatarPromptsList = () => {
  const params = useParams()
  const [file, setFile] = useState<File | undefined>();
  const [items, setItems] = useState<Prompt[]>([]);
  const [avatar, setAvatar] = useState<Avatar | undefined>(undefined);

  const getOne = useCallback(async () => {
    if (!params?.id) {return}

    const ava = await get('avatars', [params?.id as string]) as Avatar
    fetch(ava.sourceUrl)
      .then(async response => {
        const contentType = response.headers.get('content-type')
        const blob = await response.blob()
        // @ts-ignore
        const t = new File([blob], 'a.png', { contentType })
        setFile(t)
      })
    console.log(items)

    setAvatar(ava);
  }, [params.id]);

  const list = async () => {
    const items = await listDoc('prompts') as Prompt[]
    console.log(items)

    setItems(items.filter(v => v.avatarPrompted === params?.id));
  };

  useEffect(() => {
    (async () => await list())();
    (async () => await getOne())();
  }, []);

  const renderAvatarItem = (item: Prompt) => {
    return <AvatarPromptItem key={item.id} item={item} file={file} />
  }

  return (
    <div className="w-full mx-auto mt-8 flex flex-col items-center overflow-y-scroll py-3">
        {!items.length ? <EmptyComponent /> : 
        <div className={'flex flex-col gap-4 w-[100%] mx-4 items-center justify-center'}>
          <div className={'text-black'}>
            <Image src={avatar?.sourceUrl} height={320} width={320} />
            <p className="text-center pt-4 text-xl text-gray-500">requests</p>
            <p className="text-center pt-2 text-4xl">{avatar?.description}</p>
          </div>
          {items.map(renderAvatarItem)}
        </div>
        }
        

    </div>
  );
};
