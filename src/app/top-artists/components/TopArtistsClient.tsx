"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const placeHolderImage = "https://iili.io/HlHy9Yx.png";

const timeRanges = [
  { value: "short_term", label: "Last 4 Weeks" },
  { value: "medium_term", label: "Last 6 Months" },
  { value: "long_term", label: "All Time" },
];

interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
  popularity: number;
}

interface TopArtistsClientProps {
  initialArtists: { items: Artist[] };
  onTimeRangeChange: (
    timeRange: "short_term" | "medium_term" | "long_term",
  ) => Promise<{ items: Artist[] }>;
}

export default function TopArtistsClient({
  initialArtists,
  onTimeRangeChange,
}: TopArtistsClientProps) {
  const [timeRange, setTimeRange] = useState("medium_term");
  const [artists, setArtists] = useState(initialArtists);

  const handleTimeRangeChange = async (
    value: "short_term" | "medium_term" | "long_term",
  ) => {
    setTimeRange(value);
    const newArtists = await onTimeRangeChange(value);
    setArtists(newArtists);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Top Artists</h1>
        <Select onValueChange={handleTimeRangeChange} defaultValue={timeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            {timeRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {artists.items.map((artist) => (
          <Card key={artist.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative h-64 w-full">
                <Image
                  src={artist.images[0]?.url ?? placeHolderImage}
                  alt={artist.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg">{artist.name}</CardTitle>
              <p className="text-sm text-gray-500">
                Popularity: {artist.popularity}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
