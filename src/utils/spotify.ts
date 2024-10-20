import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1";

type SpotifyUserProfile = {
  display_name: string;
  email: string;
};

type SpotifyPlaylist = {
  items: Array<{
    id: string;
    name: string;
  }>;
};

type SpotifyTrack = {
  id: string;
  name: string;
};

type SpotifyListeningHistory = {
  items: Array<{
    track: SpotifyTrack;
    played_at: string;
  }>;
};

async function getAccessToken() {
  const session = await getServerSession(authOptions);
  return session?.accessToken;
}

async function spotifyFetch<T>(endpoint: string): Promise<T> {
  const accessToken = await getAccessToken();
  const response = await fetch(`${SPOTIFY_API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch from Spotify API: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function getSpotifyUserProfile(): Promise<SpotifyUserProfile> {
  return spotifyFetch<SpotifyUserProfile>("/me");
}

export async function getSpotifyUserPlayList(): Promise<SpotifyPlaylist> {
  return spotifyFetch<SpotifyPlaylist>("/me/playlists");
}

export async function getSpotifyUserListeningHistory(): Promise<SpotifyListeningHistory> {
  return spotifyFetch<SpotifyListeningHistory>("/me/player/recently-played");
}

export async function getSpotifyUserRecentlyPlayed(): Promise<SpotifyListeningHistory> {
  return spotifyFetch<SpotifyListeningHistory>("/me/player/recently-played");
}
