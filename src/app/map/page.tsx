import { GoogleMapProvider } from "@/providers/gmap-provider";
import { GoogleMapComponent } from "@/components/gmap";

export default function Home() {
  const origin = { latitude: 37.7749, longitude: -122.4194 }; 
  const destination = { latitude: 34.0522, longitude: -118.2437 };

  return (
    <GoogleMapProvider>
      <GoogleMapComponent
        origin={origin}
        destination={destination}
        width="100%"
        height="500px"
      />
    </GoogleMapProvider>
  );
}
