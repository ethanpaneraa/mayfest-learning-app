import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string; callbackUrl?: string };
}) {
  console.log("Login page is rendering", { searchParams });

  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-8 text-4xl font-bold">Login to Spotify Stats</h1>
      {searchParams.error && (
        <div className="mb-4 text-red-500">
          Error: {searchParams.error}. Please try again.
          <br />
          Full URL: {JSON.stringify(searchParams)}
        </div>
      )}
      <Link
        href="/api/auth/signin/spotify"
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
      >
        Sign in with Spotify
      </Link>
    </div>
  );
}
