'use client'

import React, { useState, useEffect } from "react";
import { Location } from "@/types/location";
import { GoogleMapProvider } from "@/providers/gmap-provider";
import { GoogleMapComponent } from "@/components/gmap";
import { Coordinates } from "@/types/coordinates";

const DEFAULT_COORDS: Coordinates = { latitude: 37.7749, longitude: -122.4194 };

const Map: React.FC<Location> = (props) => {
  const [origin, setOrigin] = useState<Coordinates>(DEFAULT_COORDS);

  const location = props.location; 
  useEffect(() => {
    if (!location) return;

    // https://developers.google.com/maps/documentation/geocoding/overview
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setOrigin({ latitude: lat(), longitude: lng() });
      } else {
        setOrigin({ latitude: DEFAULT_COORDS.latitude, longitude: DEFAULT_COORDS.longitude });
      }
    });
  }, [location]);

  return (
    <GoogleMapProvider>
        <GoogleMapComponent
          origin={origin}
          width="100%"
          height="800px"
        />
    </GoogleMapProvider>
  );
};

export default Map;
