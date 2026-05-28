"use client"

import { usePathname } from "next/navigation";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/product/QuickViewModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Sheeezy Bazaar | Premium Marketplace</title>
        <meta name="description" content="Experience the finest curation of fashion, beauty, and more." />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased selection:bg-accent/30 selection:text-accent flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {!isAdmin && <Navbar />}
          <main className={isAdmin ? "flex-grow h-screen flex overflow-hidden" : "flex-grow pt-20"}>
            {children}
          </main>
          {!isAdmin && <Footer />}
          {!isAdmin && <MobileNav />}
          {!isAdmin && <CartDrawer />}
          {!isAdmin && <QuickViewModal />}
        </ThemeProvider>
      </body>
    </html>
  );
}
