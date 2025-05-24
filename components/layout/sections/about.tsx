"use client";
import Image from "next/image";
import { getAboutConfig } from "@/lib/config";
import { getConfig } from "@/lib/config";

export function AboutSection() {
  const config = getAboutConfig();
  const cores = getConfig().site.paletaCores;

  if (config.oculta) {
    return null;
  }

  return (
    <section id="about" className="relative sm:py-12 pt-12 overflow-hidden" style={{ background: config.corFundo }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 opacity-[0.05]">
        <Image
          src={config.imagemFundo || "/ice-texture.png"}
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: cores.primaria }}>
            {config.tituloHeader || "Sobre Nós"}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: config.corTexto }}>
            {config.titulo}
          </h3>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: cores.primaria }}></div>
          <p className="max-w-2xl mx-auto" style={{ color: config.corTexto }}>
            {config.descricao}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Left side - Image with decorative elements */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={config.imagemPrincipal}
                alt={config.altImagemPrincipal || "Imagem da empresa"}
                width={640}
                height={480}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {config.seloImagemPrincipal.texto && <span className="inline-block px-4 py-1 text-white text-sm font-semibold rounded-full mb-2" style={{ background: config.seloImagemPrincipal?.corFundo || cores.primaria }}>
                  {config.seloImagemPrincipal?.texto || "Excelência"}
                </span>}
                <h4 className="text-white text-2xl font-bold">{config.textoImagemPrincipal || "Nossa Empresa"}</h4>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 rounded-tl-xl" style={{ borderColor: `${cores.primaria}30` }}></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 rounded-br-xl" style={{ borderColor: `${cores.primaria}30` }}></div>
          </div>

          {/* Right side - About text content */}
          <div>
            <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
              {/* Accent color top border */}
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: cores.primaria }}></div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {config.texto}
              </p>
              
              {config.textoDestaque && (
                <p className="text-gray-300 text-lg leading-relaxed">
                  <span className="font-bold">{config.textoDestaque}</span>
                </p>
              )}
              
              {/* Bottom decorative element */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: cores.primaria }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 