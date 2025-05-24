"use client";
import { Building2, Grid2X2, Menu, X, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { getHeaderConfig, getConfig } from "@/lib/config";

interface RouteProps {
  href: string;
  label: string;
}

interface FeatureProps {
  title: string;
  description: string;
}

const routeList: RouteProps[] = [
  {
    href: "#produtos",
    label: "Produtos",
  },
  {
    href: "#benefits",
    label: "Diferenciais",
  },
  {
    href: "#features",
    label: "Por Que Nós",
  },
  {
    href: "#contact",
    label: "Pedidos",
  },
];

const featureList: FeatureProps[] = [
  {
    title: "Design Inovador",
    description:
      "Criamos espaços únicos que combinam estética, funcionalidade e inovação.",
  },
  {
    title: "Sustentabilidade",
    description:
      "Projetos comprometidos com práticas sustentáveis e eficiência energética.",
  },
  {
    title: "Experiência Personalizada",
    description:
      "Cada projeto é desenvolvido com base nas necessidades e visão específicas do cliente.",
  },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const config = getHeaderConfig();
  const cores = getConfig().site.paletaCores;
  const whatsappConfig = getConfig().contato.whatsapp;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`static top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'shadow-md backdrop-blur-sm py-3'
          : 'py-5'
      }`}
      style={{ 
        background: scrolled 
          ? `${cores.fundo}99` // Adiciona transparência de 60%
          : cores.fundo 
      }}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo com imagem e texto */}
          <Link href="/" className="flex items-center group">
            <div
              className="relative p-1.5 rounded-lg border-2 transition-all duration-300 mr-3"
              style={{
                background: cores.fundo,
                borderColor: cores.escuro
              }}
            >
              <Image
                src={config.logo.imagem}
                alt={config.logo.alt}
                width={100}
                height={100}
                className="w-20 h-20 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3" style={{ borderTop: `2px solid ${cores.escuro}`, borderLeft: `2px solid ${cores.escuro}` }}></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3" style={{ borderBottom: `2px solid ${cores.escuro}`, borderRight: `2px solid ${cores.escuro}` }}></div>
            </div>
            <div className="flex flex-col">
              <span
                className="text-4xl font-light tracking-wider"
                style={{ color: cores.texto }}
              >
                {config.logo.texto}
              </span>
              <span className="text-xs tracking-wider" style={{ color: cores.texto }}>{config.logo.slogan}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {config.menu.itens.map((item, index) => (
              <NavLink key={index} href={item.link} style={{ color: item.cor }}>
                {item.texto}
              </NavLink>
            ))}
        
          </div>

          {/* Mobile Menu Button - Only visible on mobile */}
          <div className="block md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
                <div className="flex flex-col h-full">
                  <div className="flex-1 py-6 px-2">
                    <div className="mb-8 flex items-center">
                      <Image 
                        src={config.logo.imagem}
                        alt={config.logo.alt}
                        width={40}
                        height={40}
                        className="h-16 w-16 mr-2"
                      />
                      <span className="text-xl font-light text-gray-900 dark:text-white">
                        {config.logo.texto.split('').map((char, i) => (
                          char === 'G' ? (
                            <span key={i} className="font-bold text-[#29ABE2]">{char}</span>
                          ) : char
                        ))}
                      </span>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      {config.menu.itens.map((item, index) => (
                        <MobileNavLink 
                          key={index} 
                          href={item.link} 
                          closeMenu={() => setMobileMenuOpen(false)}
                          style={{ color: item.cor }}
                        >
                          {item.texto}
                        </MobileNavLink>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                    <Link href={`https://wa.me/${whatsappConfig.numero}`} onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        className="w-full rounded-lg py-5 font-medium transition-all flex items-center justify-center gap-2"
                        style={{ 
                          background: cores.escuro,
                          color: cores.textoClaro,
                          '&:hover': {
                            background: cores.primaria
                          }
                        } as any}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Pedido Online</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ href, children, style }: { href: string; children: React.ReactNode; style?: React.CSSProperties }) => {
  const cores = getConfig().site.paletaCores;
  return (
    <Link
      href={href}
      className="relative px-4 py-3 font-medium transition-colors group"
      style={{ 
        color: style?.color || cores.texto,
        '--hover-color': cores.primaria,
        '&:hover': { color: cores.primaria }
      } as any}
    >
      {children}
      <span 
        className="absolute bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-2/3 group-hover:left-[15%]" 
        style={{ backgroundColor: cores.primaria }}
      ></span>
    </Link>
  );
};

const MobileNavLink = ({ 
  href, 
  children, 
  closeMenu,
  style
}: { 
  href: string; 
  children: React.ReactNode;
  closeMenu: () => void;
  style?: React.CSSProperties;
}) => {
  const cores = getConfig().site.paletaCores;
  return (
    <Link
      href={href}
      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
      style={{ 
        color: style?.color || cores.texto,
        '--hover-color': cores.primaria,
        '&:hover': { color: cores.primaria }
      } as any}
      onClick={() => {
        closeMenu();
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }}
    >
      {children}
    </Link>
  );
};
