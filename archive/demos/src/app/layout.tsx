import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navigation, { NavigationItem } from "@/organisms/Navigation";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ColorOfLight Demos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-row h-screen">
          <Navigation className="basis-64 grow-0 shrink-0">
            <NavigationItem to="/webgpu-conway">
              WebGPU Conway&apos;s Game
            </NavigationItem>
          </Navigation>
          <main className="grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
