# Au Que Mia

## Desenvolvimento

Para iniciar o ambiente de desenvolvimento, um arquivo `.env` deve ser criado na raíz do projeto e
deve conter as seguintes informações:

Os campos `<username>` e `<password>` devem ser substituidos pelo seu usuário no MongoDB Atlas com acesso ao cluster.

```
DATABASE_NAME=pet_shop
DB_CONNECTION=mongodb+srv://<username>:<password>@petshop-znlkk.mongodb.net/pet_shop?retryWrites=true&w=majority
HOST=127.0.0.1
API_PORT=5000
PORT=3000
```

Agora, com o terminal aberto na raíz do projeto, você deve instalar as depedências do projeto:

```
npm install
```

Para iniciar o servidor:

```
npm run server
```

E agora, em um terminal diferente, iniciando o front-end:

```
npm start
```

E com esses passos o website ja deve se mostrar disponível no endereço http://localhost:3000
