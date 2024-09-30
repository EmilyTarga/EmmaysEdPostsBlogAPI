# Documentação do Projeto Backend - EmmaysEdPostsBlogAPI

## Descrição do Projeto

O **EmmaysEdPostsBlogAPI** é o backend desenvolvido com **NestJS** para suportar um blog de posts educacionais, onde professores podem criar e editar posts, e alunos têm acesso para visualizar esses posts. Este projeto fornece os endpoints necessários para gerenciar **usuários** e **posts**, realizando autenticação e autorização de usuários, e persistência dos dados em um banco de dados **MongoDB**.

## Tecnologias Utilizadas

- **NestJS**: Framework para desenvolvimento de aplicações back-end escaláveis em Node.js.
- **TypeScript**: Linguagem de programação utilizada para adicionar tipagem estática ao código.
- **MongoDB**: Banco de dados NoSQL para armazenar os posts e os usuários.
- **Mongoose**: ORM (Object Relational Mapping) utilizado para a interação com o MongoDB.
- **JWT (JSON Web Token)**: Para autenticação baseada em tokens.
- **BCrypt**: Para hashing de senhas dos usuários.

## Nossa experiência desenvolvendo

Durante o desenvolvimento do **EmmaysEdPostsBlogAPI**, optamos por utilizar o **NestJS** em vez de frameworks mais minimalistas como **Express** ou **Fastify**, e essa escolha facilitou bastante o nosso trabalho, especialmente ao implementar os endpoints.

Logo de início, percebemos que o **NestJS** traz uma estrutura bem definida, baseada em módulos, controladores e serviços. Isso foi um grande alívio para a equipe, já que não precisávamos decidir ou organizar manualmente a arquitetura do projeto, como normalmente faríamos em **Express** ou **Fastify**. Com o Nest, tudo estava claro desde o começo, e cada parte do código tinha seu lugar: os controladores cuidavam das rotas, enquanto os serviços continham a lógica de negócio. Essa separação nos permitiu focar na implementação de funcionalidades e não perder tempo com a estruturação.

Outro ponto importante foi a integração nativa com **TypeScript**. Embora seja possível usar TypeScript tanto no **Express** quanto no **Fastify**, com o **NestJS** ele já vem pronto para isso. A tipagem estática nos ajudou muito. O Nest simplificou o processo de definir e validar esses tipos diretamente nos controladores e serviços.

Além disso, o **NestJS** tem uma excelente integração com **MongoDB** através do **Mongoose**, que foi o ORM escolhido para o nosso projeto. Em vez de configurar manualmente a conexão e a integração com o banco de dados, o Nest já traz módulos prontos para o **Mongoose**, o que nos permitiu definir nossos modelos e realizar as operações de banco de dados com menos esforço e mais organização.

A implementação de autenticação e autorização foi outra área em que o **NestJS** realmente brilhou. Em outros frameworks, precisaríamos integrar manualmente middlewares de autenticação, configurar o JWT e garantir que todas as rotas protegidas fossem verificadas corretamente. Com o **NestJS**, tivemos acesso ao módulo de **Guards**, que tornou a proteção dos endpoints muito mais fácil e consistente. Criamos um guard JWT que podia ser aplicado diretamente nos controladores ou rotas específicas, e o Nest garantiu que tudo fosse verificado antes de qualquer operação ser executada.

Além disso, a injeção de dependências nativa do **NestJS** foi uma grande vantagem. Conseguimos facilmente gerenciar os serviços que precisávamos em diferentes partes do sistema, sem precisar escrever código adicional para registrar e resolver essas dependências manualmente, como faríamos no **Express** ou **Fastify**. Isso foi especialmente útil ao desenvolver serviços reutilizáveis, como o serviço de autenticação ou o serviço de gerenciamento de posts.

Em resumo, o **NestJS** nos proporcionou um ambiente de desenvolvimento muito mais produtivo e organizado. Evitamos muitos problemas comuns de frameworks mais minimalistas, como a falta de organização e repetição de código. O Nest nos forneceu uma base sólida e ferramentas poderosas que nos permitiram focar mais nas funcionalidades específicas do projeto, em vez de perder tempo com a configuração manual de rotas, middlewares e segurança.

Optar pelo **NestJS** realmente acelerou o desenvolvimento e aumentou a qualidade do nosso código.

## Desafios

### Integração entre Autenticação JWT e Controle de Permissões

Implementar autenticação com JWT (JSON Web Tokens) foi um dos principais desafios. Garantir que apenas usuários autenticados pudessem acessar os endpoints protegidos exigiu a criação de middlewares eficientes para verificar o token em todas as requisições. Além disso, foi necessário implementar um controle de permissões que diferenciava professores de alunos, permitindo que apenas professores pudessem criar, editar e deletar posts, enquanto alunos tinham apenas acesso de leitura.

### Design Patterns

No início do projeto, seguir os design patterns foi um pouco desafiador para a equipe, especialmente porque estávamos acostumados a trabalhar com regras de arquitetura são menos rígidas. A estrutura baseada em módulos, controladores e serviços exigiu uma adaptação inicial, principalmente para manter a separação clara de responsabilidades e entender como funcionava a injeção de dependências. No entanto, à medida que avançamos no desenvolvimento, começamos a perceber os benefícios desse rigor arquitetural. A organização do código ficou muito mais clara e modular, o que facilitou a manutenção, a adição de novas funcionalidades e a colaboração entre os membros da equipe. Com o tempo, seguir esses padrões se tornou natural e nos permitiu entregar um sistema mais escalável e fácil de entender.

---

# Endpoints

## Users

1. **POST /user**

   - **Descrição**: Endpoint para registrar um novo usuário (professor ou aluno).
   - **Acesso**: Público

2. **POST /user/login**

   - **Descrição**: Endpoint para login de um usuário. Gera um token JWT para ser utilizado nas requisições protegidas.
   - **Acesso**: Público

3. **GET /user/{userId}**

   - **Descrição**: Obtém informações sobre um usuário específico pelo seu ID.
   - **Acesso**: Protegido (JWT necessário)
   - **Parâmetros**:
     - `userId`: O ID do usuário que se deseja buscar.

4. **PUT /user/{userId}**

   - **Descrição**: Atualiza os dados de um usuário existente.
   - **Acesso**: Protegido (JWT necessário)
   - **Parâmetros**:
     - `userId`: O ID do usuário a ser atualizado.

5. **DELETE /user/{userId}**
   - **Descrição**: Remove um usuário específico pelo seu ID.
   - **Acesso**: Protegido (JWT necessário)
   - **Parâmetros**:
     - `userId`: O ID do usuário a ser removido.

---

## Posts

1. **GET /posts**

   - **Descrição**: Retorna todos os posts cadastrados no blog.
   - **Acesso**: Público

2. **POST /posts**

   - **Acesso**: Protegido (JWT necessário, role de professor)

3. **GET /posts/{postId}**

   - **Descrição**: Retorna os detalhes de um post específico pelo seu ID.
   - **Acesso**: Público
   - **Parâmetros**:
     - `postId`: O ID do post.

4. **PUT /posts/{postId}**

   - **Descrição**: Atualiza um post existente. Apenas o professor que criou o post pode editá-lo.
   - **Acesso**: Protegido (JWT necessário, role de professor)
   - **Parâmetros**:
     - `postId`: O ID do post a ser atualizado.

5. **DELETE /posts/{postId}**

   - **Descrição**: Remove um post específico pelo seu ID.
   - **Acesso**: Protegido (JWT necessário, role de professor)
   - **Parâmetros**:
     - `postId`: O ID do post a ser removido.

6. **GET /posts/admin**

   - **Descrição**: Retorna todos os posts, com paginação, para fins de administração.
   - **Acesso**: Protegido (JWT necessário)
   - **Parâmetros**:
     - `limit`: Número de posts por página.
     - `page`: Número da página.

7. **GET /posts/search**

   - **Descrição**: Realiza uma busca de posts por uma palavra-chave.
   - **Acesso**: Público
   - **Parâmetros**:
     - `search`: Termo de busca.
     - `limit`: Número de posts por página.
     - `page`: Número da página.

8. **GET /posts/count**
   - **Descrição**: Retorna a contagem total de posts disponíveis no blog.
   - **Acesso**: Público
