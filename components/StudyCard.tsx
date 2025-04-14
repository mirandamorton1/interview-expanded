import { useState } from "react";
import Image from "next/image";

type StudyCardProps = {
  flags: {
    svg: string;
  };
  name: string;
};

export default function StudyCard({ flags, name }: StudyCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="w-full h-40 bg-white shadow-md rounded-xl cursor-pointer border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-gray-500"
      onClick={toggleFlip}
    >
      <div className={`w-full h-full ${isFlipped ? "bg-white" : ""}`}>
        {!isFlipped ? (
          <Image src={flags.svg} alt="flag" width={288} 
          height={168}  className="object-cover w-full h-full" />
        ) : (
          <div className="flex justify-center items-center h-full text-2xl font-bold">
            {name}
          </div>
        )}
      </div>
    </div>
  );
}
