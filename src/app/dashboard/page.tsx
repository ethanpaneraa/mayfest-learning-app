import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  getSpotifyUserProfile,
  getSpotifyUserPlayList,
  getSpotifyUserListeningHistory,
} from "@/utils/spotify";
import Image from "next/image";

// const placeholderImage = "/path/to/placeholder-image.jpg"; // Update this path

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("SESSION IN DASHBOARD", session);
  if (!session) {
    redirect("/login");
  }

  const placeHolderImage = "https://iili.io/HlHy9Yx.png";

  try {
    const [profile, playlist, recentlyPlayed] = await Promise.all([
      getSpotifyUserProfile(),
      getSpotifyUserPlayList(),
      getSpotifyUserListeningHistory(),
    ]);
    console.log("DATA IN DASHBOARD", { profile, playlist, recentlyPlayed });
    return (
      <>
        <div className="mb-8">
          <h1 className="mb-6 text-3xl font-bold">
            Welcome, {profile.display_name}
          </h1>
          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Your Playlist</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {playlist.items.slice(0, 6).map((playlist) => (
                <li key={playlist.id} className="rounded bg-gray-100 p-4">
                  <Image
                    src={playlist.images?.[0]?.url ?? placeHolderImage}
                    alt={playlist.name}
                    width={200}
                    height={200}
                  />
                  <h3 className="font-bold">{playlist.name}</h3>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Recently Played</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentlyPlayed.items.slice(0, 6).map((track) => (
                <li key={track.track.id} className="rounded bg-gray-100 p-4">
                  <Image
                    src={track.track.album.images?.[0]?.url ?? placeHolderImage}
                    alt={track.track.name}
                    width={200}
                    height={200}
                  />
                  <h3 className="font-bold">{track.track.name}</h3>
                  <p className="text-sm text-gray-500">
                    Played at: {new Date(track.played_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  } catch (error) {
    console.error("Error while fetching dashboard data", error);
    return <div>Error while fetching dashboard data. Please try again</div>;
  }
}
