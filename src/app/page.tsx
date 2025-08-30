'use client'

import Map from "@/components/map"
import { useState } from "react"
import SearchBar from "@/components/searchBar"

const Home = () => {
  const [location, setLocation] = useState<string>("")

  return (
    <>
      <div className="h-screen overflow-hidden">
        <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mt-5">
          Rest Stop Finder
        </h1>
        <p className="text-gray-600 mt-2 italic">randomly</p>
      </header>
        <SearchBar onSearch={(value: string) => setLocation(value)} />
        <Map location={location} />
      </div>
    </>
  );
};

export default Home;