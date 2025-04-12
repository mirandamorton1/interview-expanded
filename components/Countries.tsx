"use client";
import { Country } from "@/types/country";
import CountryCard from "@/components/CountryCard";

export default function Countries({ countries }: { countries: Country[] }) {
  return (
    <div className="flex justify-center my-8 z-10 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-[931px] h-[703px] p-6 pt-26 bg-gray-300 rounded-xl overflow-y-auto">
        {countries.length > 0 ? (
          countries.map((country, key) => (
            <CountryCard
              key={key}
              name={country.name.common}
              languages={country.languages ? Object.values(country.languages) : []}
              timezones={country.timezones}
              currency={
                country.currencies
                  ? Object.values(country.currencies)?.[0]?.name || "Unknown"
                  : "Unknown"
              }
              borders={country.borders ?? []}
              flags={country.flags}
            />
          ))
        ) : (
          <p className="text-center text-black font-semibold col-span-full">
            No matching countries found.
          </p>
        )}
      </div>
    </div>
  );
}
