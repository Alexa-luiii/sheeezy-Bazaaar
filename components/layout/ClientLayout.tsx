"use client"

import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/ui/QuickViewModal";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? "flex-grow h-screen flex overflow-hidden" : "flex-grow pt-20"}>
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <MobileNav />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <QuickViewModal />}
    </ThemeProvider>
  );
}
