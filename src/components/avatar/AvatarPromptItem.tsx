'use client'
import { Button, Image } from "@nextui-org/react";
import { Prompt } from "@/utils/scheme";
import toast from "react-hot-toast";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export const AvatarPromptItem = ({ item, createdAt, updatedAt }: { item: Prompt, createdAt: bigint | undefined, updatedAt: bigint | undefined }) => {
  const { sendTransactionAsync } = useSendTransaction()  

  const tip = async () => {
    try {
      const hash = await sendTransactionAsync({ to: item.address as`0x${string}`, value: parseEther('0.0008') }) 
      toast.success(`Tx: ${hash}`)
    } catch {
      toast.error(`Declined`)
    }
  }

  return <div className="flex flex-1 flex-col gap-4 border-slate-500 border-1 p-3 rounded-lg w-[100%]">
      <div className="font-semibold text-2xl grow flex flex-col items-start gap-4">
        <div className="flex flex-row gap-2">
          <Image src={item.userData?.profileImage} height={36} width={36} className="rounded"/>
          <span>{item.userData?.username || item.address}</span>
        </div>
        <p>{item.content}</p>
      </div>

      <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
        <Button radius="full" onClick={tip} color={'primary'} className="w-[220px]">Tip</Button>
      </div>
    </div>
}