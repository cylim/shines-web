"use client"
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { isValidAddr, truncate } from '@/utils/string';
import { Avatar, Video } from '@/utils/scheme';
import { AvatarList } from '@/components/avatar/AvatarList';
import { list as listDoc } from "@/utils/firebaseHelper";
import { VideoList } from '@/components/video/VideoList';
import { useQuery } from '@tanstack/react-query';
import { Link, Spacer, User } from '@nextui-org/react';
import NextLink from 'next/link'
import { useAccount } from 'wagmi';

export const UserContainer = () => {
  const { address, isConnected } = useAccount()
  const params = useParams()
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
    <div className='flex flex-col justify-start w-[100%]'>
      <User classNames={{ wrapper: 'w-[100%]', name: 'text-lg' }} name={truncate(userAddress, 6)} description={(
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
      <h1 className='pt-12'>Avatars</h1>
      <AvatarList items={avatars} loading={isLoadingAvatars || isFetchingAvatars} />
      <h1 className='pt-12'>Videos</h1>
      <VideoList items={videos} loading={isLoadingVideos || isFetchingVideos} />
      <Spacer y={40} />
    </div>
  )
}

export default UserContainer;
