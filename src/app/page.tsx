'use client'

import Map from "@/components/map"
import { useState } from "react"
import SearchBar from "@/components/searchBar"

const Home = () => {
  const [location, setLocation] = useState<string>("")



  return (
    <>
      <div className="h-screen overflow-hidden">
        <SearchBar onSearch={(value: string) => setLocation(value)} />
        <Map location={location} />
      </div>
    </>
  );
};

export default Home;