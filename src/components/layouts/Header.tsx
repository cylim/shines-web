"use client"
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { usePathname, useRouter } from 'next/navigation';
import { useBreakpoint } from '@/utils/useBreakpoints';
import { Link } from '@nextui-org/react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';

const ChatComponent = dynamic(() => import('@/components/chat/ChatMenu'), {
  suspense: false,
  ssr: false,
})

enum TabsEnum {
  Avatar = '/avatars',
  Videos = '/videos',
  Profile = '/u/[address]'
}

const tabs = [
  // { title: 'Avatar', value: TabsEnum.Avatar },
  // { title: 'Videos', value: TabsEnum.Videos },
  { title: 'Profile', value: TabsEnum.Profile },
]

export const Header = async () => {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const pathname = usePathname()
  const { isBelowSm } = useBreakpoint("sm");

  const setActiveTab = (val: string) => {
    router.push(val.replace('[address]', address as string))
  }

  const renderMenu = () => {
    return <div className="navigation flex-row items-center justify-start flex flex-1">
      {tabs.map((t) => (
        <button
          key={`${t.title}-tab`} 
          onClick={() => setActiveTab(t.value)} 
          className={`navigation-link text-2xl  ${pathname.includes(t.value) ? 'text-blue-400' : 'text-white'}`}>
            {t.title}
          </button>
      ))}
    </div>
  }

  return <header className={'pb-2 flex flex-col gap-2 px-2 lg:px-4'}>
    <div className={'flex flex-row items-center justify-between w-full'}>
      <Link as={NextLink} href={'/'} prefetch={true}>
        <Image
          src="/shine.png"
          alt="Shine Logo"
          width={72}
          height={72}
          priority
        />
      </Link>
      {isConnected ? renderMenu() : null}
      <div className={'flex flex-row gap-4'}>
        {isConnected ? <ChatComponent /> : null}
        <ConnectButton showBalance={!isBelowSm} accountStatus={isBelowSm ? 'avatar' :"full"} />
      </div>
    </div>
  </header>
}

export default Header