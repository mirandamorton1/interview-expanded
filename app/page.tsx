"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Countries from "@/components/Countries";
import SearchBar from "@/components/SearchBar";
import Header from "@/components/Header";
import { Country } from "@/types/country";

export default function Home() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
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
      {/* Globes */}
      <Image
        src="/globeImage.png"
        alt="Globe Left"
        width={360}
        height={427}
        className="absolute top-47 right-40 translate-x-1/2 -translate-y-1/2 z-0"
      />
      <Image
        src="/globeImage.png"
        alt="Left Globe"
        width={360}
        height={360}
        className="absolute top-47 left-40 -translate-x-1/2 -translate-y-1/2 z-0"
      />

      <Header />
      <SearchBar
        search={search}
        setSearch={setSearch}
        onFilterClick={() => setShowFilters((prev) => !prev)}
      />

      {showFilters && (
        <div className="flex justify-center mt-4">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border rounded px-4 py-2 bg-white text-black"
          >
            <option value="">All Languages</option>
            {uniqueLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      )}

      <Countries countries={filteredCountries} />
    </div>
  );
}
