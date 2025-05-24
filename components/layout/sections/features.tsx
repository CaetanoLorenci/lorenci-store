import { icons } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import Image from "next/image";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "Snowflake",
    title: "Gelo Cristalino",
    description:
      "Produzido com água filtrada em múltiplas etapas, resultando em gelo transparente que não afeta o sabor das bebidas.",
  },
  {
    icon: "Truck",
    title: "Entrega Rápida",
    description:
      "Serviço de entrega para toda a região em veículos refrigerados que garantem a conservação da qualidade do gelo.",
  },
  {
    icon: "Scale",
    title: "Diversos Tamanhos",
    description:
      "Disponibilizamos desde pequenas quantidades para uso doméstico até grandes volumes para eventos e estabelecimentos comerciais.",
  },
  {
    icon: "HeartHandshake",
    title: "Atendimento Personalizado",
    description:
      "Suporte dedicado para entender suas necessidades específicas e fornecer a solução mais adequada para seu evento ou negócio.",
  },
  {
    icon: "Clock",
    title: "Disponibilidade 7 dias/semana",
    description:
      "Fornecemos gelo todos os dias da semana, incluindo feriados, para atender emergências e demandas não planejadas.",
  },
  {
    icon: "Medal",
    title: "Garantia de Qualidade",
    description:
      "Todo nosso gelo passa por rigoroso controle de qualidade e atende aos padrões sanitários exigidos pela legislação.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 -z-10">
        <div className="absolute inset-0 opacity-[0.03]">
          <Image
            src="/ice-pattern.png"
            alt=""
            fill
            className="object-cover"
            priority={false}
          />
        </div>
      </div>
      
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium text-[#29ABE2] uppercase tracking-wider mb-2">
            Por Que Escolher Nosso Gelo
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Qualidade que <span className="text-[#29ABE2]">Faz a Diferença</span>
          </h3>
          <div className="w-24 h-1 bg-[#29ABE2] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Com mais de 10 anos no mercado, nossa fábrica combina tecnologia, processos 
            rigorosos e compromisso com a excelência para entregar o melhor gelo da região.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map(({ icon, title, description }, index) => (
            <div
              key={title}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Numbered corner badge */}
              <div className="absolute top-0 right-0 bg-[#29ABE2]/10 text-[#29ABE2] text-xs px-2 py-1 rounded-bl-lg">
                {(index + 1).toString().padStart(2, '0')}
              </div>
              
              {/* Icon */}
              <div className="flex items-center mb-4">
                <div className="bg-[#29ABE2]/10 p-3 rounded-lg mr-4">
                  <Icon
                    color="#29ABE2"
                    name={icon as keyof typeof icons}
                    size={24}
                    className="text-[#29ABE2]"
                  />
                </div>
                <h3 className="text-lg font-bold group-hover:text-[#29ABE2] transition-colors">
                  {title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-500 dark:text-gray-400 text-sm pl-14">
                {description}
              </p>
              
              {/* Hover indicator line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#29ABE2] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-lg font-medium mb-6">
            Quer saber mais sobre nossos produtos e serviços?
          </p>
          <div className="inline-flex items-center justify-center bg-[#29ABE2] hover:bg-[#29ABE2]/90 text-white px-6 py-3 rounded-md font-medium transition-colors group">
            <span>Entre em contato conosco</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="ml-2 group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
