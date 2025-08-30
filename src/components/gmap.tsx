'use client'

import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import { Coordinates } from "@/types/coordinates";

interface GoogleMapComponentProps {
  origin: Coordinates;
  destination: Coordinates;
  width?: string;
  height?: string;
}

const GoogleMapComponent = ({
  origin,
  destination,
  width = "100%",
  height = "400px",
}: GoogleMapComponentProps) => {
    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);

    // Refer to: https://github.com/visgl/react-google-maps/blob/main/examples/directions/src/app.tsx
    useEffect(() => {
        if (!origin || !destination) return;

        const directionsService = new google.maps.DirectionsService();
        directionsService.route(
        {
            origin: { lat: origin.latitude, lng: origin.longitude },
            destination: { lat: destination.latitude, lng: destination.longitude },
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            } else {
            console.error("Error fetching directions:", result);
            }
        }
    );
  }, [origin, destination]);


  return (
    <div style={{ width, height }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: origin.latitude, lng: origin.longitude }}
        zoom={7}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export { GoogleMapComponent };
