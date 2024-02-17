import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"


export const EmptyComponent = () => {
  const {isConnected} = useAccount()

  if (!isConnected) {
    return <div className={'flex flex-col items-center justify-center gap-4 pt-4'}>
      <p className={'text-9xl'}>🔮</p>
      <p className={'text-lg'}>Connect to see details</p>
      <ConnectButton />
    </div>
  }
  
  return <div className={'flex flex-col items-center justify-center gap-4 pt-4'}>
    <p className={'text-9xl'}>🥹</p>
    <p className={'text-lg'}>It is empty here, add some stuffs!</p>
  </div>
}