"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from '@/components/layouts/AppLayout';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/create/step2');
  };

  return (
    <AppLayout>
        <main className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center w-[100%] rounded-3xl">
            <div className="flex flex-row justify-between items-start w-full px-10">
              <div className="w-1/4">
                <ul className="space-y-2">
                  <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 1: Start</li>
                  <li>Step 2: Avatar Image</li>
                  <li>Step 3: Content</li>
                  <li>Step 4: Audio</li>
                  <li>Step 5: Preview</li>
                </ul>
              </div>
              <div className="w-3/4 flex flex-col items-center">
                <h1 className="text-6xl font-bold mb-8">AI Avatar Video Generator</h1>
                {currentStep === 1 && (
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleStartClick}>
                    Start
                  </button>
                )}
                {/* {currentStep === 2 && <Step2 />} */}
              </div>
            </div>
        </main>
    </AppLayout>
  )
}

export default App;
