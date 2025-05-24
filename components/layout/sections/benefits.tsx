"use client";
import { icons } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";
import { getBenefitsConfig } from "@/lib/config";
import { getConfig } from "@/lib/config";

interface BenefitItem {
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
}

export const BenefitsSection = () => {
  const config = getBenefitsConfig();
  const cores = getConfig().site.paletaCores;

  if (config.oculta) {
    return null;
  }

  return (
    <section id="benefits" className="relative pt-24 sm:pt-32 pb-2 overflow-hidden" style={{ background: config.corFundo }}>
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
        <div className="text-center mb-2">
          <h2 className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: cores.primaria }}>
            {config.tituloHeader || "Nossos Diferenciais"}
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: config.corTexto }}>
            {config.titulo}
          </h3>
          <div className="w-24 h-1 mx-auto rounded-full mb-6" style={{ background: cores.primaria }}></div>
          <p className="max-w-2xl mx-auto" style={{ color: config.corTexto }}>
            {config.subtitulo}
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {config.itens.map((item: BenefitItem, index: number) => (
            <div
              key={item.titulo}
              className="group relative rounded-lg overflow-hidden transition-all duration-300 border border-gray-100 p-6 pt-12 h-full hover:shadow-xl hover:-translate-y-1 bg-white"
            >
              {/* Accent color top border */}
              <div className="absolute top-0 left-0 right-0 h-1.5" style={{ background: item.cor }}></div>
              
              {/* Numbered tag */}
              <div className="absolute top-3 right-3 text-xs font-medium py-1 px-2 rounded tracking-wider" style={{ background: `${item.cor}10`, color: item.cor }}>
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#29ABE2] transition-colors">
                {item.titulo}
              </h3>

              <p className="text-gray-600 text-sm">{item.descricao}</p>

              {/* Bottom decorative element */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: item.cor }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
