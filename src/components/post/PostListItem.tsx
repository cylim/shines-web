
'use client'
import { Button } from "@nextui-org/react";
import { Post } from "@/utils/scheme";
import { LensClient } from "@lens-protocol/client";
import toast from "react-hot-toast";
import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { useParams } from "next/navigation";
import { insertRow } from "@/utils/firebaseHelper";
import axios from "axios";
import Contracts from "@/contracts";
import { parseEther } from "viem";

export const PostListItem = ({ item, lensClient }: { item: Post, lensClient: LensClient | undefined }) => {
  const { address } = useAccount()
  const { writeContractAsync } = useWriteContract()
  const publicClient = usePublicClient()
  const params = useParams()

  const isOwner = params.address === address

  const add = async () => {
    if (!publicClient) { return }
    const bidAmount = prompt("Enter bid amount (Matic). e.g. 0.1") || "unknown"
    if (!(+bidAmount)) {
      return
    }
    try {
    // const bids = await axios.get('/tako/bids')
    // console.log(bids)
    const res = await axios.post('/tako/bids', {
      data: {
        contentId: item.id,
        bidAmount: bidAmount,
        from: address
      }
    })
    if (!!res.data?.abiData) {
      const contract = Contracts['Polygon Mumbai'].takoOpenLensHub;
      const ethValue = parseEther(bidAmount)
      const funcConfig = {
        account: address as `0x${string}`,
        address: contract.address,
        abi: contract.abi,
        functionName: 'bid',
        args: [res.data?.abiData, 0, '0x'],
      }

      console.log(ethValue)

      const tx = await writeContractAsync({
        ...funcConfig, 
        // @ts-expect-error
        value: ethValue
      })
      console.log(tx)

      // const { hash } = await walletClient.writeContract(request)
      // return { trx, status: 'success' }
    }

    toast('Adding Bid')
    // const key = `${address}-${+new Date()}`
    // const bidId = ""
    // await insertRow("posts", [key], {
    //   lensId: item.id,
    //   bidId: bidId,
    //   id: key,
    //   address: address,
    //   videoUrl: item.metadata.asset.video.raw.uri,
    //   message: item.metadata.title,
    //   amount: bidAmount
    // })
    toast('completed')
    } catch (err: any) {
      console.log(err.message)
    }
  }

  return <div className="flex flex-col gap-2 border-slate-500 border-1 p-2 rounded-xl max-w-[256px]">
    <div>
      <p>{item.metadata.title}</p>
    </div>
    <div className="font-semibold text-2xl grow flex flex-row items-start">
      <video controls src={item.metadata.asset.video.raw.uri} height={240} width={240} className={'max-h-[240px] max-w-[240px] min-h-[240px] min-w-[240px]'} />
    </div>


    {isOwner && <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
      <Button radius="full" onClick={add} color={'primary'} className="w-[220px]">Add Bid</Button>
    </div>}
  </div>
}