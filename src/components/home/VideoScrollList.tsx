import { Video } from "@/utils/scheme";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VideoScrollListItem } from "./VideoScrollListItem";
import { fakedata } from "@/utils/fakedata";
import { Sidebar } from "@/components/layouts/Sidebar";

const sidebar = [
  {title: 'Home', url: 'home'},
  {title: 'Popular', url: 'popular'},
  {title: 'Trending', url: 'trending'},
]

const VideoScrollList = () => {
  const [videos, setVideos] = useState(fakedata);

  useEffect(() => {
  }, []);

  const renderItem = (item: Video, index: number) => {
    return <VideoScrollListItem key={item.id} item={item} index={index} />
  }

  return !videos.length ? <Image
    src="/shine.png"
    alt="Shine Logo"
    width={280}
    height={280}
    priority
  /> : <div className="flex flex-row justify-between w-[100%]">
      <Sidebar items={sidebar} fallback={'home'} />
    <div className={'scroll-container flex flex-col w-[100%]'}> 
      {videos.map(renderItem)}
    </div>
  </div> 
};

export default VideoScrollList;