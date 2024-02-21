
'use client'
import {  Button, Link } from "@nextui-org/react";
import { Video } from "@/utils/scheme";
import NextLink from 'next/link'
import { LensClient, PublicationMetadataLicenseType, isRelaySuccess } from "@lens-protocol/client";
import toast from "react-hot-toast";
import { polygonMumbai } from 'viem/chains'
import { useEthersSigner } from "@/utils/ethers";

export const VideoListItem = ({ item, lensClient }: { item: Video, lensClient: LensClient | undefined }) => {
  const share = async () => {
    if (!lensClient ) { return }

    const metadata = {
      title: 'Great video!',
      video: {
        item: item.url,
        type: 'video/mp4',
        cover: item.url,
        duration: 60,
        altTag: `AI short video of ${await lensClient.authentication.getProfileId()}`,
        license: PublicationMetadataLicenseType.Cco,
      }
    }

    const dataToUpload = JSON.stringify(metadata);
    try {
      // const receipt = await irys.upload(dataToUpload);
      // const metadataUrl = `https://gateway.irys.xyz/${receipt.id}`
      // console.log(`Data uploaded ==> https://gateway.irys.xyz/${metadataUrl}`);
      
      // const result = await lensClient.publication.postOnchain({
      //   contentURI: metadataUrl, // or arweave
      // });
      
      // const resultValue = result.unwrap();
      // if (!isRelaySuccess(resultValue)) {
      //   toast('posted failed')
      //   console.warn(`Something went wrong`, resultValue);
      //   return;
      // }
      
      console.log(`Transaction was successfully broadcasted with txId ${resultValue.txId}`);
      toast('posted')
    } catch (e) {
      console.log("Error uploading data ", e);
    }
  }

  return <Link as={NextLink} href={`#videos/${item.id}`}>
    <div className="flex flex-col gap-2 border-slate-500 border-1 p-2 rounded-xl">
      <div className="font-semibold text-2xl grow flex flex-row items-start">
        <video controls src={item.url} height={240} width={240} className={'max-h-[240px] max-w-[240px] min-h-[240px] min-w-[240px]'} />
      </div>

      <div className={'flex flex-col flex-wrap justify-center gap-2 items-center'}>
        <Button radius="full" onClick={share} color={'primary'} className="w-[220px]">Share</Button>
      </div>
    </div>

  </Link>
}