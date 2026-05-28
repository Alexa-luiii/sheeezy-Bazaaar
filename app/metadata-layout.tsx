import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sheeezy Bazaar | Premium Marketplace",
  description: "Experience the finest curation of fashion, beauty, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
