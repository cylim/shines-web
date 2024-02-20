"use client"
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { isValidAddr, truncate } from '@/utils/string';
import { Avatar, Video } from '@/utils/scheme';
import { AvatarList } from '@/components/avatar/AvatarList';
import { list as listDoc } from "@/utils/firebaseHelper";
import { VideoList } from '@/components/video/VideoList';
import { useQuery } from '@tanstack/react-query';
import { Link, Spacer, User } from '@nextui-org/react';
import NextLink from 'next/link'
import { useAccount } from 'wagmi';
import { Sidebar } from '../layouts/Sidebar';

const sidebar = [
  { title: 'Avatars', url: 'avatars' },
  { title: 'Videos', url: 'videos' },
  { title: 'Posts', url: 'posts' },
]

export const UserContainer = () => {
  const { address, isConnected } = useAccount()
  const params = useParams()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get('tab') || undefined)
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

  const list = async () => {
    if (!isValidAddr(userAddress)) return

    refetchAvatars()
    refetchVideos()
  };

  useEffect(() => {
    if (isValidAddr(userAddress)) {
      list()
    }

  }, [userAddress])


  return (
    <div className="flex flex-row justify-between w-[100%] gap-4">
      <Sidebar items={sidebar} fallback={'home'}>
        <User classNames={{ wrapper: 'w-[100%]', name: 'text-lg', base: 'mb-4 ' }} name={truncate(userAddress, 6)} description={(
          <div className={'flex flex-row items-center gap-2'}>
            <Link href={`https://mumbai.polygonscan.com/address/${userAddress}`} size="md" isExternal>
              Explorer
            </Link>
            {isConnected && userAddress !== address && <span>|</span>}
            {isConnected && userAddress !== address && <Link as={NextLink} href={`?to=${userAddress}`} size="md">
              Chat
            </Link>}
          </div>
        )} />
      </Sidebar>
      <div className='flex flex-col justify-start w-[100%] overflow-y-scroll'>
        {tab === undefined || tab === 'avatars' ? <>
          <h1 className='pt-12'>Avatars</h1>
          <AvatarList items={avatars} loading={isLoadingAvatars || isFetchingAvatars} />
        </> : null}
        {tab === undefined || tab === 'videos' ? <>
          <h1 className='pt-12'>Videos</h1>
          <VideoList items={videos} loading={isLoadingVideos || isFetchingVideos} />
        </> : null}
        {tab === undefined || tab === 'posts' ? <>
          <h1 className='pt-12'>Posts</h1>
          <VideoList items={videos} loading={isLoadingVideos || isFetchingVideos} />
        </> : null}

        <Spacer y={40} />
      </div>
    </div>
  )
}

export default UserContainer;
