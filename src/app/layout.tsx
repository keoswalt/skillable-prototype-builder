import type { Metadata } from "next";
import { Inter, Lora } from 'next/font/google';
import "./globals.css";
import "./theme/index.css";
import PrimaryNav from "@/components/navigation/PrimaryNav";
import ThemeInitializer from "@/app/theme/ThemeInitializer";

// Initialize fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: "Skillable Prototype Builder",
  description: "Product design resource for the internal Skillable team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      <head />
      <body>
        <ThemeInitializer />
        <PrimaryNav />
        {children}
      </body>
    </html>
  );
}
