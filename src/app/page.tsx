import Image from "next/image";
import HeroImage from "../../public/about.png"; // Replace with your image path

export default function Home() {
  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroImage.src})` }}
    >
      <div className="bg-black/50 w-full min-h-screen flex flex-col items-center p-6">
        <div className="mt-20 flex flex-col items-center text-white">
          <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

          <p className="text-sm mb-2 text-center max-w-2xl">
            The last-mile problem in shipping is one of the most costly and inefficient parts of the supply chain. Packages have to be delivered individually to many locations, increasing time and expenses for shipping companies.
          </p>
          <p className="text-sm mb-2 text-center max-w-2xl">
            Our plan is to create local hubs—storage locations where people can rent their spaces to host shipments. This allows shipping companies to consolidate deliveries, reducing cost and improving efficiency.
          </p>
          <p className="text-sm text-center max-w-2xl">
            Additionally, individuals can earn money by offering their space as a hub, creating a win-win system that lowers shipping costs and increases community participation.
          </p>
        </div>
      </div>
    </div>
  );
}