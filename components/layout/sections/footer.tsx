"use client";
import React from "react";
import { Phone, Mail, Instagram, ExternalLink, MapPin, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getFooterConfig } from "@/lib/config";

interface NavItem {
  texto: string;
  link: string;
}

interface ContatoItem {
  texto: string;
  link: string;
  icone: string;
}

export const FooterSection = () => {
  const config = getFooterConfig();
  const currentYear = new Date().getFullYear();

  if (config.oculta) {
    return null;
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      phone: Phone,
      mail: Mail,
      instagram: Instagram,
      facebook: Facebook,
      "external-link": ExternalLink,
      "map-pin": MapPin
    };
    return icons[iconName] || Phone;
  };

  return (
    <footer
      id="footer"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ 
        background: config.corFundo, 
        color: config.corTexto,
        '--cor-primaria': config.corPrimaria
      } as React.CSSProperties}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <Image
          src={config.imagemFundo}
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Logo and main info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <div className="flex items-center group">
                <div 
                  className="relative p-1.5 rounded-lg border-2 transition-all duration-300 mr-3"
                  style={{ 
                    background: config.corFundo,
                    borderColor: `${config.corPrimaria}20`
                  }}
                >
                  <Image 
                    src={config.logo.imagem}
                    alt={config.logo.alt}
                    width={50} 
                    height={50} 
                    className="w-14 h-14 group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div 
                    className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2"
                    style={{ borderColor: config.corPrimaria }}
                  ></div>
                  <div 
                    className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2"
                    style={{ borderColor: config.corPrimaria }}
                  ></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-light tracking-wider" style={{ color: config.corTexto }}>
                    {config.logo.texto.split(config.logo.textoDestaque)[0]}
                    <span style={{ color: config.corPrimaria, fontWeight: 'bold' }}>
                      {config.logo.textoDestaque}
                    </span>
                  </span>
                  <span className="text-xs tracking-wider" style={{ color: `${config.corTexto}80` }}>
                    {config.logo.slogan}
                  </span>
                </div>
              </div>
            </Link>

            <p className="max-w-md leading-relaxed text-sm select-text" style={{ color: `${config.corTexto}80` }}>
              {config.descricao}
            </p>
          </div>

          {/* Navigation and Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="tracking-wider text-sm font-medium mb-4" style={{ color: config.corPrimaria }}>
                  {config.navegacao.titulo}
                </h3>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {config.navegacao.itens.map((item: NavItem, index: number) => (
                    <React.Fragment key={item.link}>
                      <li>
                        <Link
                          href={item.link}
                          className="text-sm transition-colors cursor-pointer hover:text-[var(--cor-primaria)]"
                          style={{ color: `${config.corTexto}80` }}
                        >
                          {item.texto}
                        </Link>
                      </li>
                      {index < config.navegacao.itens.length - 1 && (
                        <li style={{ color: `${config.corTexto}40` }}>|</li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="tracking-wider text-sm font-medium mb-4" style={{ color: config.corPrimaria }}>
                  {config.contato.titulo}
                </h3>
                <ul className="space-y-3">
                  {config.contato.itens.map((item: ContatoItem) => {
                    const Icon = getIcon(item.icone);
                    return (
                      <li key={item.link}>
                        <a 
                          href={item.link}
                          target={item.link.startsWith('http') ? '_blank' : undefined}
                          rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm transition-colors flex items-center cursor-pointer hover:text-[var(--cor-primaria)]"
                          style={{ color: `${config.corTexto}80` }}
                        >
                          <Icon className="h-4 w-4 mr-2" style={{ color: config.corPrimaria }} />
                          <span className="select-text">{item.texto}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div 
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center"
          style={{ borderColor: `${config.corTexto}20` }}
        >
          <div className="text-sm mb-4 md:mb-0 select-text" style={{ color: `${config.corTexto}60` }}>
            &copy; {currentYear} {config.logo.texto}. {config.copyright.texto}
          </div>

          <div className="text-sm flex items-center" style={{ color: `${config.corTexto}60` }}>
            <span className="select-text">{config.copyright.desenvolvedor.texto}</span>
            <a
              href={config.copyright.desenvolvedor.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1.5 hover:underline flex items-center cursor-pointer"
              style={{ color: config.corPrimaria }}
            >
              <span className="select-text">{config.copyright.desenvolvedor.nome}</span>
              {React.createElement(getIcon(config.copyright.desenvolvedor.icone), { 
                className: "ml-1 h-3 w-3" 
              })}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
