
'use client'
import { Button } from "@nextui-org/react";
import { Post } from "@/utils/scheme";
import { LensClient, isRelaySuccess } from "@lens-protocol/client";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useParams } from "next/navigation";


export const PostListItem = ({ item, lensClient }: { item: Post, lensClient: LensClient | undefined }) => {
  const { address } = useAccount()
  const params = useParams()

  const isOwner = params.address === address

  const add = ( ) => {

  }

  return  <div className="flex flex-col gap-2 border-slate-500 border-1 p-2 rounded-xl">
      <div className="font-semibold text-2xl grow flex flex-row items-start">
        <video controls src={item.metadata.asset.video.raw.uri} height={240} width={240} className={'max-h-[240px] max-w-[240px] min-h-[240px] min-w-[240px]'} />
      </div>

    {isOwner && <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
        <Button radius="full" onClick={add} color={'primary'} className="w-[220px]">Add Bid</Button>
          </div>}
    </div>
}