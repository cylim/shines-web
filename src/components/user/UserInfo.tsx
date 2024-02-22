import { truncate } from "@/utils/string"
import { User, Link } from "@nextui-org/react"
import NextLink from "next/link"
import { useAccount } from "wagmi"


export const UserInfo = ({ userAddress, short = false }: { userAddress: string, short?: boolean }) => {
  const { address, isConnected} = useAccount()

  if(short) {
    return <User name={truncate(userAddress, 4)} classNames={{ name: 'font-semibold' }} />
  }

  return <User classNames={{ wrapper: 'w-[100%]', name: 'text-lg', base: 'mb-4 ' }} name={truncate(userAddress, 6)} description={(
    <div className={'flex flex-row items-center gap-2'}>
      <Link href={`https://mumbai.polygonscan.com/address/${userAddress}`} size="md" isExternal>
        Explorer
      </Link>
      {isConnected && userAddress !== address && <span>|</span>}
      {isConnected && userAddress !== address && <Link as={NextLink} href={`?to=${userAddress}`} size="md" prefetch={false}>
        Chat
      </Link>}
    </div>
  )} />
}