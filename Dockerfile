# Usa a imagem oficial do Node.js 22 (versão slim para reduzir o tamanho)
FROM node:22-slim

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia apenas os arquivos necessários para instalar as dependências
COPY package.json package-lock.json ./

# Instala apenas as dependências de produção
RUN npm ci --omit=dev

# Copia apenas o necessário para rodar a aplicação
COPY . .

# Define a variável de ambiente para produção
ENV NODE_ENV=production

# Expõe a porta que o serviço irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
