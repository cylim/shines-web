'use client'
import { Button, Image } from "@nextui-org/react";
import { Prompt } from "@/utils/scheme";
import toast from "react-hot-toast";
import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import { ShineAPI } from "@/utils/apis/shine";
import { insertRow, upload } from "@/utils/firebaseHelper";

export const AvatarPromptItem = ({ item, file }: { item: Prompt, file: File | undefined }) => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [image, setImage] = useState(item?.generatedImageURL)
  const { sendTransactionAsync } = useSendTransaction()

  const generate = useCallback(async () => {
    const base64Img = await ShineAPI.avatarWithPrompt({ prompt: item.content, file })
    const url = await upload(item.id, base64Img)
    setImage(url)
    await insertRow('prompts', [item.id], { generatedImageURL: url })
  }, [image, file?.size])

  useEffect(() => {
    if (!image && !!file?.size) {
      generate()
    }

  }, [image, file?.size])

  const tip = async () => {
    try {
      const hash = await sendTransactionAsync({ to: item.address as `0x${string}`, value: parseEther('0.0008') })
      toast.success(`Tx: ${hash}`)
      setShowPrompt(true)
    } catch {
      toast.error(`Declined`)
    } finally {
      setShowPrompt(true)
    }
  }

  return <div className="flex flex-1 flex-col gap-4 border-slate-500 border-1 p-3 rounded-lg w-[100%] text-black">
    <div className="font-semibold text-2xl grow flex flex-col items-start gap-4">
      <div className="flex flex-row gap-2 justify-between items-center w-[100%]">
        <div className="flex flex-row gap-2 items-center">
          <Image src={item.profileImage} height={36} width={36} className="rounded" />
          <span>{item.displayName || item.username || item.address}</span>
        </div>
        <div>
          <span className={'text-sm'}>{new Date(item.timestamp?.seconds * 1000).toLocaleDateString()} {new Date(item.timestamp?.seconds * 1000).toLocaleTimeString()}</span>
        </div>
      </div>
      <div className={'flex flex-col flex-wrap justify-center gap-2 items-center w-[100%] py-4'}>
        {!!image ? <Image src={image} height={180} width={180} /> : 
          <CircularProgress size="lg" aria-label="Loading..." label="Generating avatar..." />
         }
      </div>
    </div>

    <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
      <Button radius="full" onClick={tip} color={'primary'} className="w-[220px]">Tip</Button>
      {showPrompt ? <p>{item.content}</p> : <p>Tip to show prompt</p>}
    </div>
  </div>
}