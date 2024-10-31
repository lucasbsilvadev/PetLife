instale as dependencias do projeto.

navegue no terminal ate o diretorio pelifet-backend usando

cd petlife-backend
npm install express dotenv jsonwebtoken bcrypt cors sequelize mysql2

teste o projeto (dentro do diretório petlife-backend) usando 

npm start



Quanto a criação das Tabelas
o sequelize cria automaticamente as tabelas quando você sincroniza o banco de dados, conforme o código no server.js:

sequelize.sync()
  .then(() => console.log('Tabelas criadas com sucesso!'))
  .catch(err => console.error('Erro ao sincronizar tabelas:', err));


  verifique o arquivo server.js caso esse trecho não esteja presente!

  happy coding :D