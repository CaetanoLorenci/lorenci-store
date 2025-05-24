import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { icons } from "lucide-react";
import { Icon } from "@/components/ui/icon";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
  icon: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Fornecimento para Eventos",
    description:
      "Atendimento especializado para festas, casamentos e eventos corporativos com entrega programada e quantidades personalizadas.",
    pro: 0,
    icon: "PartyPopper",
  },
  {
    title: "Serviço para Bares & Restaurantes",
    description:
      "Fornecimento contínuo para estabelecimentos comerciais com programação de entregas regulares e preços especiais para parcerias.",
    pro: 0,
    icon: "UtensilsCrossed",
  },
  {
    title: "Atendimento Residencial",
    description:
      "Entrega rápida para residências com pedidos mínimos de 5kg, ideal para reuniões familiares e pequenas comemorações.",
    pro: 0,
    icon: "Home",
  },
  {
    title: "Esculturas de Gelo",
    description:
      "Criação de peças decorativas esculpidas em gelo para eventos especiais, com designs personalizados e entrega com instalação.",
    pro: 1,
    icon: "Snowflake",
  },
];

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]">
        <Image
          src="/ice-pattern.png"
          alt=""
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      
      <div className="container px-4 mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium text-[#29ABE2] uppercase tracking-wider mb-2">
            SERVIÇOS ESPECIALIZADOS
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Soluções Completas <span className="text-[#29ABE2]">em Gelo</span>
          </h3>
          <div className="w-24 h-1 bg-[#29ABE2] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Atendemos diferentes necessidades com a mesma qualidade e compromisso, 
            garantindo o fornecimento ideal para cada tipo de cliente.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full lg:w-[80%] mx-auto">
          {serviceList.map(({ title, description, pro, icon }, index) => (
            <div
              key={title}
              className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Accent color top border */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-[#29ABE2]`}></div>
              
              {/* Numbered tag */}
              <div className="absolute top-3 right-3 bg-[#29ABE2]/10 text-[#29ABE2] text-xs font-medium py-1 px-2 rounded tracking-wider">
                {ProService.YES === pro ? "DESTAQUE" : (index + 1).toString().padStart(2, '0')}
              </div>
              
              {/* Icon and title */}
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
        
        {/* Additional service information */}
        <div className="mt-16 bg-[#29ABE2]/5 rounded-lg p-8 border border-[#29ABE2]/20 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="bg-[#29ABE2]/20 p-4 rounded-full">
              <Icon
                color="#29ABE2"
                name="Info"
                size={32}
                className="text-[#29ABE2]"
              />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Serviços Personalizados</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Não encontrou o serviço que procura? Entre em contato conosco para discutir soluções personalizadas 
                para suas necessidades específicas. Atendemos desde pequenos eventos até grandes demandas comerciais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
