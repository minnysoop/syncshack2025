import { GoogleMapProvider } from "@/providers/gmap-provider";
import { GoogleMapComponent } from "@/components/gmap";
import ProtectedRoute from "@/providers/protection-provider";

export default function Dashboard() {
  const origin = { latitude: 37.7749, longitude: -122.4194 };      // San Francisco
  const destination = { latitude: 34.0522, longitude: -118.2437 }; // Los Angeles

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center py-5">
        <GoogleMapProvider>
          <GoogleMapComponent
                  origin={origin}
                  destination={destination}
                  width="50%"
                  height="500px"
                />
        </GoogleMapProvider>
      </div>
    </ProtectedRoute>
  );
}