"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShineAPI } from '../utils/shine';


const sleep = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

const Step5: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [finishGenerate, setFinishGenerated] = useState<boolean>(false);
  
    const handleStartClick = () => {
      router.push('/step2');
    };
  
    const handleSaveClick = () => {
      
    };
    
    // cannot not show video
    const handleStartGenerated = async () => {
      setLoading(true);
      
      try {
          setVideoUrl("https://avatardemo.onrender.com/generate_ai_avatar_video?username=test");
      } catch (error) {
          console.error('Error generating audio:', error);
      } finally {
          setFinishGenerated(true)
          setLoading(false);
      }};

  
return (
      <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Video</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
        <style>{`
            body {
              font-family: 'Inter', sans-serif;
            }
            .logo {
              width: 70px;  // Set the width of the logo
              height: 70px;  // Maintain aspect ratio
              margin-bottom: 0px;  // Add margin to the bottom
              margin-left: 0px;
            }
          `}</style>
      </head>
      <body className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-start w-full px-10">
          <div className="w-1/4">
            <ul className="space-y-2">
              <img src="/logo.png" alt="Logo" className="logo" />
              <li>Step 1: Start</li>
              <li>Step 2: Avatar Image</li>
              <li>Step 3: Content</li>
              <li >Step 4: Audio</li>
              <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 5: Preview</li>
            </ul>
          </div>
            <div className="w-3/4 flex flex-col items-center">
              <h1 className="text-6xl font-bold mb-8">Here is your AI avatar video</h1>
              {!!videoUrl && <video controls src={videoUrl} className="mb-4" width="400" height="300" />}
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
              ) : (
                <div className="animate-spin h-5 w-5 border-t-2 border-b-2 border-blue-500 mx-auto my-4"></div>
              )}
            </div>
          </div>
        </body>
      </html>
    );
  };
  
  export default Step5;
  