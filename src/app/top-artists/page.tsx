import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import { getSpotifyTopArtists } from "@/utils/spotify";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TopArtistsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const placeHolderImage = "https://iili.io/HlHy9Yx.png";

  try {
    const topArtists = await getSpotifyTopArtists();
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Your Top Artists</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topArtists.items.map((artist) => (
            <Card key={artist.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={artist.images[0]?.url ?? placeHolderImage}
                  alt={artist.name}
                  width={400}
                  height={400}
                  className="h-48 w-full object-cover"
                />
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
  } catch (error) {
    console.error("Error while fetching top artists", error);
    return <div>Error while fetching top artists. Please try again</div>;
  }
}
