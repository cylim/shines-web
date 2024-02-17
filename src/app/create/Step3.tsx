import React, { useState } from 'react';

const Step3: React.FC = () => {
  
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Please upload your image</title>
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
              <li className="bg-blue-500 text-white px-4 py-2 rounded-md">Step 3: Content</li>
              <li>Step 4: Audio</li>
              <li>Step 5: Preview</li>
            </ul>
          </div>
            <div className="flex-grow flex justify-between">
                <div className="flex flex-col items-center w-1/2 mr-4">
                    <div className="w-full mb-4 p-4 bg-white text-black rounded border-4 border-blue-600">
                        <textarea className="w-full h-96 p-2" placeholder="Enter your text here..."></textarea>
                    </div>
                    <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Generate</button>
                </div>
                <div className="flex flex-col items-center w-1/2 ml-4">
                    <div className="w-full mb-4 p-4 bg-white text-black rounded border-4 border-blue-600">
                        <div className="w-full h-96 p-2">
                        </div>
                    </div>
                    <button className="bg-transparent text-white font-semibold py-2 px-4 rounded border border-white flex items-center">
                        <span className="mr-2">Skip</span>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                    <p className="text-gray-400 mt-2 text-sm">If you already have your content, you may skip this step.</p>
                </div>
            </div>
            </div>
      </body>
    </html>
  );
};

export default Step3;
