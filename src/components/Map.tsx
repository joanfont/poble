import React, { useState } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom?: number;
  className?: string;
  width?: number;
  height?: number;
}

export function Map({
  latitude,
  longitude,
  zoom = 10,
  className = "",
  width = 600,
  height = 400,
}: MapProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate the scale based on zoom level
  const scale = Math.pow(2, zoom - 8) * 0.1;

  // Calculate the bounding box size based on zoom level
  const bboxSize = 0.01 * Math.pow(2, 10 - zoom);

  // ArcGIS World Imagery service URL
  const arcgisUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${
    longitude - bboxSize
  },${latitude - bboxSize},${longitude + bboxSize},${
    latitude + bboxSize
  }&bboxSR=4326&imageSR=4326&size=${width},${height}&format=png&transparent=false&f=image&dpi=96&scale=${scale}`;

  const expandedArcgisUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/export?bbox=${
    longitude - bboxSize
  },${latitude - bboxSize},${longitude + bboxSize},${
    latitude + bboxSize
  }&bboxSR=4326&imageSR=4326&size=800,600&format=png&transparent=false&f=image&dpi=96&scale=${scale}`;

  return (
    <>
      <div
        className={`relative w-full h-full ${className} cursor-pointer`}
        onClick={() => setIsExpanded(true)}
      >
        <img
          src={arcgisUrl}
          className="w-full h-full object-cover"
          width={width}
          height={height}
          alt="Satellite Map"
        />
      </div>

      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div className="relative bg-white rounded-lg p-4 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Mapa</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsExpanded(false)}
              >
                ✕
              </button>
            </div>
            <div className="relative">
              <img
                src={expandedArcgisUrl}
                className="w-full h-auto"
                alt="Expanded Satellite Map"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
