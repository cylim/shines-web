"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShineAPI } from '@/utils/apis/shine';
import { useAccount } from "wagmi";
import { insertRow, upload } from "@/utils/firebaseHelper";
import toast from "react-hot-toast";
import { CreateSidebar } from '@/components/create/CreateSidebar';

const App: React.FC = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(undefined);
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
      if (!file) {
        throw new Error('No image selected')
      }

      toast.dismiss()
      toast.loading('Uploading image...')
      const key = `${address}-${+new Date()}`;
      const url = await upload(`${key}`, file)
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
      const file = await ShineAPI.generateAiAvatarVideo({ username: 'test' })
      setFile(file)
      setVideoUrl(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setFinishGenerated(true)
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-900 text-white h-screen flex flex-col justify-center w-[100%] items-center">
      <div className="flex flex-row justify-between items-start w-full px-10">
        <CreateSidebar step={4} />
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
          ) : loading ? (
            <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto my-4"></div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
