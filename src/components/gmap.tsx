'use client'

import { GoogleMap, Marker } from "@react-google-maps/api";
import { Coordinates } from "@/types/coordinates";

interface GoogleMapComponentProps {
  origin: Coordinates;
  points: Coordinates[];
  width: string;
  height: string;
}

const GoogleMapComponent = ({
  origin,
  points,
  width,
  height,
}: GoogleMapComponentProps) => {

  const mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP, 
    streetViewControl: false,
    mapTypeControl: false, 
    fullscreenControl: false,
  };


  return (
    <div style={{ width, height }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: origin.latitude, lng: origin.longitude }}
        zoom={13}
        options={mapOptions} 
      >
        <Marker 
          position={{ lat: origin.latitude, lng: origin.longitude }} 
          label="Origin"
        />

        {points.map((point, index) => (
          <Marker
            key={index}
            position={{ lat: point.latitude, lng: point.longitude }}
            label={`${index + 1}`} 
          />
        ))}

      </GoogleMap>
    </div>
  );
};

export { GoogleMapComponent };
