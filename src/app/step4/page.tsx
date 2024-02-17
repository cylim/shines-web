"use client"
import React, { useState, useEffect } from 'react';
import { ShineAPI } from '../utils/shine';
import { useRouter } from 'next/navigation';

const sleep = (milliseconds: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const Step4: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [resultText, setResultText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generateAudio, setGenerateAudio] = useState<boolean>(false);
  const [uploadingAudio, setUploadingAudio] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('');

  useEffect(() => {
    // Add any side effects or initialization here if needed
  }, []);

  const handleUploadClick = () => {
    setUploadingAudio(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  const handleGenerateAudio = () => {
    setGenerateAudio(true);
  };

  const handleStartGenerating = async () => {
     setLoading(true);
        
     await sleep(2000)
     try {
         
         await ShineAPI.summarize({ content: text, language: "en" })
         .then((response) => {

             const summarizedResult = response.data;
             const resultString = summarizedResult.data;
 
             setResultText(resultString);
             setResultGenerated(true);
         })
         .catch((error) => {
             console.error('Error in Summarization:', error);
         });
 
     } catch (error) {
       console.error('Error generating result:', error);
 
     } finally {
       setLoading(false);
     }
 };
  

  const handleSaveAndNextClick = () => {
    // Handle save logic, for example, uploading the file to the server
    console.log('Selected file:', selectedFile);
    console.log('Selected gender:', selectedGender);

    // After saving, proceed to the next step
    // router.push('/step5');
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Audio</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <style>{`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </head>
      <body className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-start w-full px-10">
          <div className="w-1/4">
            <ul className="space-y-2">
              <li>Step 1: Start</li>
              <li>Step 2: Avatar Image</li>
              <li>Step 3: Content</li>
              <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 4: Audio</li>
              <li>Step 5: Preview</li>
            </ul>
          </div>
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
            {generateAudio && (
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
                  onChange={() => setSelectedGender('female')}
                />
                <button
                      className="bg-blue-600 text-white font-semibold py-2 px-6 rounded mt-2 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      onClick={handleSaveAndNextClick}
                    >
                        Generate Audio
                </button>
              </div>

            )}
          </div>
        </div>
      </body>
    </html>
  );
};

export default Step4;
