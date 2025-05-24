import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar";
import { FooterSection } from "@/components/layout/sections/footer";
import { Toaster } from 'sonner';
import { getConfig } from "@/lib/config";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

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
    <html lang="pt-BR">
      <body className={cn(poppins.className, "min-h-screen bg-background antialiased")}>
        <Navbar />
        {children}
        <FooterSection />
        <Toaster />
      </body>
    </html>
  );
}
