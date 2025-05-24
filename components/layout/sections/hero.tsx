"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, Snowflake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { getHeroConfig, getConfig } from "@/lib/config";

const SecondaryButton = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const cores = getConfig().site.paletaCores;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center font-medium rounded-md px-8 py-2 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg group"
      style={{ 
        border: `1px solid ${cores.textoClaro}`,
        color: isHovered ? cores.escuro : cores.textoClaro,
        backgroundColor: isHovered ? cores.textoClaro : 'transparent'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <ArrowRight className="ml-2 size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
    </Link>
  );
};

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const config = getHeroConfig();
  const cores = getConfig().site.paletaCores;
  const whatsappConfig = getConfig().contato.whatsapp;

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Select appropriate image based on screen size only
  const imagePath = isMobile ? config.imagemMobile : config.imagemDesktop;

  return (
    <section className="w-full h-screen relative overflow-hidden">
      {/* Full screen background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src={imagePath}
          alt="Produto em alta qualidade"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Overlay editável */}
        <div 
          className="absolute inset-0 z-10" 
          style={{ 
            background: `${cores.escuro}80` // 50% de opacidade
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-20 container mx-auto h-full">
        <div className="flex flex-col h-full justify-center md:items-start md:max-w-2xl" style={{ color: cores.textoClaro }}>
          <div className="space-y-4">
            {/* Decorative line and snowflake logo */}
            <div className="flex items-center space-x-4">
              <div className="h-px w-16" style={{ background: `${cores.textoClaro}60` }}></div>
              <span className="uppercase tracking-widest text-sm font-light flex items-center" style={{ color: cores.textoClaro }}>
                {config.topheader}
              </span>
            </div>

            {/* Main title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              <span className="block drop-shadow-md px-3 rounded-md" style={{ color: cores.textoClaro }}>
                {config.titulo}
              </span>
              <span className="block relative drop-shadow-md px-3 rounded-md text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mt-2" style={{ color: cores.textoClaro }}>
                {config.subtitulo}
                <svg
                  className="absolute -bottom-2 -left-12 w-full md:-left-32"
                  height="4"
                  viewBox="0 0 200 4"
                >
                  <path
                    d="M1 2.5C50 1.5 100 1.5 199 3.5"
                    stroke={cores.primaria}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-md my-6 font-medium leading-relaxed" style={{ color: cores.textoClaro }}>
              {config.promotion && <span className="block mt-2 py-1 px-3 text-lg font-bold rounded-md border inline-flex items-center transform hover:scale-105 transition-all" 
                style={{ 
                  color: cores.textoClaro,
                  background: `${cores.primaria}30`,
                  borderColor: `${cores.primaria}30`
                }}>
                <Snowflake className="size-4 mr-2" /> {config.promotion}
              </span>}
              {config.observacao && <span className="block mt-2 text-md italic">{config.observacao}</span>}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 z-50">
              <Button
                size="lg"
                className="font-medium rounded-md px-8 group hover:bg-opacity-90 transition-all duration-300"
                style={{ 
                  background: cores.escuro,
                  color: cores.textoClaro,
                  boxShadow: `0 4px 14px ${cores.escuro}20`,
                  '&:hover': {
                    background: cores.primaria
                  }
                } as any}
                asChild
              >
                {config.linkBotao && <Link href={`https://wa.me/${whatsappConfig.numero}`}>
                  {config.textoBotao}
                  <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
                </Link>}
              </Button>
              {config.linkBotao2 && (
                <SecondaryButton href={`https://wa.me/${whatsappConfig.numero}`}>
                  {config.textoBotao2}
                </SecondaryButton>
              )}
            </div>
            <div className="flex flex-col items-center mt-32 sm:mt-48">
              <span className="text-sm tracking-widest uppercase font-medium block text-center" style={{ color: cores.textoClaro }}>
                Explore
              </span>
              <ArrowDown className="animate-bounce size-5 mx-auto mt-1" style={{ color: cores.textoClaro }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
