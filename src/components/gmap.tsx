'use client'

import { GoogleMap } from "@react-google-maps/api";
import { Coordinates } from "@/types/coordinates";

interface GoogleMapComponentProps {
  origin: Coordinates;
  width: string;
  height: string;
}

const GoogleMapComponent = ({
  origin,
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
      </GoogleMap>
    </div>
  );
};

export { GoogleMapComponent };
