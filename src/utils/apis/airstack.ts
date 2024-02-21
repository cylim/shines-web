import { useQuery } from "@airstack/airstack-react";


interface QueryResponse {
  data: Data | null;
  loading: boolean;
  error: Error | null;
}

interface Data {
  Wallet: Wallet;
}

interface Error {
  message: string;
}

interface Social {
  dappName: "lens" | "farcaster";
  profileTokenIdHex: string;
}

interface Wallet {
  socials: Social[];
  addresses: string[];
}

const query = `
query MyQuery {
  Wallet(input: {identity: "$identity", blockchain: ethereum}) {
    socials {
      dappName
      profileTokenIdHex
    }
  }
}
`;


export function useSocial(address: `0x${string}` | undefined) {
  const { data, loading, error }: QueryResponse = useQuery<Data>(query.replace('$identity', address || ""), {}, { cache: false });

  return { data: data?.Wallet.socials.find(s => s.dappName === 'lens'), loading, error }
}
