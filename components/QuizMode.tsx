import { useState, useEffect } from "react";
import Image from "next/image";
import { Country } from "@/types/country";

type QuizModeProps = {
  countries: Country[];
  exitQuiz: () => void; 
  setScore: (score: number) => void; 
};

export default function QuizMode({ countries, exitQuiz, setScore }: QuizModeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(""); 
  const [localScore, setLocalScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false); 
  const [feedback, setFeedback] = useState(""); 
  const [quizCompleted, setQuizCompleted] = useState(false); 
  const [options, setOptions] = useState<string[]>([]); 

  const currentCountry = countries[currentQuestionIndex];


  useEffect(() => {
    const incorrectOptions = countries
      .filter((country) => country.name.common !== currentCountry.name.common) 
      .sort(() => Math.random() - 0.5)
      .slice(0, 3); 

    const allOptions = [
      currentCountry.name.common,
      ...incorrectOptions.map((country) => country.name.common),
    ];


    setOptions(allOptions.sort(() => Math.random() - 0.5)); 
  }, [currentQuestionIndex, countries, currentCountry.name.common]);

  const handleSubmitAnswer = () => {
    if (userAnswer === currentCountry.name.common) {
      setLocalScore(localScore + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Wrong! The correct answer is ${currentCountry.name.common}`);
    }

    setIsAnswered(true); 
  };

  const nextQuestion = () => {
    setIsAnswered(false);
    setUserAnswer(""); 
    setFeedback(""); 

    if (currentQuestionIndex < countries.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); 
    } else {
      setQuizCompleted(true); 
      setScore(localScore); 
    }
  };

  const restartQuiz = () => {
    setLocalScore(0);
    setCurrentQuestionIndex(0);
    setQuizCompleted(false);
    setIsAnswered(false);
    setUserAnswer("");
    setFeedback("");
  };

  if (quizCompleted) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-xl mb-4">Your final score is {localScore} out of {countries.length}</p>
        <button onClick={restartQuiz} className="bg-blue-500 text-white py-2 px-4 rounded-full mb-4">Restart Quiz</button>
        <button onClick={exitQuiz} className="bg-gray-500 text-white py-2 px-4 rounded-full">
          Exit Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Name the Country</h2>
      
      <div className="mb-4 p-2 rounded-lg">
        <Image
          src={currentCountry.flags.svg}
          alt={`Flag of ${currentCountry.name.common}`}
          width={288} 
          height={168}
          className="border border-gray-300"
        />
      </div>

      <form className="grid grid-cols-2 gap-4 mb-4">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              type="radio"
              id={option}
              name="country"
              value={option}
              checked={userAnswer === option}
              onChange={() => setUserAnswer(option)}
              className="mr-2"
            />
            <label htmlFor={option} className="text-lg">{option}</label>
          </div>
        ))}
      </form>

      <button onClick={handleSubmitAnswer} className="text-green-700 border py-2 px-4 rounded-full mb-4">
        Submit
      </button>

      {isAnswered && (
        <div className="text-center">
          <p className="text-lg">{feedback}</p>
          <button onClick={nextQuestion} className="bg-green-500 text-white py-2 px-4 rounded-full mt-4">
            Next Question
          </button>
        </div>
      )}

      <button onClick={exitQuiz} className="bg-gray-500 text-white py-2 px-4 rounded-full mt-4">
        Exit Quiz
      </button>
    </div>
  );
}
