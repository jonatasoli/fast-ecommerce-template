# Etapa 1: Build
FROM node:20-alpine as build

# Define o diretório de trabalho no container
WORKDIR /app

# Copia o arquivo de dependências (yarn.lock e package.json)
COPY package.json yarn.lock ./

# Copia o arquivo .env (que contém as variáveis de ambiente)
COPY .env .env

# Instala as dependências do projeto
RUN yarn install --frozen-lockfile

# Copia o restante do código para o container
COPY . .

# Faz o build do projeto
RUN yarn build


# Expõe a porta em que o app será acessado
EXPOSE 5173

# Comando para rodar o app em produção
CMD ["yarn", "preview", "--port", "5173", "--host"]
