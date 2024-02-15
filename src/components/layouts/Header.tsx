"use client";
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Header = async () => {

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
      <ConnectButton />
    </div>
  </header>
}

export default Header