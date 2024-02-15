'use client'
import { Button, Card, Image, Link } from "@nextui-org/react";
import { Prompt } from "@/utils/scheme";
import toast from "react-hot-toast";
import { HOST } from "@/utils/env";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import NextLink from 'next/link'
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export const AvatarPromptItem = ({ item, createdAt, updatedAt }: { item: Prompt, createdAt: bigint | undefined, updatedAt: bigint | undefined }) => {
  const { sendTransactionAsync } = useSendTransaction()  

  const tip = async () => {
    try {
      const hash = await sendTransactionAsync({ to: item.address as`0x${string}`, value: parseEther('0.008') }) 
      toast.success(`Tx: ${hash}`)
    } catch {
      toast.error(`Declined`)
    }
  }

  return <div className="flex flex-col gap-4 border-slate-500 border-1 p-2 rounded-lg">

      <div className="font-semibold text-2xl grow flex flex-row items-start">
      <Image src={item.userData?.profileImage}/>
      <p>{item.userData?.username || item.address}</p>
        <p>{item.content}</p>
      </div>

      <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
        <Button radius="full" onClick={tip} color={'primary'} className="w-[220px]">Tip</Button>
      </div>
    </div>
}