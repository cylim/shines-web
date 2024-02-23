import { random } from "@/utils/random";
import { Feed } from "@/utils/scheme";
import { UserInfo } from "../user/UserInfo";
import { formatEther } from "viem";
import { LensClient } from "@lens-protocol/client";

export const VideoScrollListItem = ({ item, index, lensClient }: { item: Feed, index: number, lensClient: LensClient }) => {
  
  const handleQuote = async () => {
    // await lensClient.publication.quoteOnchain({
    //   quoteOn: item.lensId,
    //   contentURI: metadata
    // })
  }
  
  return(
  <section className={`scroll-item scroll-${index} flex flex-col gap-4 justify-center items-center`}>
    <div className="w-[540px]" >
      <UserInfo userAddress={item.address} />
    </div>
    <div className="flex flex-row gap-4 w-[540px]">
      <p className={'text-lg text-gray-300'}>{item.message}</p>
    </div>
    <div className="flex flex-col">
      <video controls src={item.videoUrl} className={'max-w-[540px] max-h-[calc(100vh-320px)] w-[540px] h-[540px]'} />
    </div>
    
    <div className="flex flex-col w-[540px] pt-2 rounded-lg bg-gray-400 px-4 py-2 ">
      <p className={'text-xl text-black'}>ID: {item.bidId}, Prize: {formatEther(BigInt(item.amount)).toString()} MATIC</p>
      <a className={'text-sm text-black'} target="_blank" href={`https://mumbai.polygonscan.com/tx/${item.txHash}`}>Verifiedable via Polygonscan</a>
    </div>

    <div className="flex flex-row text-2xl gap-4 w-[540px] pt-2">
      <p className={'text-2xl'}>💕 {random(10000)}</p>
      <p className={'text-2xl'}>💬 {random()}</p>
      <p className={'text-2xl cursor-pointer'} onClick={handleQuote}>🔗 {random(30)}</p>
    </div>

  </section>
)}