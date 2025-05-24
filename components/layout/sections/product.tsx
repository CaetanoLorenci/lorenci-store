"use client";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getConfig } from "@/lib/config";

export const ProductSection = () => {
  const config = getConfig().produto;
  const cores = getConfig().site.paletaCores;

  if (config.oculta) {
    return null;
  }

  return (
    <section id="produto" className="relative py-20 sm:pt-28 pb-2 overflow-hidden" style={{ background: config.corFundo }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <Image
          src={config.imagemFundo || "/salmao.png"}
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: cores.primaria }}>
            {config.titulo}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: config.corTexto }}>
            {config.subtitulo}
          </h3>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: cores.primaria }}></div>
          <p className="max-w-3xl mx-auto" style={{ color: config.corTexto }}>
            {config.descricao}
          </p>
        </div>

        {/* Main content with image and benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={config.imagemPrincipal || "/coco.png"}
                alt={config.textoImagemPrincipal || "Imagem do produto"}
                width={480}
                height={480}
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-4 py-1 text-white text-sm font-semibold rounded-full mb-2" style={{ background: config.seloImagemPrincipal?.corFundo || cores.primaria, color: config.seloImagemPrincipal?.corTexto || cores.textoClaro }}>
                  {config.seloImagemPrincipal?.texto || "Qualidade Premium"}
                </span>
                <h4 className="text-white text-2xl font-bold">{config.textoImagemPrincipal || "Produto em alta qualidade"}</h4>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 rounded-tl-xl" style={{ borderColor: `${cores.primaria}30` }}></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 rounded-br-xl" style={{ borderColor: `${cores.primaria}30` }}></div>
          </div>

          {/* Right side - Benefits */}
          <div className="space-y-8">
            <h4 className="text-2xl font-bold" style={{ color: config.corTexto }}>
              {config.beneficiosTitulo || "Benefícios Essenciais do Produto:"}
            </h4>
            
            <div className="space-y-6">
              {config.caracteristicas.map((carac, idx) => (
                <div className="flex gap-4" key={idx}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${carac.cor}10` }}>
                    <Check className="w-6 h-6" style={{ color: carac.cor }} />
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold mb-1" style={{ color: config.corTexto }}>{carac.titulo}</h5>
                    <p style={{ color: config.corTexto }}>{carac.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className="mt-4 group"
              style={{ background: config.botao?.corFundo || cores.primaria, color: config.botao?.corTexto || cores.textoClaro }}
              asChild
              size="lg"
            >
              <Link href={config.botao?.link || "#contact"}>
                {config.botao?.texto || "Solicite um Orçamento"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Applications section */}
        <div className="mb-16">
          <h4 className="text-2xl font-bold text-center mb-10" style={{ color: config.corTexto }}>
            {config.aplicacoesTitulo || "Aplicações Recomendadas"}
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {config.aplicacoes?.map((application, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-4 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <span className="text-sm font-medium text-white">{application}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment section with image gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side - Images */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {config.galeria?.map((img, idx) => (
              <div className="relative h-40 md:h-48 rounded-lg overflow-hidden" key={idx}>
                <Image 
                  src={img.imagem}
                  alt={img.alt}
                  fill 
                  className="object-cover" 
                />
              </div>
            ))}
          </div>

          {/* Right side - Commitment */}
          <div className="lg:col-span-3 bg-gray-800/50 rounded-2xl p-8">
            <h4 className="text-2xl font-bold mb-6" style={{ color: config.corTexto }}>
              {config.compromisso?.titulo || "Nosso Compromisso"}
            </h4>
            
            <div className="space-y-6">
              {config.compromisso?.itens?.map((item, idx) => (
                <div className="flex gap-4 items-start" key={idx}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ background: config.compromisso?.corNumero || cores.primaria }}>
                    {item.numero}
                  </div>
                  <div>
                    <h5 className="text-lg font-semibold mb-1" style={{ color: config.corTexto }}>{item.titulo}</h5>
                    <p style={{ color: config.corTexto }}>
                      {item.destaque ? (
                        <span className="block text-lg font-extrabold uppercase my-2 py-1 px-2 rounded border-l-4" style={{ color: item.destaque.corTexto, background: item.destaque.corFundo, borderColor: item.destaque.corBorda }}>{item.destaque.texto}</span>
                      ) : null}
                      {item.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {config.compromisso?.botao && (
              <div className="mt-8 pl-14">
                <Button 
                  variant="outline" 
                  className="border" 
                  style={{ borderColor: config.compromisso.botao.corBorda, color: config.compromisso.botao.corTexto, background: 'transparent' }}
                  asChild
                  onMouseOver={e => { e.currentTarget.style.background = config.compromisso.botao.corFundoHover; e.currentTarget.style.color = config.compromisso.botao.corTextoHover; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = config.compromisso.botao.corTexto; }}
                >
                  <Link href={config.compromisso.botao.link}>
                    {config.compromisso.botao.texto}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}; 