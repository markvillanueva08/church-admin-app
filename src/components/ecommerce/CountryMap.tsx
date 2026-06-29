// import { VectorMap } from "@react-jvectormap/core";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const VectorMap: any = dynamic(
  () => import("@react-jvectormap/core").then((mod) => mod.VectorMap as any),
  { ssr: false }
);

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

type MarkerStyle = {
  initial: {
    fill: string;
    r: number; // Radius for markers
  };
};

type Marker = {
  latLng: [number, number];
  name: string;
  style?: {
    fill: string;
    borderWidth: number;
    borderColor: string;
    stroke?: string;
    strokeOpacity?: number;
  };
};

const CountryMap: React.FC<CountryMapProps> = ({ mapColor }) => {
  const [mapData, setMapData] = useState<any | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const pkg = await import("@react-jvectormap/world");
        if (!mounted) return;
        setMapData((pkg && (pkg as any).worldMill) || (pkg && (pkg as any).default) || null);
      } catch (err) {
        // package not present — keep mapData null and render fallback
        setMapData(null);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!mapData) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center text-gray-500 dark:border-gray-800 dark:bg-white/3">
        <p>Map not available. Install @react-jvectormap/world to enable this feature.</p>
      </div>
    );
  }

  return (
    <VectorMap
      map={mapData}
      backgroundColor="transparent"
      markerStyle={
        {
          initial: {
            fill: "#465FFF",
            r: 4,
          },
        } as MarkerStyle
      }
      markersSelectable={true}
      markers={
        [
          {
            latLng: [37.2580397, -104.657039],
            name: "United States",
            style: {
              fill: "#465FFF",
              borderWidth: 1,
              borderColor: "white",
              stroke: "#383f47",
            },
          },
          {
            latLng: [20.7504374, 73.7276105],
            name: "India",
            style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
          },
          {
            latLng: [53.613, -11.6368],
            name: "United Kingdom",
            style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
          },
          {
            latLng: [-25.0304388, 115.2092761],
            name: "Sweden",
            style: {
              fill: "#465FFF",
              borderWidth: 1,
              borderColor: "white",
              strokeOpacity: 0,
            },
          },
        ] as Marker[]
      }
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;
