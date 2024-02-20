import { Video } from "@/utils/scheme";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VideoScrollListItem } from "./VideoScrollListItem";
import { fakedata } from "@/utils/fakedata";

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
  /> : <div className={'scroll-container flex flex-col w-[100%]'}> 
     {videos.map(renderItem)}
  </div>
};

export default VideoScrollList;