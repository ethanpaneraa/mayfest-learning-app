import "@/styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mayfest Learning App",
  description:
    "A learning app to teach, learn, and understand the technology stack for Mayfest Productions. Built with Next.js, Drizzle, Supabase, TypeScript, TailwindCSS, ShadcnUI.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <nav className="bg-green-500 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              Spotify Stats
            </Link>
            <div>
              {session ? (
                <>
                  <Link href="/dashboard" className="mr-4 text-white">
                    Dashboard
                  </Link>
                  <Link href="/api/auth/signout" className="text-white">
                    Logout
                  </Link>
                </>
              ) : (
                <Link href="/login" className="text-white">
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
