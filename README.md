# Bem Vindo

API REST criada com Node.js pelo [Maransatto](https://github.com/Maransatto) e modificada por [mim](https://github.com/kazordoon).

## Pré-requisitos
- Node.js
- MariaDB
- NPM / Yarn

## Instalação
- Clone o repositório: `git clone https://github.com/kazordoon/rest-api-node-js.git`
- Entre no diretório do projeto: `cd rest-api-node-js`
- Instale as dependências:
  - NPM: `npm i` | OBS: Se optar por instalar com o NPM, antes da instalação remova o arquivo `yarn.lock`
  - Yarn: `yarn`
  
## Configurando ambiente
Antes de criar o banco de dados, é necessário alterar as variáveis de ambiente. Primeiramente, renomeie o arquivo `.env.example` para `.env`. Em seguida, você deve alterar o valor das variáveis de ambiente contidas dentro do arquivo `.env` de acordo com o seu uso.


Como o dialeto do MariaDB não suporta criar o banco de dados diretamente pelo sequelize-cli, você terá que criar o banco diretamente pelo próprio sistema gerenciador de banco de dados com o comando:
- `CREATE DATABASE <nome_do_banco_de_dados> DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci;`


Em seguida você precisará executar as migrations geradas pelo sequelize-cli com o seguinte comando:
- Yarn: `yarn sequelize db:migrate`
- NPM: `npx sequelize db:migrate`


Agora que está tudo configurado, rode o comando `yarn dev` se você utilizou o yarn, ou o comando `npm run dev` caso tenha utilizado o NPM.

## Construído com
- [Node.js](https://nodejs.org/) - Ambiente de execução Javascript server-side
- [Express](https://expressjs.com/) - Web Framework minimalista
- [MariaDB](https://mariadb.org/) - Banco de Dados
- [Sequelize](https://sequelize.org/) - ORM (Object-relational mapping - Mapeamento objeto-relacional)
- [Dotenv](https://github.com/motdotla/dotenv/) - Carrega variáveis de ambiente no arquivo .env
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - Biblioteca que ajuda a criptografar senhas
- [Jsonwebtoken](https://github.com/auth0/node-jsonwebtoken/) - Implementação do Json Web Token
- [Multer](https://github.com/expressjs/multer/) - Middleware para manipulação de `multipart/form-data`
- [Morgan](https://github.com/expressjs/morgan/) - Middleware para registrar as solicitações HTTP

  
## Agradecimentos

Gostaria de te agradecer por chegar até aqui. Espero que você possa adquirir um bom conhecimento e compartilhar com outros.

Este trabalho é o resultado de uma série de vídeo aulas **gratuitas** que tenho disponibilizadas no meu canal do youtube.

Já que está aqui, aproveite e se inscreva, e apoie este trabalho que eu faço com tanto zelo.

[CLIQUE AQUI PARA VISITAR A PLAYLIST](https://www.youtube.com/watch?v=hAAj27hgPFg&list=PLWgD0gfm500EMEDPyb3Orb28i7HK5_DkR&index=2&t=0s)
