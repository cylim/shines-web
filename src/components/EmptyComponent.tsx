import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"


export const EmptyComponent = ({ text= undefined, overrideStyle = ""}: any) => {
  const {isConnected} = useAccount()

  if (!isConnected) {
    return <div className={'flex flex-col items-center justify-center gap-3 py-4'}>
      <p className={'text-6xl'}>🔮</p>
      <p className={'text-lg'}>Connect to see details</p>
      <ConnectButton />
    </div>
  }
  
  return <div className={`flex flex-col items-center justify-center gap-3 py-4 ${overrideStyle}`}>
    <p className={'text-6xl'}>🥹</p>
    <p className={'text-lg'}>{!!text ? text : 'This person is too lazy to leave any stuffs here!'}</p>
  </div>
}