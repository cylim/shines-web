import { random } from "@/utils/random";
import { Feed } from "@/utils/scheme";
import { UserInfo } from "../user/UserInfo";
import { formatEther } from "viem";
import { LensClient, isRelaySuccess } from "@lens-protocol/client";
import toast from "react-hot-toast";
import axios from "axios";
import { PINATA_JWT } from "@/utils/env";
import { textOnly } from "@lens-protocol/metadata";
import { TakoAPI } from "@/utils/apis/tako";

export const VideoScrollListItem = ({ item, index, lensClient }: { item: Feed, index: number, lensClient: LensClient | undefined }) => {

  const handleQuote = async () => {
    if (!lensClient || !(await lensClient?.authentication.isAuthenticated())) {
      toast('Lens unauthenticated')
      return
    }

    const content = prompt('Add quote message for the post')
    if (!content) {
      return
    }
    toast('Generating metadata')
    const metadata = textOnly({
      content: content
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
    toast('Uploading Metadata')
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

    toast.dismiss()
    toast('Publishing to Lens')
    const result = await lensClient.publication.quoteOnchain({
      quoteOn: item.lensId,
      contentURI: ipfsUrl
    })
    const resultValue = result.unwrap();
    if (!isRelaySuccess(resultValue)) {
      toast('posted failed')
      console.warn(`Something went wrong`, resultValue);
      return;
    }

    console.log(`Transaction was successfully broadcasted with txId ${resultValue.txId}`);

    toast.dismiss()
    toast.success('Posted')

  }

  const submitToTako = async () => {
    const content = prompt('Quote post content id')
    if (!content) {
      return
    }
    const res = await TakoAPI.registerBid({ bidId: +item.bidId, contentId: content })
    if(res.data?.status === 'error') {
      toast.error(res.data?.error_msg)
    } else {
      toast.success('Registered for the prizes.')
    }
  }

  return (
    <section className={`scroll-item scroll-${index} flex flex-col gap-4 justify-center items-center`}>
      <div className="w-[540px]" >
        <UserInfo userAddress={item.address} />
      </div>
      <div className="flex flex-row gap-4 w-[540px]">
        <p className={'text-lg text-gray-300'}>{item.message}</p>
      </div>
      <div className="flex flex-col">
        <video controls src={item.videoUrl} className={'max-w-[540px] max-h-[calc(100vh-320px)] w-[540px] h-[540px]'} />
      </div>

      <div className="flex flex-row w-[540px] pt-2 space-between items-center rounded-lg bg-gray-400 px-4 py-2 ">
        <div className="flex flex-col w-[540px] ">
          <p className={'text-xl text-black'}>ID: {item.bidId}, Prize: {formatEther(BigInt(item.amount)).toString()} MATIC</p>
          <a className={'text-sm text-black'} target="_blank" href={`https://mumbai.polygonscan.com/tx/${item.txHash}`}>Verifiable via Polygonscan</a>
        </div>
        <div onClick={submitToTako}>+</div>
      </div>

      <div className="flex flex-row text-2xl gap-4 w-[540px] pt-2 cursor-pointer" onClick={handleQuote}>
        <p className={'text-2xl'}>💕 {random(10000)}</p>
        <p className={'text-2xl'}>💬 {random()}</p>
        <p className={'text-2xl '} >🔗 {random(30)}</p>
      </div>

    </section>
  )
}