"use client"
import React, { useState } from 'react';
import Step3 from '../Step3';
import AppLayout from '@/components/layouts/AppLayout';

const Step2: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(2);

  const handleStartClick = () => {
    setCurrentStep(3);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Update state with the selected file
      setSelectedFile(file);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  return (
    <AppLayout>
      <main className="bg-gray-900 text-white h-screen flex flex-col justify-center items-center">
        <div className="flex flex-row justify-between items-start w-full px-10">
          <div className="w-1/4">
            <ul className="space-y-2">
              <li>Step 1: Start</li>
              <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 2: Avatar Image</li>
              <li>Step 3: Content</li>
              <li>Step 4: Audio</li>
              <li>Step 5: Preview</li>
            </ul>
          </div>
          <div className="w-3/4 flex flex-col items-center">
            <h3 className="text-6xl font-bold mb-8">Please upload your photo</h3>
            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-600 rounded-lg">
              {selectedFile ? (
                <div className="mt-4">
                  <p>Image Preview:</p>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected"
                    className="rounded-lg"
                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                  />
                  <br />
                  <label htmlFor="user-input" className="text-white mt-4 mb-2">
                    What do you want to be?
                  </label>
                  <br />
                  <input
                    type="text"
                    id="user-input"
                    className="bg-gray-700 text-white px-4 py-2 rounded"
                    value={userInput}
                    onChange={handleInputChange}
                  />
                  <br />
                  {currentStep === 2 && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={handleStartClick}>
                        Upload your photo
                    </button>
                    )}
                    {currentStep === 3 && <Step3 />}
                </div>
              ) : (
                <div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div>Click here to upload photo</div>
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Step2;
