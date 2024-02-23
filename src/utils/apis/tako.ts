import { request } from "./request"

const takoReq = (payload: any) => {
  const baseUrl = 'https://testapi.takoyaki.so'
  return request({
    ...payload,
    baseUrl,
  })
}

export const TakoAPI = {
  registerBid: ({contentId, bidId}: any) => takoReq({
    data: {index: bidId, pubId:contentId},
    method: "POST",
    endpoint: `v2/lens/open_curation/register`,
    headers: {
      'Accept': 'application/json'
    }
  }),
}
