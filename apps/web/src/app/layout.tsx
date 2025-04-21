import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SuperTokensProvider } from "@/providers/supertokens-provider";
import Link from "next/link";
import { FetchApiRouteButton } from "@/components/fetch-api-route-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Supertokens Example",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <nav className="container">
            <Link className="btn" href="/">
              Home
            </Link>
            <Link className="btn" href="/public">
              Public page
            </Link>
            <Link className="btn" href="/private">
              Private page
            </Link>
            <FetchApiRouteButton route="/api/private">
              Private api route
            </FetchApiRouteButton>
            <FetchApiRouteButton route="/api/public">
              Public api route
            </FetchApiRouteButton>
          </nav>
        </header>
        <SuperTokensProvider>{children}</SuperTokensProvider>
      </body>
    </html>
  );
}
