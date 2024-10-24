import localFont from "next/font/local";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const notoSansJP = Noto_Sans_JP({
  preload: true,
  subsets: ["latin"],
  weight: ["100","400", "500", "700"],
});

export const metadata = {
  title: "Japanese Learning Game",
  description: "Learn Japanese characters through matching game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
