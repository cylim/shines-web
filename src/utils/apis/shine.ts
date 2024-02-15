import { request } from "./request"

const shineReq = (payload: any) => {
  const baseUrl = 'https://avatardemo.onrender.com'
  return request({
    ...payload,
    baseUrl,
  }).then(r => r.data)
}

export const ShineAPI = {
  avatarWithType: ({type, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `generate_avatar_images/?image_type=${type}`,
    contentType: 'multipart/form-data'
  }),
  avatarWithPrompt: ({prompt, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `generate_your_avatar_images/?image_prompt=${prompt}`,
    contentType: 'multipart/form-data'
  }),
  summarize: ({content, language = "en"}: any) => shineReq({
    data: {content, language},
    method: "POST",
    endpoint: `Summarization`,
  }),
  uploadAvatar: ({username, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `upload-avatar?username=${username}`,
    contentType: 'multipart/form-data'
  }),
  uploadAudio: ({username, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `upload-audio?username=${username}`,
    contentType: 'multipart/form-data'
  }),
  generateAudio: ({content, gender = 1}: any) => shineReq({
    data: {content, gender},
    method: "POST",
    endpoint: `generate-audio`,
  }),
  generateAiAvatarVideo: ({username}: any) => shineReq({
    endpoint: `generate-ai-avatar-video?username=${username}`,
  }),
}