"use client";

import { useEffect, useState } from "react";
import Countries from "@/components/Countries";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { Country } from "@/types/country";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/region/europe");
        const data = await response.json();
        setCountries(data);
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

  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      !search ||
      country.name.common.toLowerCase().includes(search.toLowerCase());

    const matchesLanguage =
      !selectedLanguage ||
      (country.languages &&
        Object.values(country.languages).includes(selectedLanguage));

    return matchesSearch && matchesLanguage;
  });

  return (
    <div className="relative overflow-hidden min-h-screen bg-white">
      <Header />
      <SearchBar
        search={search}
        setSearch={setSearch}
        uniqueLanguages={uniqueLanguages}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <Countries countries={filteredCountries} />
    </div>
  );
}
