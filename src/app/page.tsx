import { getServerSession } from "next-auth/next";
import { type Session } from "next-auth";
import { authOptions } from "@/server/auth";
import AnimatedHomePage from "@/components/AnimatedHomePafe";

export default async function HomePage() {
  const session: Session | null = await getServerSession(authOptions);

  return <AnimatedHomePage session={session} />;
}
