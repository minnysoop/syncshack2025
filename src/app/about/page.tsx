import Image from "next/image";
import HeroImage from "../../../public/about.png"; // Replace with your image path

export default function AboutPage() {
  return (
    <div className="flex">
      {/* Space for fixed navbar */}
      <div className="w-48"></div>

      {/* Main content */}
      <div className="flex-1 p-6 flex flex-col items-center">
        {/* Hero image */}
        <div className="w-full mb-10 flex justify-center">
          <Image
            src={HeroImage}
            alt="About Us"
            width={800}  // smaller width
            height={300} // smaller height
            className="object-cover rounded-lg"
          />
        </div>

        {/* Push About Us down */}
        <div className="mt-20 flex flex-col items-center">
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
