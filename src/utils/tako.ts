import { ethers } from 'ethers'
import { CONSTANT, TakoOpenCuration } from 'tako-open-curation'
import { parseEther } from 'viem'

const tako = new TakoOpenCuration(CONSTANT.Network.TESTNET)
const lensOpenCuration = tako.lensOpenCuration
const apikey = process.env.NEXT_PUBLIC_ALCHEMY_KEY
const web3Provider = new ethers.providers.AlchemyProvider(80001, apikey)
lensOpenCuration.provider = web3Provider

// Generate calldata to call loanWithSig on Tako Open Curation Contarct
// The curator can claim his reward from the booster bid after verification
// This function is used to claim the reward
export const generateClaimRewardAbiData = async({profileId, bidIndex, contentId}: any) => {
  const sig = await lensOpenCuration.verifyBid('0xaddress', bidIndex, contentId)
  const abiData = await lensOpenCuration.generateClaimRewardAbiData(bidIndex, profileId, sig.relayer, contentId, sig.signature);
  return abiData
}

// After the curators complete the curation(i.e., quote the target publication on Lens), 
// they must bind the Quoted Publication Id and Bid Index.
// So that Tako can verify that the curators have completed the curation task.
export const registerBid = async ({bidIndex, contentId} : any) => {
  const result = await lensOpenCuration.register(bidIndex, contentId)
  return result
}

// Generate calldata to call the Tako Open Curation Contract
export const generateBidAbiData = async ({contentId, bidToken =  '0x0000000000000000000000000000000000000000', bidAmount}: any) => {
  const amount = parseEther(bidAmount); 
  const abiData = await lensOpenCuration.generateBidAbiData(contentId, bidToken, amount);

  return abiData
}

// Generate transaction parameter to call the Tako Open Curation Contract
export const generateTrx = async({contentId, bidToken, bidAmount, from}: any) => {
  const takoHubInfo = await lensOpenCuration.takoHubInfo();
  const amount = parseEther(bidAmount); 
  const abiData = await generateBidAbiData({contentId, bidToken, bidAmount}) 
  const estimatedGas = await lensOpenCuration.estimateGas(from, takoHubInfo.contract, abiData, amount);
  const transaction = await lensOpenCuration.generateTransaction(from, abiData, amount, estimatedGas * BigInt(3));
  console.log(transaction)
  return transaction
}

export const allBids = async () => {
  const query = await lensOpenCuration.allBids.DESC.status(CONSTANT.OpenCurationAllBidsStatus.Pending)
  const pendingBids = await query.get()

  return pendingBids
}