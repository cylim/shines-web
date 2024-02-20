import { random } from "@/utils/random";
import { Video } from "@/utils/scheme";
import { Image } from "@nextui-org/react";


export const VideoScrollListItem = ({ item, index }: { item: Video, index: number }) => (
  <section className={`scroll-item scroll-${index} flex flex-col gap-4 justify-center`}>
      {/* <div className="p-2">
        <p className="line-clamp-2 hover:line-clamp-none"><strong>
          {video.snippet.title}</strong>
          {video.snippet.description}</p>
      </div> */}
      <div className="flex flex-row gap-4 justify-center">
        <div className="flex flex-col w-[100%] items-end">
          {item.type === 'gif' 
          ? <Image src={item.url} className={'max-w-[540px] h-[calc(100vh-320px)] w-auto'} /> 
            : <video controls src={item.url} className={'max-w-[540px] h-[calc(100vh-320px)] w-auto'} />}

        </div>
        <div className="flex flex-col w-[240px] justify-end text-3xl gap-4 ">
          <p>💕 {random(10000)}</p>
          <p>💬 {random()}</p>
          <p>🔗 {random(30)}</p>
        </div>
      </div>
  </section>
)