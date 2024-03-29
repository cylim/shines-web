"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { isValidAddr } from '@/utils/string';
import { Avatar, Post, Video } from '@/utils/scheme';
import { AvatarList } from '@/components/avatar/AvatarList';
import { list as listDoc } from "@/utils/firebaseHelper";
import { VideoList } from '@/components/video/VideoList';
import { useQuery } from '@tanstack/react-query';
import { Spacer } from '@nextui-org/react';
import { Sidebar } from '../layouts/Sidebar';
import { UserInfo } from './UserInfo';
import { useLens } from '@/utils/lens';
import { PublicationMetadataMainFocusType, PublicationType } from '@lens-protocol/client';
import { PostList } from '../post/PostList';

const sidebar = [
  { title: 'Avatars', url: 'avatars' },
  { title: 'Videos', url: 'videos' },
  { title: 'Posts', url: 'posts' },
]

export const UserContainer = () => {
  const lensClient = useLens()
  const params = useParams()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') || undefined)
  const [posts, setPosts] = useState<Post[]>([])
  const userAddress = params?.address as string
  const { data: avatars = [], isLoading: isLoadingAvatars, isFetching: isFetchingAvatars, refetch: refetchAvatars } = useQuery({
    enabled: !!isValidAddr(userAddress),
    queryKey: ['user', userAddress, 'avatars'],
    queryFn: async () => (await listDoc("avatars") as Avatar[]).filter(v => v.address === userAddress) || [],
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const { data: videos = [], isLoading: isLoadingVideos, isFetching: isFetchingVideos, refetch: refetchVideos } = useQuery({
    enabled: !!isValidAddr(userAddress),
    queryKey: ['user', userAddress, 'videos'],
    queryFn: async () => (await listDoc("videos") as Video[]).filter(v => v.address === userAddress) || [],
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const t = searchParams.get('tab') || undefined
    setTab(t)
  }, [searchParams])

  useEffect(() => {
    window.addEventListener("reloadUser", list);

    return () => {
      window.removeEventListener("reloadUser", list);
    };
  }, []);

  const getLensPosts = useCallback(async () => {
    const id = await lensClient?.authentication.getProfileId()
    console.log('lens profile id', id)
    if(!id) { return }
    const res = await lensClient?.publication.fetchAll({ where: { 
      from: [id],
      publicationTypes: [PublicationType.Post], 
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.ShortVideo]
      }
    }})
    console.log('getLensPosts', res?.items)
    setPosts((res?.items || []) as any)

  }, [lensClient])

  const list = async () => {
    if (!isValidAddr(userAddress)) return

    refetchAvatars()
    refetchVideos()
    getLensPosts()
  };

  useEffect(() => {
    if (lensClient) {
      getLensPosts()
    }

  }, [lensClient])


  return (
    <div className="flex flex-row justify-between w-[100%] gap-4">
      <Sidebar items={sidebar} fallback={'home'}>
        <UserInfo userAddress={userAddress} />
      </Sidebar>
      <div className='flex flex-col justify-start w-[100%] overflow-y-scroll max-h-screen'>
        {tab === undefined || tab === 'avatars' ? <>
          <h1 className='pt-12'>Avatars</h1>
          <AvatarList items={avatars} loading={isLoadingAvatars || isFetchingAvatars} />
        </> : null}
        {tab === undefined || tab === 'videos' ? <>
          <h1 className='pt-12'>Videos</h1>
          <VideoList items={videos} loading={isLoadingVideos || isFetchingVideos} lensClient={lensClient} />
        </> : null}
        {tab === undefined || tab === 'posts' ? <>
          <h1 className='pt-12'>Lens</h1>
          <PostList items={posts} loading={isLoadingVideos || isFetchingVideos} lensClient={undefined} />
        </> : null}
        <Spacer y={72} />
      </div>
    </div>
  )
}

export default UserContainer;
