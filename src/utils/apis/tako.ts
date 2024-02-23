import { request } from "./request"

const takoReq = (payload: any) => {
  const baseUrl = 'https://testapi.takoyaki.so'
  return request({
    ...payload,
    baseUrl,
  })
}

export const TakoAPI = {
  registerBid: ({cententId, bidId}: any) => takoReq({
    data: {index: bidId, pubId:cententId},
    method: "POST",
    endpoint: `v2/lens/open-curation/register`,
  }),
}
