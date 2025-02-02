"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "../ui/input";
import { EventLocationProps } from "../../types/event";

const GOMAPS_API_KEY = "GOMAPS_API_KEY";

export function EventLocation({ location, onLocationChange }: EventLocationProps) {
  const [coordinates, setCoordinates] = useState({
    lat: 12.9763,
    lng: 77.5929,
  });

  const handleLocationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onLocationChange(e);

    if (!GOMAPS_API_KEY) {
      console.error("GoMaps API key is missing.");
      return;
    }

    try {
      const res = await fetch(
        `https://maps.gomaps.pro/api/v1/geocode?api_key=${GOMAPS_API_KEY}&address=${encodeURIComponent(
          e.target.value
        )}`
      );
      if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
      }

      const data = await res.json();
      if (data && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Location Input */}
      <div className="p-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-gray-600" />
          <Input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter event location"
            className="w-full border-none focus:ring-0 text-lg font-medium"
          />
        </div>
      </div>

      {/* GoMaps Static Map */}
      <div className="w-full h-40 sm:h-48">
        {GOMAPS_API_KEY ? (
          <img
            src={`https://app.gomaps.pro/api/v1/staticmap?api_key=${GOMAPS_API_KEY}&center=${coordinates.lat},${coordinates.lng}&zoom=15&size=600x300`}
            alt="Map Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-center text-gray-500 p-4">
            Map preview unavailable
          </p>
        )}
      </div>
    </div>
  );
}
