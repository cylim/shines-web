
'use client'
import { Button } from "@nextui-org/react";
import { Post } from "@/utils/scheme";
import { LensClient } from "@lens-protocol/client";
import toast from "react-hot-toast";
import { useAccount, usePublicClient, useSendTransaction, useWaitForTransactionReceipt, } from "wagmi";
import { useParams } from "next/navigation";
import { insertRow } from "@/utils/firebaseHelper";
import axios from "axios";
import Contracts from "@/contracts";
import { parseEther } from "viem";
import { useCallback, useEffect, useState } from "react";
import { truncate } from "@/utils/string";
import { decodeAbiParameters, parseAbiParameters, decodeEventLog } from 'viem'

export const PostListItem = ({ item, lensClient }: { item: Post, lensClient: LensClient | undefined }) => {
  const [txHash, setTxHash] = useState<`0x${string}`| undefined>(undefined)
  const { address } = useAccount()
  const { sendTransactionAsync } = useSendTransaction()
  const trxResult = useWaitForTransactionReceipt({ 
    hash: txHash
  })
  const params = useParams()
  const [loading, setLoading] = useState(false)

  const isOwner = params.address === address

  const saveToDb = useCallback(async() => {
    try{
      if (!txHash || !trxResult.data) { throw new Error('No data')}
      setLoading(true)
      const topic = "0xb3dbdb6cbc7bd86a1b745e6249d13414fcf1075914d9c9bec160aefc4ac4ac1a"
      const data = trxResult.data.logs?.[1].data || '0x'

      const res = decodeEventLog({
        data: data as `0x${string}`,
        topics: [topic],
        abi: Contracts['Polygon Mumbai'].takoOpenLensHub.abi,
        eventName: 'addBidEvent'
      })

      const { bidAmount = 0 } = res.args?.content || {}
      toast('Adding Bid into post')
      const key = `${address}-${+new Date()}`
      const bidId = res.args?.index.toString()
      await insertRow("posts", [key], {
        lensId: item.id,
        bidId: bidId,
        id: key,
        address: address,
        videoUrl: item.metadata.asset.video.raw.uri,
        message: item.metadata.title,
        amount: bidAmount?.toString(),
        txHash: txHash
      })
      toast.dismiss()
      toast('completed')
    } catch (err: any) {
      toast.dismiss()
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }, [txHash, trxResult.data, trxResult.error])

  useEffect(() => {
    if (!trxResult.data && !trxResult.error) return
    console.log(trxResult.data)
    console.log(trxResult.error)
    saveToDb()
  }, [trxResult.data, trxResult.error])

  const add = async () => {
    try {
      const bidAmount = prompt("Enter bid amount (Matic). e.g. 0.1") || "unknown"
      if (!(+bidAmount)) { throw new Error('Bid Amount malformatted') }

      setLoading(true)
      const res = await axios.post('/tako/bids', {
        data: {
          contentId: item.id,
          bidAmount: bidAmount,
          from: address
        }
      })
      if (!res.data?.abiData) { throw new Error('Unable to get encodedFuncationData') }
      const contract = Contracts['Polygon Mumbai'].takoOpenLensHub;
      const ethValue = parseEther(bidAmount)

      const txHash = await sendTransactionAsync({
        account: address as `0x${string}`,
        to: contract.address,
        data: res.data?.abiData,
        value: ethValue
      })
      console.log(txHash)
      toast(`Trx submitted: ${truncate(txHash, 6)}`)
      setTxHash(txHash)
      toast('Waiting for transaction results....')
    } catch (err: any) {
      setLoading(false)
      toast.error(err.message)
      console.warn(err.message)
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
      <Button radius="full" onClick={add} color={'primary'} className="w-[220px]" isLoading={loading}>Add Bid</Button>
    </div>}
  </div>
}