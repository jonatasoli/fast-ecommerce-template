# Base image com Node.js 20
FROM node:20-alpine

# Diretório de trabalho no container
WORKDIR /app

# Copiar arquivos essenciais para instalar dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código do projeto para o container
COPY . .

# Expor a porta usada pelo SvelteKit
EXPOSE 5173

# Comando para iniciar o modo de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]
