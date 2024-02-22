import { Video } from "@/utils/scheme";
import Image from "next/image";
import { useEffect, useState } from "react";
import { VideoScrollListItem } from "./VideoScrollListItem";
import { fakedata } from "@/utils/fakedata";
import { Sidebar } from "@/components/layouts/Sidebar";
import { list as listDoc } from "@/utils/firebaseHelper";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const sidebar = [
  { title: 'Home', url: 'home' },
  { title: 'Popular', url: 'popular' },
  { title: 'Trending', url: 'trending' },
]

const VideoScrollList = () => {
  const searchParams = useSearchParams()
  const { data: videos = fakedata, isLoading: isLoadingVideos, isFetching: isFetchingVideos, refetch: refetchVideos } = useQuery({
    enabled: true,
    queryKey: ['videos', searchParams.get('tab') || 'home'],
    queryFn: async () => ((await listDoc("videos") as Video[]) || []).sort(() => Math.random() - 0.5),
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    refetchVideos()
  }, [searchParams]);

  const renderItem = (item: Video, index: number) => {
    return <VideoScrollListItem key={item.id} item={item} index={index} />
  }

  return <div className="flex flex-row justify-between w-[100%] items-center">
    <Sidebar items={sidebar} fallback={'home'} />
    <div className={'scroll-container flex flex-col w-[100%] items-center'}>
      {(isLoadingVideos || isFetchingVideos) ? <Image
        src="/shine.png"
        alt="Shine Logo"
        width={280}
        height={280}
        priority /> : videos.map(renderItem)}
    </div>
  </div>
};

export default VideoScrollList;