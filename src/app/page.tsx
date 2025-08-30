"use client";

import Image from "next/image";
import HeroImage from "../../public/about.png";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Text container */}
      <div className="relative flex flex-col items-center text-white pt-60 px-6 text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">
          About Us: We are{" "}
          <span className="inline-block text-blue-400 align-middle">
            <Typewriter
              options={{
                strings: ["Innovators", "Creators", "Builders"],
                autoStart: true,
                loop: true,
                delay: 75, // typing speed
                deleteSpeed: 50, // deleting speed
              }}
            />
          </span>
        </h1>

        <p className="text-sm mb-2">
          The last-mile problem in shipping is one of the most costly and inefficient parts of the supply chain. Packages have to be delivered individually to many locations, increasing time and expenses for shipping companies.
        </p>
        <p className="text-sm mb-2">
          Our plan is to create local hubs—storage locations where people can rent their spaces to host shipments. This allows shipping companies to consolidate deliveries, reducing cost and improving efficiency.
        </p>
        <p className="text-sm">
          Additionally, individuals can earn money by offering their space as a hub, creating a win-win system that lowers shipping costs and increases community participation.
        </p>
      </div>
    </div>
  );
}
