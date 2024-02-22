
'use client'
import { Button, Link } from "@nextui-org/react";
import { Video } from "@/utils/scheme";
import NextLink from 'next/link'
import { LensClient, isRelaySuccess } from "@lens-protocol/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useAccount } from "wagmi";
import { PINATA_JWT } from "@/utils/env";
import { shortVideo, MetadataLicenseType, MediaVideoMimeType } from '@lens-protocol/metadata';


export const VideoListItem = ({ item, lensClient }: { item: Video, lensClient: LensClient | undefined }) => {
  const { address } = useAccount()

  const share = async () => {
    if (!lensClient || !(await lensClient?.authentication.isAuthenticated())) { 
      toast('Lens unauthenticated')
      return
     }

    const metadata = shortVideo({
       title: `AI short video of ${await lensClient.authentication.getProfileId()}`,
       video: {
         item: item.url,
         type: MediaVideoMimeType.MP4,
         cover: item.url,
         duration: 60,
         altTag: `AI short video of ${await lensClient.authentication.getProfileId()}`,
         license: MetadataLicenseType.CCO,
       }
     })

    const dataToUpload = JSON.stringify({
      pinataMetadata: {
        name: item.id,
        keyvalues: {
          owner: item.address
        }
      },
      pinataContent: metadata
    });
    try {
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data: dataToUpload,
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "Content-Type": "application/json"
        },
      });

      const ipfsUrl = `ipfs://${resFile.data.IpfsHash}`;
      console.log('IPFS metadata:', ipfsUrl)

      const result = await lensClient.publication.postOnchain({
        contentURI: ipfsUrl,
      });

      const resultValue = result.unwrap();
      if (!isRelaySuccess(resultValue)) {
        toast('posted failed')
        console.warn(`Something went wrong`, resultValue);
        return;
      }

      console.log(`Transaction was successfully broadcasted with txId ${resultValue.txId}`);
      console.log(`Details:`, resultValue)
      toast('posted')
    } catch (e) {
      console.log("Error uploading data ", e);
    }
  }

  return  <div className="flex flex-col gap-2 border-slate-500 border-1 p-2 rounded-xl">
      <div className="font-semibold text-2xl grow flex flex-row items-start">
        <video controls src={item.url} height={240} width={240} className={'max-h-[240px] max-w-[240px] min-h-[240px] min-w-[240px]'} />
      </div>

      <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
        {
          address === item.address
            ? <Button radius="full" onClick={share} color={'primary'} className="w-[220px]">Share</Button>
            : null
        }      </div>
    </div>

}