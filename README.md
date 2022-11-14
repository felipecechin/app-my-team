## Aplicação Meu Time
Aplicação front-end criada para visualizar estatísticas de um time consumindo dados da [API Football](https://www.api-football.com/documentation-v3).

### Tecnologias utilizadas
Para a construção da aplicação, foram utilizadas as seguintes tecnologias:
- Next.js;
- React;
- Typescript.

Para estilização, foi utilizado Tailwind CSS.

### Execução

Depois de clonar o repositório e com o Node v16+, NPM e Yarn corretamente instalados, faça os seguintes passos:

1. Criar `.env` de acordo com o arquivo `.env.example` e definir a URL da API;
    - No meu caso, foi utilizada a URL https://v3.football.api-sports.io.
2. Executar comando `yarn` para instalar dependências;
3. Executar comando `yarn dev` par executar aplicação.
    - É preciso ter uma chave de acesso para o consumo de dados da API.