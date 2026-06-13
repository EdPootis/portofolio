import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://edpootis.vercel.app'),
  title: "Edmond Christian | Portfolio",
  description: "Portfolio of Edmond Christian, a Fullstack Developer focusing on Backend Architecture.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Edmond Christian | Portfolio",
    description: "Portfolio of Edmond Christian, a Fullstack Developer focusing on Backend Architecture.",
    images: [
      {
        url: "/preview_portofolio.png",
        width: 1200,
        height: 630,
        alt: "Edmond Christian Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Edmond Christian | Portfolio",
    description: "Portfolio of Edmond Christian, a Fullstack Developer focusing on Backend Architecture.",
    images: ["/preview_portofolio.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}