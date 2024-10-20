import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import {
  getSpotifyUserProfile,
  getSpotifyUserPlayList,
  getSpotifyUserListeningHistory,
} from "@/utils/spotify";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  console.log("SESSION IN DASHBOARD", session);
  if (!session) {
    redirect("/login");
  }

  try {
    const [profile, playlist, recentlyPlayed] = await Promise.all([
      getSpotifyUserProfile(),
      getSpotifyUserPlayList(),
      getSpotifyUserListeningHistory(),
    ]);

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
                  <h3 className="font-bold">{playlist.name}</h3>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Recently Played</h2>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentlyPlayed.items.slice(0, 10).map((track) => (
                <li key={track.track.id} className="rounded bg-gray-100 p-4">
                  <h3 className="font-bold">{track.track.name}</h3>
                  <p className="text-sm text-gray-500">{track.played_at}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    );
  } catch (error) {
    console.log("Error while fetching dashboard data", error);
    return <div>Error while fetching dashboard data. Please try again</div>;
  }
}
