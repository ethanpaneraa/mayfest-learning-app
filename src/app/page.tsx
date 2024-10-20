import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log("SESION IN HOME", session);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Spotify Stats</h1>
      <p className="mb-8 text-xl">
        Discover insights about your Spotify listening habits
      </p>
      {session ? (
        <Link
          href="/dashboard"
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Go to Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          Get Started
        </Link>
      )}
    </div>
  );
}
