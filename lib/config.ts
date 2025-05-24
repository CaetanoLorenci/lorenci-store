import configData from '../conteudo-template.json';

export type SiteConfig = typeof configData;

// Função utilitária para acessar as configurações
export const getConfig = (): SiteConfig => {
  return configData;
};

// Funções auxiliares para acessar seções específicas
export const getSiteConfig = () => getConfig().site;
export const getHeaderConfig = () => getConfig().header;
export const getHeroConfig = () => getConfig().hero;
export const getAboutConfig = () => getConfig().sobre;
export const getBenefitsConfig = () => getConfig().benefits;
export const getContactConfig = () => getConfig().contato;
export const getFooterConfig = () => getConfig().footer;
export const getFAQConfig = () => getConfig().faq;

// Exporta a configuração completa
export const config = getConfig(); 