USE ESSE REPOSITORIO DE TEMPLATE PARA CRIAR O SEU SITE (SOLTECH TEAM)
# template-shadcn

# Template Site

Este é um template de site e-commerce desenvolvido com Next.js, TypeScript, Tailwind CSS e outras tecnologias modernas.

## Funcionalidades

- Autenticação de usuários
- Painel administrativo
- Gerenciamento de produtos
- Gerenciamento de pedidos
- Gerenciamento de cupons
- Integração com MercadoPago
- Integração com Correios/Melhor Envio
- Integração com WhatsApp Business API

## Tecnologias

- Next.js 14
- TypeScript
- Tailwind CSS
- Chart.js
- JSON Web Token
- ESLint
- Prettier

## Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/template-site.git
```

2. Instale as dependências:
```bash
cd template-site
npm install
```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
JWT_SECRET=sua-chave-secreta
MERCADOPAGO_ACCESS_TOKEN=seu-token-do-mercadopago
WHATSAPP_API_TOKEN=seu-token-do-whatsapp
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Estrutura do Projeto

```
template-site/
├── app/                    # Páginas e rotas da aplicação
│   ├── admin/             # Páginas do painel administrativo
│   ├── api/               # Rotas da API
│   └── login/             # Página de login
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e configurações
│   ├── contexts/         # Contextos do React
│   ├── services/         # Serviços e integrações
│   └── types/            # Tipos TypeScript
├── public/               # Arquivos estáticos
└── styles/              # Estilos globais
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a versão de produção
- `npm start` - Inicia o servidor de produção
- `npm run lint` - Executa o ESLint
- `npm run format` - Executa o Prettier

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
