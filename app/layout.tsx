import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sheeezy Bazaar | Premium Marketplace",
  description: "Experience the finest curation of fashion, beauty, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-accent/30 selection:text-accent flex flex-col min-h-screen`}
      >
        <ClientLayout>
            {children}
        </ClientLayout>
      </body>
    </html>
  );
}
