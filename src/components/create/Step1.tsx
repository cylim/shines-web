import { useRouter } from "next/navigation";
import { CreateSidebar } from "./CreateSidebar";


export const Step1 = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/create/step2');
  };


  return  <div className="flex flex-row justify-between items-start w-full px-10">
    <CreateSidebar step={0} />

      <div className="w-3/4 flex flex-col items-center">
        <h1 className="text-6xl font-bold mb-8">AI Avatar Video Generator</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={handleStartClick}>
            Start
          </button>
      </div>
    </div>
}