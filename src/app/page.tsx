'use client'

import Dashboard from "@/components/dashboard"
import { useState } from "react"
import SearchBar from "@/components/searchBar"

const Home = () => {
  const [location, setLocation] = useState<string>("")



  return (
    <>
      <SearchBar onSearch={(value: string) => setLocation(value)} />
        <p>Current location: {location}</p> 
      <Dashboard location={location} />
    </>
  );
};

export default Home;