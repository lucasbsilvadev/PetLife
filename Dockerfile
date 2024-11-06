# Usando uma imagem base oficial do Node.js
FROM node:16

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos do projeto para dentro do container
COPY . .

# Instalando as dependências do projeto
RUN npm install

# Expondo a porta em que o app vai rodar
EXPOSE 5000

# Comando para rodar o app
CMD ["npm", "start"]
