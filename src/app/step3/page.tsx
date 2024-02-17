"use client"
import React, { useState, useEffect } from 'react';

const Step3: React.FC = () => {
  const [text, setText] = useState<string>('Put your content here.');
  const [resultText, setResultText] = useState<string>('You may adjust it in the text box.');

  useEffect(() => {
    // Add any side effects or initialization here if needed
  }, []);

  const handleGenerateClick = () => {
    // Implement your generation logic here
  };

  const handleSkipClick = () => {
    // Implement your skip logic here
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Text Generator</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          body {
              background-color: #1a1c1e;
          }
        `}</style>
      </head>
      <body>
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
            {/* Left Box */}
            <div className="flex flex-col items-center">
              <h2 className="text-white text-2xl mb-2">Your text</h2>
              <p className="text-gray-400 mb-4">{text}</p>
              <div className="border-4 border-white rounded-lg p-2" style={{ width: '300px', height: '400px' }}>
                <div className="bg-white w-full h-full rounded-lg"></div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleGenerateClick}
            >
              Generate
            </button>

            {/* Right Box */}
            <div className="flex flex-col items-center">
              <h2 className="text-white text-2xl mb-2">Result</h2>
              <p className="text-gray-400 mb-4">{resultText}</p>
              <div className="border-4 border-white rounded-lg p-2" style={{ width: '300px', height: '400px' }}>
                <div className="bg-white w-full h-full rounded-lg"></div>
              </div>
            </div>

            {/* Skip Button */}
            <button
              className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSkipClick}
            >
              Skip <i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Step3;
