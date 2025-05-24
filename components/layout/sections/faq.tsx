"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { getFAQConfig } from "@/lib/config";

interface FAQItem {
  pergunta: string;
  resposta: string;
  valor: string;
}

export const FAQSection = () => {
  const config = getFAQConfig();

  if (config.oculta) {
    return null;
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      phone: Phone,
      // Adicione mais ícones conforme necessário
    };
    return icons[iconName] || Phone;
  };

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: config.corFundo }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <Image
          src={config.imagemFundo}
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: config.corPrimaria }}>
            {config.tituloHeader}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: config.corTexto }}>
            {config.titulo}
          </h3>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: config.corPrimaria }}></div>
          <p className="max-w-2xl mx-auto" style={{ color: config.corTexto }}>
            {config.subtitulo}
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-8 relative">
          {/* Accent color top border */}
          <div className="absolute top-0 left-0 right-0 h-1" style={{ background: config.corPrimaria }}></div>
          
          <Accordion
            type="single"
            collapsible
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {config.itens.map((item: FAQItem) => (
              <AccordionItem key={item.valor} value={item.valor} className="border-0 py-4">
                <AccordionTrigger 
                  className={`text-left font-medium transition-colors hover:text-[${config.corPrimaria}]`}
                  style={{ 
                    color: config.corTexto
                  }}
                >
                  {item.pergunta}
                </AccordionTrigger>

                <AccordionContent className="text-gray-500 dark:text-gray-400 leading-relaxed pt-2">
                  {item.resposta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Additional help */}
        <div className="mt-12 text-center">
          <p className="mb-4" style={{ color: config.corTexto }}>
            {config.ajuda.texto}
          </p>
          <Link 
            href={config.ajuda.botao.link}
            className="inline-flex items-center px-6 py-3 rounded-md transition-colors"
            style={{ 
              background: config.ajuda.botao.corFundo,
              color: config.ajuda.botao.corTexto
            }}
          >
            {React.createElement(getIcon(config.ajuda.botao.icone), { 
              className: "h-5 w-5 mr-2" 
            })}
            {config.ajuda.botao.texto}
          </Link>
        </div>
      </div>
    </section>
  );
};
