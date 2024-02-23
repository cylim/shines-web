import { random } from "@/utils/random";
import { Feed } from "@/utils/scheme";
import { UserInfo } from "../user/UserInfo";
import { parseEther } from "viem";

export const VideoScrollListItem = ({ item, index }: { item: Feed, index: number }) => (
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
    
    <div className="flex flex-row text-3xl gap-4 w-[540px] pt-2 ">
      <p className={'text-3xl'}>ID: {item.bidId}, Bid Amount {parseEther(item.amount).toString()} MATIC</p>
      <a className={'text-3xl'} href={`https://mumbai.polygonscan.com/tx/${item.txHash}`}>Verifiedable via Polygonscan</a>
    </div>

    <div className="flex flex-row text-3xl gap-4 w-[540px] pt-2">
      <p className={'text-3xl'}>💕 {random(10000)}</p>
      <p className={'text-3xl'}>💬 {random()}</p>
      <p className={'text-3xl'}>🔗 {random(30)}</p>
    </div>

  </section>
)