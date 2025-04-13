"use client";

import { FaMagnifyingGlass, FaBook, FaArrowRight } from "react-icons/fa6";

export default function SearchBar({
  search,
  setSearch,
  uniqueLanguages,
  selectedLanguage,
  setSelectedLanguage,
  toggleStudyMode,
  startQuiz,

}: {
  search: string;
  setSearch: (value: string) => void;
  uniqueLanguages: string[];
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
  toggleStudyMode: () => void;
  startQuiz: () => void;
}) {
  return (
    <div className="flex justify-center items-center pb-5 space-x-4">
      <div className="relative w-80">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a country..."
          className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-300 text-black font-semibold shadow-xl focus:outline-none focus:ring-2 focus:ring-black"
        />
        <FaMagnifyingGlass className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 text-xl" />
      </div>

     <div className="relative flex items-center">
      <button
        onClick={toggleStudyMode}
        className="text-blue-600 font-bold flex items-center py-1 px-4 border  rounded-full hover:cursor-pointer mr-4"
      >
        <FaBook className="text-blue-600 mr-2" /> Study Mode
      </button>
      <button
        onClick={startQuiz}
        className="text-green-700 font-bold flex items-center py-1 px-4 mr-4 border rounded-full hover:cursor-pointer"
      >
        Start Quiz <FaArrowRight className="text-green-700 ml-2" />
      </button>
      <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)} 
          className="w-48 py-2 px-4 mr-4 rounded-md border border-gray-700 bg-white text-gray-800 font-semibold shadow-md focus:outline-none transition-all duration-300 ease-in-out hover:cursor-pointer"
        >
          <option value="">All Languages</option>
          {uniqueLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
