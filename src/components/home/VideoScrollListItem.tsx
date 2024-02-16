import { random } from "@/utils/random";
import { Video } from "@/utils/scheme";
import { Image } from "@nextui-org/react";


export const VideoScrollListItem = ({ item, index }: { item: Video, index: number }) => (
  <section className={`scroll-${index} flex flex-col h-[calc(100vh-65px)]`}>
    <div className="w-14">
      {/* <div className="rounded-full w-14 h-14 overflow-clip">
        <img src={video.snippet.thumbnails.default.url} alt="Avatar" />
      </div> */}
    </div>
    <div className="flex-1 flex flex-col gap-4">
      {/* <div className="p-2">
        <p className="line-clamp-2 hover:line-clamp-none"><strong>
          {video.snippet.title}</strong>
          {video.snippet.description}</p>
      </div> */}
      <div className="flex flex-row gap-4 justify-center">
        <div className="flex flex-col w-[100%] items-end">
          {item.type === 'gif' ? <Image src={item.url} className={'h-[calc(100vh-240px)] w-auto'} /> : <video src={item.url} autoPlay loop className={'h-[calc(100vh-240px)] w-auto'} />}

        </div>
        <div className="flex flex-col w-1/5 justify-end">
          <p>💕 {random()}</p>
          <p>💬 {random()}</p>
          <p>💾 {random()}</p>
          <p>🔗 {random()}</p>
        </div>
      </div>
    </div>
  </section>
)