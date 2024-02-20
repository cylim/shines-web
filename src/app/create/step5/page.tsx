"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layouts/AppLayout';
import { ShineAPI } from '@/utils/apis/shine';
import { useAccount, WagmiProvider } from "wagmi";
import { insertRow, upload } from "@/utils/firebaseHelper";
import toast from "react-hot-toast";
import { APP_NAME, WALLETCONNECT_KEY, SATELITE_ID } from '@/utils/env';
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import {
  polygonMumbai
} from 'wagmi/chains';

const config = getDefaultConfig({
  appName: APP_NAME,
  projectId: WALLETCONNECT_KEY,
  chains: [polygonMumbai],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


const sleep = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

const Step5: React.FC = () => {
    const { address } = useAccount();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [finishGenerate, setFinishGenerated] = useState<boolean>(false);
  
    const sleep = (milliseconds: number): Promise<void> => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
  
    const handleStartClick = () => {
      router.push('/create/step2');
    };
    
  
    const handleSaveClick = async () => {
      setLoading(true);
    try {
      if (!address) {
        throw new Error('No user or provider')
      }
      if (!videoUrl) {
        throw new Error('No image selected')
      }
      
      toast.dismiss()
      toast.loading('Uploading image...')
      const key = `${address}-${+new Date()}`;
      const url = await upload(`${key}`, videoUrl)
      toast.dismiss()
      
      toast.loading('Storing avatar for generative usage...')

      await insertRow('videos', [key], {
        id: key,
        address: address || '',
        sourceUrl: url,
        description: `${address}-Avatar_video`,
      })

    } catch (err: any) {
      toast.dismiss()
      toast.error(err.message)
      console.error(err);
    }
    setLoading(false);
    toast.dismiss()
    toast.loading('Successful Save your avatar video!');
    sleep(2000);
    toast.dismiss();
    };
    
    const handleStartGenerated = async () => {
      setLoading(true);
      
      try {
          const url = await ShineAPI.generateAiAvatarVideo({username: 'test'})
          setVideoUrl(url);
      } catch (error) {
          console.error('Error generating audio:', error);
      } finally {
          setFinishGenerated(true)
          setLoading(false);
      }};
  
    return (
      <AppLayout>
        <main className="bg-gray-900 text-white h-screen flex flex-col justify-center w-[100%] items-center">
          <div className="flex flex-row justify-between items-start w-full px-10">
            <div className="w-1/4">
              <ul className="space-y-2">
                <img src="/logo.png" alt="Logo" className="logo" />
                <li>Step 1: Start</li>
                <li>Step 2: Avatar Image</li>
                <li>Step 3: Content</li>
                <li>Step 4: Audio</li>
                <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 5: Preview</li>
              </ul>
            </div>
            <div className="w-3/4 flex flex-col items-center">
              <h1 className="text-6xl font-bold mb-8">Here is your AI avatar video</h1>
              {!!videoUrl && <video controls src={videoUrl} className="mb-4 max-h-96 w-auto" />}
              {!loading && finishGenerate ? (
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleSaveClick}
                  >
                    Save 
                  </button>
                  <button
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleStartClick}
                  >
                    Generate again
                  </button>
                </div>
              ) : !loading && !finishGenerate ? (
                <button
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  onClick={handleStartGenerated}
                >
                  Start generated 
                </button>
              ) : loading ?(
                <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto my-4"></div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </main>
      </AppLayout>
    );
  };
  
  const Step5WithWagmiProvider: React.FC = () => {
    return (
        <WagmiProvider config={config}>
            <Step5 />
        </WagmiProvider>
    );
};

  export default Step5WithWagmiProvider;
  