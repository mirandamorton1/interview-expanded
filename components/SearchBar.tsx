"use client";

import { FaFilter } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";


export default function SearchBar({
  search,
  setSearch,
  onFilterClick,
}: {
  search: string;
  setSearch: (value: string) => void;
  onFilterClick: () => void;
}) {
  return (
    <div className="flex justify-center items-center pb-5">
      <div className="relative w-[691px]">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full py-4 pl-4 pr-10 rounded-full border border-gray-300 text-black bg-cyan-600 font-semibold shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaMagnifyingGlass className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black text-4xl" />
      </div>
      <button onClick={onFilterClick} className="rounded-full hover:cursor-pointer">
        <FaFilter className="text-black text-4xl" />
      </button>
    </div>
  );
}
