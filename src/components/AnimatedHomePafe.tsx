"use client";

import Link from "next/link";
import { type Session } from "next-auth";
import { Button } from "@/components/ui/button";
import { Music, BarChart2, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface AnimatedHomePageProps {
  session: Session | null;
}

export default function AnimatedHomePage({ session }: AnimatedHomePageProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <svg
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
          aria-hidden="true"
        >
          <motion.circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#gradient)"
            fillOpacity=".7"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <radialGradient
              id="gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7dd3fc" />
              <stop offset="1" stopColor="#1db954" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.div>

      <section className="relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-green-50 via-blue-50 to-white py-12 md:py-24 lg:py-32 xl:py-48">
        <motion.div
          className="bg-grid-pattern absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <motion.div
              className="space-y-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Discover Your Spotify Insights
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
                Uncover patterns in your listening habits and explore your music
                taste like never before.
              </p>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {session ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <motion.h2
            className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Music className="h-10 w-10 text-green-500" />}
              title="Top Artists"
              description="Discover your most-listened artists and how they've changed over time."
            />
            <FeatureCard
              icon={<BarChart2 className="h-10 w-10 text-green-500" />}
              title="Top Tracks"
              description="See your favorite songs and analyze your listening patterns."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-green-500" />}
              title="Listening History"
              description="Dive into your recent plays and track your musical journey."
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-green-50 py-12 md:py-24 lg:py-32">
        <div className="container px-4 text-center md:px-6">
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Ready to Explore Your Music?
          </motion.h2>
          <motion.p
            className="mx-auto mb-8 max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Join thousands of users who have discovered new insights about their
            music taste.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {session ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  View Your Stats
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-green-500 text-white hover:bg-green-600"
                >
                  Connect with Spotify
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </motion.div>
  );
}
