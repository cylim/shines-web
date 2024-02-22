import { Feed } from "@/utils/scheme";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
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
  const { data: feeds = [], isLoading: isLoadingVideos, isFetching: isFetchingVideos, refetch: refetchVideos } = useQuery({
    enabled: true,
    queryKey: ['feeds', searchParams.get('tab') || 'home'],
    queryFn: async () => ((await listDoc("posts") as Feed[]) || []).sort(() => Math.random() - 0.5),
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  // useEffect(() => {
  //   refetchVideos()
  // }, [searchParams]);

  const renderItem = (item: Feed, index: number) => {
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
        priority /> : feeds.map(renderItem)}
    </div>
  </div>
};

export default VideoScrollList;