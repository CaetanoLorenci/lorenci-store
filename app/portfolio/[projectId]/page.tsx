import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  galleryImages: string[];
  year: string;
  location: string;
  client: string;
  area: string;
};

// Exemplo de dados para um projeto específico
// Na implementação real, você buscaria esses dados de uma API ou banco de dados
const getProjectById = (id: string): Project | undefined => {
  const projects: Record<string, Project> = {
    "projeto-1": {
      id: "projeto-1",
      title: "Residência Horizonte",
      category: "Residencial",
      description:
        "Casa contemporânea com integração total à paisagem natural.",
      fullDescription:
        "Esta residência foi projetada para se integrar perfeitamente com o ambiente natural ao seu redor. Grandes janelas permitem a entrada de luz natural e oferecem vistas panorâmicas da paisagem. Os materiais naturais como madeira e pedra foram utilizados tanto no exterior quanto no interior, criando uma transição suave entre os ambientes internos e externos. A sustentabilidade foi um fator chave no projeto, com sistemas de captação de água da chuva, painéis solares e isolamento térmico eficiente.",
      imageUrl: "/portfolio/projeto1.jpg",
      galleryImages: [
        "/portfolio/projeto1-detalhe1.jpg",
        "/portfolio/projeto1-detalhe2.jpg",
        "/portfolio/projeto1-detalhe3.jpg",
        "/portfolio/projeto1-detalhe4.jpg",
      ],
      year: "2023",
      location: "São Paulo, Brasil",
      client: "Família Silva",
      area: "450m²",
    },
    // ... outros projetos
  };

  return projects[id];
};

export default function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  const project = getProjectById(params.projectId);

  // Fallback se o projeto não for encontrado
  if (!project) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h1 className="text-3xl font-bold mb-6">Projeto não encontrado</h1>
        <Button asChild>
          <Link href="/portfolio">Voltar para o portfólio</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto">
        {/* Navegação */}
        <div className="mb-8">
          <Button
            asChild
            variant="ghost"
            className="mb-6 hover:bg-transparent p-0 group"
          >
            <Link href="/portfolio">
              <ChevronLeft className="mr-2 size-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para o portfólio
            </Link>
          </Button>
        </div>

        {/* Header do projeto */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-sm">
              {project.category}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {project.year}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Imagem principal */}
        <div className="relative h-[70vh] w-full mb-16 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Detalhes e descrição completa */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Sobre o projeto</h2>
            <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-6">
            <h3 className="text-xl font-bold mb-4">Informações</h3>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  Cliente
                </dt>
                <dd className="font-medium">{project.client}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  Localização
                </dt>
                <dd className="font-medium">{project.location}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  Ano
                </dt>
                <dd className="font-medium">{project.year}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  Área
                </dt>
                <dd className="font-medium">{project.area}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Galeria de imagens */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Galeria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.galleryImages.map((image, index) => (
              <div key={index} className="relative h-80 overflow-hidden">
                <Image
                  src={image}
                  alt={`${project.title} - Imagem ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navegação para outros projetos */}
        <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/portfolio">Ver todos os projetos</Link>
            </Button>
            <Button asChild>
              <Link href="/contato">Entre em contato</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
