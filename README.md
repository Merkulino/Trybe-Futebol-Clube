# :construction: README em construção ! :construction:
# TFC - Trybe Futebol Clube

Projeto Trybe - Sistema de visualização e gerenciamento de partidas de futebol

Esse foi mais um projeto de Back End desenvolvido durante o curso de Desenvolvimento Fullstack na Trybe. O TFC, é uma projeto Fullstack de visualizações e gerenciamento de partidas e classificações de jogos de times de futebol. Nesse projeto, minha responsabilidade foi construir uma API robusta que integrou os dados do banco de dados ao Front End. Foi gratificante contribuir e visualizar essa integração com o Front End, criando um sistema de back end eficiente e fornecendo uma experiência fluida ao Front.

Também apliquei testes de integração no Backend utilizando a metodologia TDD (Test-Driven Development), com as bibliotecas Sinon, Mocha e Chai.


<!-- Olá, Tryber!
Esse é apenas um arquivo inicial para o README do seu projeto.
É essencial que você preencha esse documento por conta própria, ok?
Não deixe de usar nossas dicas de escrita de README de projetos, e deixe sua criatividade brilhar!
:warning: IMPORTANTE: você precisa deixar nítido:
- quais arquivos/pastas foram desenvolvidos por você; 
- quais arquivos/pastas foram desenvolvidos por outra pessoa estudante;
- quais arquivos/pastas foram desenvolvidos pela Trybe.
-->

### Funcionalidades

Utilizando Node.js, express e Typescript, criei essa API. Dentre as funcionalidades dessa API esta:

 - Visualizar classificações de times
    - Classificações Gerais
    - Classificações de times mandantes
    - Classificações de times visitantes
 - Visualizar Partidas de jogos em andamento ou finalizados
 - Login de usuario 
 - Login de usuario como admin
 
Com a validação do Token de usuario, é possivel:

 - Criar uma nova partida com times cadastrados no banco
 - Atualizar uma gols de uma partida
 - Atualizar status de uma partida (Finalizar partida) em andamento
 - Apagar uma publicação (Validando usuario da publicação)

Para criação, normalização e conexão com banco de dados MySQL, foi utilizado o ORM Sequelize, para auxiliar nessa conexão segura com o banco. Também utilzei o JWT para criação e validações de tokens de usuario. 

### Tecnologias, bibliotecas e habilidades usadas no back-end

 - TypeScript
 - Node.js
 - Express
 - ORM: Sequelize
 - MySQL
 - JWT (Json Web Token)
 - Validação com Joi 
 - Bcrypt
 - TDD: Sinon, Chai e Mocha
 - API Rest
 - Arquitetura em camada. MSC (Model, Service, Controller)
 - CRUD 
 - POO

Todos os arquivos desenvolvidos por mim estão dentro da pasta `app/backend`, os restantes, são arquivos de configuração ou arquivos desenvolvidos pela Trybe
### Como rodar 🚀

Caso queira executar esse projeto em sua máquina utilizando o docker, você pode:
 * Fazer o clone desse repositório 
 * Na pasta raiz do projeto, instale as dependências utilizando rodando em seu terminal `npm install:apps`
 * Com o docker instalado e inicializado, na pasta `./app` rode em seu terminal `docker-compose up -d`
 * Execute os containers criados `docker exec -it <container-name-frontend> sh`, `docker exec -it <container-name-backend> sh` e `docker exec -it <container-name-db> sh`
 * Com o container de front-end, ja inicializado, já é possivel abrir o frontend em `localhost:300`
 * No container do banco de dados, rode `mysql -u root -p` utilizando a senha configurada nas variaveis de ambiente do docker-compose.yml, `123456`
 * No container de back-end, rode `npm run dev`
 * Pronto! Agora só executar endpoints com as requisições configuradas no arquivo `src/app.js` ou fazer as requisições dos dados no frontend em `localhost:3000`
 
### Autor

**Melqui Brito de Jesus**

Linkedin: https://www.linkedin.com/in/melqui-brito/

Telegram: https://t.me/Merkulino

Email: Merkulino11@gmail.com
