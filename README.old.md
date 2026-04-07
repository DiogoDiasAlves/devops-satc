# devops-satc (Versão Anterior)

Projeto front-end desenvolvido com React e Vite.

## Resumo

- Aplicação React moderna com Vite para desenvolvimento local e build para produção.
- Consumo de APIs Open Source (Rick and Morty API e Open Trivia Database).
- Estrutura otimizada para DevOps/SRE com práticas de segurança e performance.

## Pré-requisitos

- Node.js (recomenda-se v16+)
- npm (ou yarn)

## Instalação

- Instale as dependências:

  ```bash
  npm install
  ```

## Scripts úteis

- Desenvolvimento (servidor local):

  ```bash
  npm run dev
  ```

  (abre em http://localhost:5173)

- Build para produção:

  ```bash
  npm run build
  ```

- Preview do build:

  ```bash
  npm run preview
  ```

## Dicas rápidas

- Edite `src/App.jsx` para começar o desenvolvimento.
- As rotas estão configuradas com React Router.
- Use Tailwind CSS para estilização.
- Para forçar rebuild de dependências, remova `node_modules` e rode `npm install` novamente.
- Use a extensão React Developer Tools no navegador para depuração.

## Estrutura do Projeto

```
src/
├── pages/
│   ├── HomePage.jsx
│   ├── RickAndMortyPage.jsx
│   └── TriviaPage.jsx
├── services/
│   ├── rickAndMortyService.js
│   └── triviaService.js
├── App.jsx
├── main.jsx
└── styles.css
```

## APIs Consumidas

- **Rick and Morty API**: https://rickandmortyapi.com/api
- **Open Trivia Database**: https://opentdb.com/api.php
