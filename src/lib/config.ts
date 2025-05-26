interface SiteConfig {
  site: {
    nome: string;
    descricao: string;
  };
  header: {
    logo: {
      imagem: string;
    };
  };
}

const config: SiteConfig = {
  site: {
    nome: "Lorenci Store",
    descricao: "Sua loja online de produtos exclusivos",
  },
  header: {
    logo: {
      imagem: "/logo.png",
    },
  },
};

export function getConfig(): SiteConfig {
  return config;
} 