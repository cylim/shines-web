"use client"
import React, { useState, useEffect } from 'react';
import { ShineAPI } from '@/utils/apis/shine';
import { useRouter } from 'next/navigation';
import { CreateSidebar } from '@/components/create/CreateSidebar';

const sleep = (milliseconds: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const Step4: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [generateAudio, setGenerateAudio] = useState<boolean>(false);
  const [uploadingAudio, setUploadingAudio] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [finishGenerate, setFinishGenerate] = useState<boolean>(false);
  const [saveAudioFile, setSaveAudioFile] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('female');
  const router = useRouter();
  const [content, setContent] = useState('This is a placeholder audio for testing purposes.')
  const [gender, setGender] = useState("1")


  const handleUploadClick = () => {
    setUploadingAudio(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file as any);
  };

  const handleGenerateAudio = () => {
    setGenerateAudio(true);
  };

  const handleStartGenerating = async () => {
    setLoading(true);

    try {
      const url = await ShineAPI.generateAudio({ content, gender })
      setSaveAudioFile(url);
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setFinishGenerate(true)
      setLoading(false);
    }
  };

  const handleSaveAndNextClick = () => {
    router.push('/create/step5');
  };

  return (
    <main className="bg-gray-900 text-white h-screen flex flex-col justify-center w-[100%] items-center">

      <div className="flex flex-row justify-between items-start w-full px-10">
        <CreateSidebar step={3} />

        <div className="w-3/4 flex flex-col items-center">
          <h3 className="text-6xl font-bold mb-8">Audio Preparation</h3>
          <p className="text-gray-400 mb-8">Upload your own audio or Generate by AI</p>
          {!uploadingAudio && !generateAudio ? (
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleUploadClick}
              >
                Yes, upload my audio
              </button>
              <button
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleGenerateAudio}
              >
                AI generates audio
              </button>
            </div>
          ) : (
            <div className="mt-4">
              {!generateAudio ? (
                <>
                  <input type="file" onChange={handleFileChange} />
                  <button
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded mt-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleSaveAndNextClick}
                  >
                    Save and Next
                  </button>
                </>
              ) : (
                <div></div>
              )}
            </div>
          )}
          {/* Radio buttons for Male and Female */}
          {generateAudio && !loading && !finishGenerate ? (
            <div className="mt-4">
              <label className="text-white mr-4">Male</label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={selectedGender === 'male'}
                onChange={() => setSelectedGender('male')}
              />
              <label className="text-white ml-4">Female</label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={selectedGender === 'female'}
                onChange={() => setSelectedGender('female')}
              />
              <button
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded mt-2 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleStartGenerating}
              >
                Generate Audio
              </button>
            </div>

          ) : generateAudio && loading ? (
            <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto my-4"></div>
          ) : finishGenerate && !loading ? (
            <div>
              {!!saveAudioFile && <audio controls>
                <source src={saveAudioFile} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>}
              <p className="text-gray-400 mb-8">Finish generated</p>
              <button
                className="bg-blue-600 text-white font-semibold py-2 px-6 rounded mt-2 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleSaveAndNextClick}
              >
                Next
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Step4;
