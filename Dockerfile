FROM node:22-slim

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copy only package files for dependencies
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy only required directories and files
COPY index.js .
COPY src/ src/
COPY config/ config/

# Expõe a porta que o serviço irá rodar
EXPOSE 3002

# Comando para iniciar a aplicação
CMD ["node", "index.js"]