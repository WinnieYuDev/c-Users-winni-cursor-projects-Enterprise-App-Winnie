import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/lib/convex";
import { GlobalChat } from "@/components/GlobalChat";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ThermoGuard — Cold Chain Compliance",
  description: "ThermoGuard helps companies that ship food and pharmaceuticals monitor cold chain compliance, detect excursions, and maintain audit-ready records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ConvexClientProvider>
          {children}
          <GlobalChat />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
