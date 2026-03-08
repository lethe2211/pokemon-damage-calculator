import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import NavBar from "../components/navbar";

export const metadata: Metadata = {
  title: "Pokemon SV Damage Calculator",
  description: "A damage calculator for Pokemon Scarlet/Violet",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pokemon SV Damage Calculator",
  },
  icons: {
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
