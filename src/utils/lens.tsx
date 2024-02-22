import { LensClient, development, IStorageProvider } from "@lens-protocol/client";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
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

  let id: string | null = null
  try {
    id = await lensClient.authentication.getProfileId()
    if(!id) throw new Error('unauthenticated')
  } catch {
    const { id, text } = await lensClient.authentication.generateChallenge({
      signedBy: address,
      for: selected,
    });
    const signature = await walletClient.signMessage({ account: address, message: text });

    await lensClient.authentication.authenticate({ id, signature });
  }

  try {
    const profile = await lensClient.profile.fetch({ forProfileId: id });
    console.log('profile', profile)

    if (profile?.signless) {
      return lensClient
    } else {
      const typedDataResult = await lensClient.profile.createChangeProfileManagersTypedData({
        approveSignless: true,
      });
      const { id, typedData } = typedDataResult.unwrap();
      console.log(typedData)

      // sign with the wallet
      const signedTypedData = await walletClient.signTypedData({
        account: address,
        // @ts-ignore
        domain: typedData.domain,
        primaryType: 'ChangeDelegatedExecutorsConfig',
        // @ts-ignore
        types: typedData.types,
        message: typedData.value
      });
      console.log('signedTypedData', signedTypedData)

      // broadcast onchain
      const broadcastOnchainResult = await lensClient.transaction.broadcastOnchain({
        id,
        signature: signedTypedData,
      });
      console.log('broadcastOnchainResult', broadcastOnchainResult)

      const onchainRelayResult = broadcastOnchainResult.unwrap();
      if (onchainRelayResult.__typename === "RelayError") {
        console.log(`Something went wrong`);
        return undefined;
      }

      console.log(
        `Successfully changed profile managers with transaction with id ${onchainRelayResult}, txHash: ${onchainRelayResult.txHash}`
      );
      return lensClient

    }
  } catch(err: any) {
    toast('You can manually turn on manager at: https://testnet.hey.xyz/settings/manager',)
    toast('Unable to handle signless')
  }
    
  return lensClient;
}


export const useLens = () => {
  const { data: walletClient } = useWalletClient({ chainId: polygonMumbai.id })
  // const { data: lens } = useSocial(address)
  const [client, setClient] = useState<LensClient | undefined>(undefined)

  const setup = useCallback(async () => {
    if (!walletClient?.account.address) { return undefined }
    const c = await getAuthenticatedClient(walletClient)
    setClient(c)

  }, [walletClient?.account.address])

  useEffect(() => {
    if (walletClient?.account.address)
    setup()
  }, [walletClient])
  
  return client
}