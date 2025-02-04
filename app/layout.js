import { Inter } from "next/font/google";
import "./globals.css";
import { GameContextWrapper } from "@/components/GameContextWrapper";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "라이어 게임",
  description: "라이어 게임을 온라인으로 즐겨보세요!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="kr">
      <body
        className={`${inter.className} text-center p-8 bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white font-sans`}
      >
        <GameContextWrapper>
          <div className="max-w-lg mx-auto">{children}</div>
        </GameContextWrapper>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
