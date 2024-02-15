"use client"
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { usePathname, useRouter } from 'next/navigation';
import { useBreakpoint } from '@/utils/useBreakpoints';

enum TabsEnum {
  Avatar = 'avatars',
  Videos = 'videos'
}

const tabs = [
  { title: 'Avatar', value: TabsEnum.Avatar },
  { title: 'Videos', value: TabsEnum.Videos },
]

export const Header = async () => {
  const { isConnected } = useAccount()
  const router = useRouter()
  const pathname = usePathname()
  const { isBelowSm } = useBreakpoint("sm");

  const setActiveTab = (val: string) => {
    router.push(`/${val}`)
  }

  const renderMenu = () => {
    return <div className="navigation flex-row items-center justify-start flex flex-1">
      {tabs.map((t) => (
        <button key={`${t.title}-tab`} onClick={() => setActiveTab(t.value)} className={`navigation-link ${pathname === t.value ? 'active' : ''}`}>{t.title}</button>
      ))}
    </div>
  }

  return <header className={'py-4 flex flex-col gap-2 px-2 lg:px-4'}>
    <div className={'flex flex-row items-center justify-between w-full'}>
        <Image
          src="/shine.png"
          alt="Shine Logo"
          className="dark:invert"
          width={48}
          height={48}
          priority
        />
      {isConnected ? renderMenu() : null}
        <ConnectButton showBalance={!isBelowSm} accountStatus={isBelowSm ? 'avatar' :"full"} />
    </div>
  </header>
}

export default Header