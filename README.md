## Setup do projeto de backend

### Pré-requisitos

O que você precisa para configurar o projeto:

- [NPM](https://www.npmjs.com/)
- [Node](https://nodejs.org/en/) `>=22.0.0` (Instale usando [NVM](https://github.com/nvm-sh/nvm))
- [Docker Compose](https://docs.docker.com/compose/)

### Setup

1. Clone o Repositório:
   ```bash
   git clone https://github.com/DevDessanti/challenge.git
   ```
   ```bash
   cd challenge
   ```
2. Instale as dependências do projeto:
   ```bash
   nvm use && npm install
   ```
3. **Instale o Docker e o Docker Compose**, caso ainda não tenha.
4. Suba os serviços necessários (PostgreSQL e Redis) com:
   ```bash
   docker-compose up -d
   ```
5. Configure o banco de dados:
   ```bash
   npm run db:migrate && npm run db:seed
   ```
6. Inicie o servidor:
   ```bash
   npm run start:dev
   ```
7. Acesse o **Playground do GraphQL**:
   - 👉 [http://localhost:3000/graphql](http://localhost:3000/graphql)

### Tests

Para rodar os testes:

```bash
npm run test
```

### Migrations

Caso precise criar novas migrations, utilize o comando:

```bash
npm run db:create_migration --name=create-xpto-table
```

## Melhorias e Alterações Realizadas

Durante o desenvolvimento, implementamos várias melhorias, alinhadas aos objetivos de escalabilidade, segurança e evolução, conforme solicitado no desafio. Além disso, identificamos uma simplificação inesperada ao remover dependências desnecessárias, como o campo company_id. Abaixo, detalhamos cada aspecto:

### Escalabilidade

Operações Eficientes de Banco de Dados: Utilizamos TypeORM para gerenciar as interações com o banco de dados, o que melhora a escalabilidade ao oferecer operações eficientes e suporte a consultas complexas. Isso permite que o sistema lide com volumes crescentes de dados sem comprometer o desempenho, como detalhado na documentação do TypeORM.
Arquitetura Modular: O projeto foi estruturado em módulos, como ContentModule, facilitando a adição de novos recursos ou serviços sem impactar o sistema existente. Essa modularidade é essencial para suportar crescimento futuro, conforme boas práticas descritas na documentação do NestJS.

### Segurança

**Prevenção de Injeção SQL: Identificamos e corrigimos uma vulnerabilidade crítica no arquivo content.repository.ts. Anteriormente, o método findOne usava uma consulta SQL bruta vulnerável:

```bash
const [content] = await this.dataSource.query<Content[]>(
  `SELECT * FROM contents WHERE id = '${contentId}' AND deleted_at IS NULL LIMIT 1`,
)
```

**Essa abordagem era suscetível a injeção SQL, pois concatenava diretamente o contentId na string SQL. Substituímos por:

```bash
const content = await this.contentRepository.findOne({
  where: { id: contentId, deleted_at: null },
});
```

O TypeORM agora gerencia a parametrização, eliminando o risco de injeção SQL, conforme recomendado na documentação do TypeORM Secure Queries.
Validação de Entrada: Implementamos validações para tipos de conteúdo e extensões de arquivo no content.service.ts, garantindo a integridade dos dados e protegendo contra entradas maliciosas, alinhando-se às boas práticas de segurança do NestJS GraphQL.

## Evolução

Tipos de Conteúdo Extensíveis: O sistema suporta múltiplos tipos de conteúdo (texto, imagem, vídeo, etc.), definidos em CONTENT_TYPES. Novos tipos podem ser adicionados facilmente, expandindo a funcionalidade sem alterar a estrutura principal:

```bash
export const CONTENT_TYPES = {
  text: { formats: ['txt'], supported: true },
  pdf: { formats: ['pdf'], supported: true },
  video: { formats: ['mp4', 'mkv'], supported: true },
  image: { formats: ['jpg', 'jpeg', 'png', 'gif'], supported: true },
  audio: { formats: ['mp3', 'wav'], supported: true },
  link: { formats: ['url'], supported: true },
} as const;
```

Essa abordagem permite evoluir o sistema para suportar novos formatos, conforme descrito na documentação do GraphQL Schema.
Flexibilidade de Metadados: O campo metadata foi projetado para armazenar informações adicionais, permitindo que o sistema evolua para suportar novos requisitos sem mudanças no schema, usando o tipo GraphQL Metadata, facilitando a adaptação futura.
