# Au Que Mia

## Desenvolvimento

Para iniciar o ambiente de desenvolvimento é necessária a instalação do _PostgresQL_ e a criação de
uma base de dados no mesmo.

Em sequiga, um arquivo `.env` deve ser criado na raíz do projeto e deve conter as seguintes informações:

```
DATABASE_NAME=[nome da sua base de dados]
DATABASE_USER=[nome do seu usuário no postgresql]
DATABASE_PASSWORD=[sua senha no postgresql]
HOST:127.0.0.1
API_PORT=5000
PORT=3000
```

Agora, com o terminal aberto da raíz do projeto, as seguintes instalações devem ser feitas:

```
npm i --no-save
npm i -g sequelize-cli
```

Em seguida, devemos ir para a pasta `api` para inicializar as migrações:

```
cd api/
sequelize db:migrate
```

De volta na raíz do projeto, podemos iniciar os serviços de front-end e back-end:

```
npm run server
```

Em um terminal diferente:

```
npm start
```

E com esses passos o website ja deve se mostrar disponível no endereço http://localhost:3000
