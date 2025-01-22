import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

// Configure the Quicksand font
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Election AMEES",
  description: "Presidence de L'AMEES",
};

// RootLayout must match the expected signature
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={quicksand.variable}>
        {children}
      </body>
    </html>
  );
}
