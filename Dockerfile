# Base image com Node.js 18
FROM node:20-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copiar arquivos essenciais para instalar dependências
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install

# Copiar todo o código do projeto para o container
COPY . .

# Expor a porta usada pelo SvelteKit
EXPOSE 5173

# Comando para iniciar o modo de desenvolvimento
CMD ["yarn", "dev", "--host"]
