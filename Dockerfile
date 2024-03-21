# Use uma imagem oficial do MongoDB como imagem base
FROM mongo:latest

# Defina a variável de ambiente para o endereço do banco de dados MongoDB
ENV MONGO_URL=mongodb://localhost:27017/myapp

# Copie o script de configuração do MongoDB para o contêiner
COPY mongodb-setup.js .

# Execute o script de configuração do MongoDB
RUN mongo ${MONGO_URL} < ./mongodb-setup.js

# Exponha a porta do MongoDB para o host
EXPOSE 27017

# Inicie o servidor MongoDB
CMD ["mongod"]
