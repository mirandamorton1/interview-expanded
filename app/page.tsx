"use client";

import { useEffect, useState } from "react";
import Countries from "@/components/Countries";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import StudyCard from "@/components/StudyCard";
import QuizMode from "@/components/QuizMode";
import { Country } from "@/types/country";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/region/europe");
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data); 
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    }

    fetchData();
  }, []);

  const uniqueLanguages = Array.from(
    new Set(
      countries.flatMap((country) =>
        country.languages ? Object.values(country.languages) : []
      )
    )
  ).sort();

  const applyFilters = (): Country[] => {
    return countries.filter((country) => {
      const matchesSearch =
        !search || country.name.common.toLowerCase().includes(search.toLowerCase());

      const matchesLanguage =
        !selectedLanguage ||
        (country.languages && Object.values(country.languages).includes(selectedLanguage));

      return matchesSearch && matchesLanguage;
    });
  };

  useEffect(() => {
    const filtered = applyFilters();
    setFilteredCountries(filtered);
  }, [search, selectedLanguage, countries]);

  const shuffleCountries = (countriesArray: Country[]): Country[] => {
    return countriesArray
      .map((country) => ({ country, random: Math.random() }))
      .sort((a, b) => a.random - b.random)
      .map(({ country }) => country);
  };

  const toggleStudyMode = () => {
    setIsStudyMode((prev) => !prev);
  };

  const startQuiz = () => {
    const shuffledCountries = shuffleCountries(filteredCountries);
    setIsQuizMode(true); 
    setIsStudyMode(false); 
    setFilteredCountries(shuffledCountries); 
  };


  const exitQuiz = () => {
    setIsQuizMode(false);
    setIsStudyMode(false); 
    setSearch(""); 
    setSelectedLanguage(""); 
    setFilteredCountries(countries); 
  };

  const setScore = (score: number) => {
    console.log("Score updated:", score); 
  };


  if (isQuizMode) {
    return <QuizMode countries={filteredCountries} exitQuiz={exitQuiz} setScore={setScore} />;
  }

  const displayedCountries = isStudyMode
    ? shuffleCountries(filteredCountries)
    : filteredCountries;

  return (
    <div className="relative overflow-hidden min-h-screen bg-white">
      <Header />
      <SearchBar
        search={search}
        setSearch={setSearch}
        uniqueLanguages={uniqueLanguages}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        toggleStudyMode={toggleStudyMode}
        startQuiz={startQuiz} 
      />
      {isStudyMode ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 p-6">
          {displayedCountries.map((country, key) => (
            <StudyCard key={key} flags={country.flags} name={country.name.common} />
          ))}
        </div>
      ) : (
        <Countries countries={filteredCountries} />
      )}
    </div>
  );
}
