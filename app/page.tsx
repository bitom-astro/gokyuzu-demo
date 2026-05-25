"use client";

import { useEffect, useState } from "react";

export default function SkyAR() {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const handleOrientation = (event) => {
      // iOS Safari için absolute compass
      let alpha = event.alpha;

      if (typeof event.webkitCompassHeading !== "undefined") {
        alpha = event.webkitCompassHeading;
      }

      setHeading(alpha || 0);
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Basit yıldız kataloğu (simülasyon)
  const stars = [
    { x: 20, y: 30 },
    { x: 80, y: 60 },
    { x: 140, y: 120 },
    { x: 200, y: 180 },
    { x: 260, y: 140 },
  ];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden text-white">
      
      {/* SKY FIELD */}
      <div
        className="absolute inset-0"
        style={{
          transform: `rotate(${-heading}deg)`,
          transformOrigin: "center",
        }}
      >
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: "4px",
              height: "4px",
              left: `${s.x}px`,
              top: `${s.y}px`,
              opacity: 0.9,
            }}
          />
        ))}

        {/* Cassiopeia mock */}
        <svg className="absolute inset-0 w-full h-full">
          <polyline
            points="60,220 120,180 180,240 240,170 300,220"
            fill="none"
            stroke="#67e8f9"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* UI */}
      <div className="absolute top-6 left-6 right-6 text-center">
        <div className="bg-white/10 inline-block px-4 py-2 rounded-full backdrop-blur">
          Gökyüzü AR Demo
        </div>
        <div className="mt-3 text-sm text-slate-300">
          Telefonu gökyüzüne çevir
        </div>
      </div>

      {/* Compass */}
      <div className="absolute bottom-6 left-6 right-6 text-center">
        <div className="text-cyan-300 text-sm">
          Yön: {Math.round(heading)}°
        </div>
      </div>
    </div>
  );
}