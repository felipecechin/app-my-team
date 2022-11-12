## Repositório modelo
Este repositório serve como template para criação de aplicações front-end utilizando as seguintes tecnologias:
- Next.js;
- React;
- Tailwind CSS.

O repositório já inclui:
- ESLint e algumas regras;
- SASS integrado;
- Estrutura de pastas para criação de componentes;
- Pasta `types` para criação de tipagens comuns a serem utilizadas na aplicação;
- Funções/utilidades na pasta `utils`:
  - `classNames` (utilizada no Tailwind);
  - `fetcher` (para chamadas à API);
  - classe `FetchError` (para causar `exception` ao ocorrer erro no `fetcher`);
  - funções para manipulação de cookies (`cookies.ts`);
  - Wrapper `withSSRAuth` para verificar se usuário está autenticado para exibir página `Server Side`.
- Arquivo `env.ts` dentro da pasta `src`;
- Arquivo `tsconfig.ts` com caminhos relativos (propriedade `paths`).

Faça bons códigos :)