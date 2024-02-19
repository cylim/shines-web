"use client";
import { Avatar } from "@/utils/scheme";
import { useEffect } from "react";
import { list as listDoc } from "@/utils/firebaseHelper";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { AvatarList } from '@/components/avatar/AvatarList';
import dynamic from "next/dynamic";

const CreateModal = dynamic(async () => (await import('@/components/avatar/CreateModal')).CreateModal, { ssr: false })

export const AvatarContainer = () => {
  const { isConnected } = useAccount()
  const {address} = useAccount()
  const { data: avatars = [], isLoading: isLoadingAvatars, isFetching: isFetchingAvatars, refetch: refetchAvatars } = useQuery({
    enabled: !!address,
    queryKey: ['user', address, 'avatars'],
    queryFn: async () => (await listDoc("avatars") as Avatar[]).filter(v => v.address === address) || [],
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    window.addEventListener("reloadAvatar", list);

    return () => {
      window.removeEventListener("reloadAvatar", list);
    };
  }, []);

  const list = async () => {
    if (!address) return
    refetchAvatars()
  };

  return (
    <>
    <AvatarList items={avatars} loading={isLoadingAvatars || isFetchingAvatars} />
      {!isConnected ? null : <CreateModal />}
    </>
  )
}
