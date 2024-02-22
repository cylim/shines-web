import { random } from "@/utils/random";
import { Video } from "@/utils/scheme";
import { Image } from "@nextui-org/react";
import { UserInfo } from "../user/UserInfo";


export const VideoScrollListItem = ({ item, index }: { item: Video, index: number }) => (
  <section className={`scroll-item scroll-${index} flex flex-col gap-4 justify-center items-center`}>
    <div className="w-[540px]" >
      <UserInfo userAddress={item.address} />
    </div>
    <div className="flex flex-col">
      {item.type === 'gif'
        ? <Image src={item.url} className={'max-w-[540px] max-h-[calc(100vh-320px)] w-[540px] h-[540px]'} />
        : <video controls src={item.url} className={'max-w-[540px] max-h-[calc(100vh-320px)] w-[540px] h-[540px]'} />}
    </div>

    <div className="flex flex-row text-3xl gap-4 w-[540px] pt-2">
      <p className={'text-3xl'}>💕 {random(10000)}</p>
      <p className={'text-3xl'}>💬 {random()}</p>
      <p className={'text-3xl'}>🔗 {random(30)}</p>
    </div>
  </section>
)