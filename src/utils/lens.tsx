import { LensClient, development, IStorageProvider } from "@lens-protocol/client";
import { useCallback, useEffect, useState } from "react";
import { WalletClient } from "viem";
import { polygonMumbai } from "viem/chains";
import { useWalletClient } from "wagmi";

class LocalStorageProvider implements IStorageProvider {
  getItem(key: string) {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}

export async function getAuthenticatedClient(walletClient: WalletClient) {
  const lensClient = new LensClient({
    environment: development,
    storage: new LocalStorageProvider()
  });

  const address = walletClient.account?.address;

  if(!address) { return undefined }
  
  let selected = undefined
  do {
    const profiles = await lensClient.profile.fetchAll({ where: { ownedBy: [address] } })
    selected = profiles.items?.[0].id
    if(!selected) {
      await lensClient.wallet.createProfile({ to: address })
    }
  } while(!selected)

  try {
    const id = await lensClient.authentication.getProfileId()
    if(!id) throw new Error('unauthenticated')
  } catch {
    const { id, text } = await lensClient.authentication.generateChallenge({
      signedBy: address,
      for: selected,
    });
    const signature = await walletClient.signMessage({ account: address, message: text });
  
    lensClient.authentication.authenticate({ id, signature });
  }

  return lensClient;
}


export const useLens = () => {
  const { data: walletClient } = useWalletClient({ chainId: polygonMumbai.id })
  // const { data: lens } = useSocial(address)
  const [client, setClient] = useState<LensClient | undefined>(undefined)

  const setup = useCallback(async () => {
    if (!walletClient) { return }
    const c = await getAuthenticatedClient(walletClient)
    setClient(c)

  }, [walletClient?.account.address])

  useEffect(() => {
    setup()
  }, [walletClient])
  
  return client
}