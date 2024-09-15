# Daily-Diet-API

Modelagem do banco de daods:

![image](https://github.com/user-attachments/assets/b70c8f8f-f043-4dbd-9200-8c0a7f6c427d)

Projeto de uma API feita me node.js utilizando fastify e typescript.
O projeto consiste em um organizador de dietas onde o usuario do sistema pode cadastrar as refeições que fez fora e dentro da dieta e receber um feedback com metricas com base no cadastro de suas refeições.

Dependencias utilizadas e suas verções:
 - "@fastify/cookie": "^9.4.0",
 - "@types/bcrypt": "^5.0.2",
 - "@types/node": "^22.5.4",
 - "bcrypt": "^5.1.1",
 - "dotenv": "^16.4.5",
 - "fastify": "^4.28.1",
 - "knex": "^3.1.0",
 - "sqlite3": "^5.1.7",
 - "zod": "^3.23.8"

### Como executar o projeto?

Siga os passos abaixo para a instalação do projeto em sua máquina:

1. Instale o [Git](https://git-scm.com/).
2. Instale o [Node.js](https://nodejs.org/en).
3. Clone o repositório do projeto com o comando `git clone https://github.com/Catalendas/Daily-Diet-API.git`.
4. Abra o terminal na pasta do projeto e execute o comando `npm i` para instalar as dependências do projeto.
5. Rode o comando `npm run dev` para executar o projeto em ambiente de desenvolvimento (a API utilizada será a que está em produção).

Para testar as rotas é preciso ter instalado o [insomnia](https://insomnia.rest/download) em sua maquina.
Após ter ele instalado é preciso mapear as rotas da api, utilie o arquivo chamado insomnia_model.json para faer a importação das rotas
dentro do insomnia.

