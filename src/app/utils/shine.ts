import { AxiosResponse } from "axios"
import { request } from "./request"

const shineReq = (payload: any) => {
  const baseUrl = 'https://avatardemo.onrender.com'
  return request({
    ...payload,
    baseUrl,
  })
}

// const handleAudio = (response: AxiosResponse) => {
//     const audioBlob = new Blob([response.data], { type: (response?.headers?.['Content-Type'] as string)?.toLowerCase() || 'audio/mp3' });
  
//     // Create a File object from the Blob
//     const file = new File([audioBlob], 'uploaded_audio.mp3', { type: 'audio/mp3' });
  
//     return file;
//   }

const handleImage = (response: AxiosResponse) => {
    let image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    // const base64Img = `data:${(response?.headers?.['Content-Type'] as string)?.toLowerCase()};base64,${image}`
    const byteCharacters = atob(image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: (response?.headers?.['Content-Type'] as string)?.toLowerCase() || 'image/png' });

      // Create a File object from the Blob
      const file = new File([blob], 'uploaded_image.png', { type: (response?.headers?.['Content-Type'] as string)?.toLowerCase() || 'image/png' });

      return file;
  }

export const ShineAPI = {
  avatarWithType: ({type, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `generate_avatar_images/?image_type=${type}`,
    contentType: 'multipart/form-data',
    responseType: 'arraybuffer'
  }).then(handleImage),
  avatarWithPrompt: ({prompt, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `generate_your_avatar_images/?image_prompt=${prompt}`,
    contentType: 'multipart/form-data',
    responseType: 'arraybuffer'
  }).then(handleImage),
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