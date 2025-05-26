'use client'

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Lora,
  Poppins,
  Montserrat,
} from "next/font/google";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { FooterSection } from "@/components/layout/sections/footer";
import { Toaster } from 'sonner';
import { getConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const config = getConfig();

export const metadata: Metadata = {
  title: config.site.nome,
  description: config.site.descricao,
  icons: {
    icon: config.header.logo.imagem,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className={cn("min-h-screen bg-background antialiased")}>
        <Navbar />
        {children}
        <FooterSection />
        <Toaster />
      </body>
    </html>
  );
}
