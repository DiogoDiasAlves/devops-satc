# Frontend - React Application

## 📋 Descrição

Frontend moderno de aplicação React que consome **APIs Open Source** interessantes:

- **Rick and Morty API** - Explorar e buscar personagens da série
- **Open Trivia Database** - Quiz de trivia com diferentes categorias e dificuldades

Este projeto foi desenvolvido seguindo as melhores práticas de DevOps/SRE, com foco em performance, observabilidade e confiabilidade.

## 🚀 Tecnologias Utilizadas

- **React 18+** - Biblioteca JavaScript para construir interfaces
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool rápido e moderno
- **React Router** - Roteamento entre páginas
- **TailwindCSS** - Framework CSS utilitário
- **Axios** - Cliente HTTP para requisições
- **ESLint & Prettier** - Linting e formatação de código

## 📁 Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CharacterCard.tsx       # Card exibindo personagem
│   │   ├── CharacterModal.tsx      # Modal com detalhes do personagem
│   │   ├── TriviaCard.tsx          # Card de questão de trivia
│   │   ├── Loader.tsx             # Componente de carregamento
│   │   └── Error.tsx              # Componente de erro
│   ├── pages/
│   │   ├── HomePage.tsx           # Página inicial
│   │   ├── RickAndMortyPage.tsx   # Página de personagens
│   │   └── TriviaPage.tsx         # Página de quiz
│   ├── services/
│   │   ├── rickAndMortyService.ts # API Rick and Morty
│   │   └── triviaService.ts       # API de Trivia
│   ├── hooks/
│   │   └── useAsync.ts            # Hook customizado para requisições
│   ├── types/
│   │   └── api.ts                 # Tipos TypeScript das APIs
│   ├── assets/
│   │   └── styles/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## 🔧 Instalação

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn como gerenciador de pacotes
- Git

### Passos

1. **Clonar o repositório**

```bash
git clone <seu-repositorio>
cd frontend
```

2. **Instalar dependências**

```bash
npm install
```

3. **Configurar variáveis de ambiente**

```bash
cp .env.example .env.local
```

As variáveis já estão configuradas por padrão, mas você pode customizá-las no arquivo `.env.local`.

## 📊 Scripts Disponíveis

### Desenvolvimento

```bash
# Inicia o servidor de desenvolvimento
npm run dev

# Servidor estará disponível em http://localhost:5173
```

### Build

```bash
# Cria build de produção otimizado
npm run build

# Visualizar build localmente
npm run preview
```

### Qualidade de Código

```bash
# Verificar erros de linting
npm run lint

# Corrigir automaticamente erros
npm run lint:fix

# Formatar código com Prettier
npm run format

# Verificar formatação sem modificar
npm run format:check
```

## 🌐 APIs Utilizadas

### Rick and Morty API

**Endpoint Base:** `https://rickandmortyapi.com/api`

- **Personagens**: `GET /character`
- **Buscar**: `GET /character?name={name}`
- **Detalhes**: `GET /character/{id}`
- **Sem autenticação** ✅

**Exemplo de Resposta:**
```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive",
  "species": "Human",
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  "location": {
    "name": "Earth (C-137)"
  }
}
```

### Open Trivia Database

**Endpoint Base:** `https://opentdb.com/api.php`

- **Perguntas**: `GET /api.php?amount={amount}&difficulty={difficulty}&type={type}`
- **Sem autenticação** ✅

**Parâmetros:**
- `amount`: Número de perguntas (1-50)
- `difficulty`: easy, medium, hard
- `type`: multiple, boolean

## 💡 Características Principais

### 1. **Rick and Morty Explorer**

- 📑 Paginação de personagens
- 🔍 Busca por nome em tempo real
- 📋 Visualização de detalhes em modal
- 👥 Grid responsivo com 4 colunas (desktop)

### 2. **Quiz de Trivia**

- 🎯 Diferentes níveis de dificuldade
- 📚 Múltiplas categorias
- ✅ Feedback instantâneo de respostas
- 📊 Placar final com avaliação

### 3. **UI/UX**

- 🎨 Gradientes modernos e animações suaves
- 📱 Design totalmente responsivo
- ♿ Acessibilidade melhorada
- 🌙 Tema escuro por padrão

## 🔐 Padrões de Segurança

- ✅ **XSS Protection**: React escapa automaticamente
- ✅ **HTTPS Only**: Recomendado para produção
- ✅ **Secrets**: Variáveis sensíveis em `.env.local`
- ✅ **Input Validation**: Validação em formulários

## 📊 Hooks Customizados

### `useAsync`

Hook reutilizável para gerenciar estado de requisições:

```typescript
const { data, isLoading, error, execute } = useAsync<T>(
  asyncFunction,
  immediate // executar imediatamente
);
```

**Estados:**
- `idle` - Antes de começar
- `loading` - Requisição em andamento
- `success` - Requisição completada com sucesso
- `error` - Erro na requisição

## 🎨 Componentes Reutilizáveis

### CharacterCard

```typescript
<CharacterCard 
  character={character} 
  onClick={handleClick}
/>
```

### TriviaCard

```typescript
<TriviaCard
  question={question}
  selectedAnswer={selectedAnswer}
  onSelectAnswer={handleAnswer}
  showAnswer={showAnswer}
/>
```

### Loader

```typescript
<Loader message="Carregando..." />
```

### ErrorComponent

```typescript
<ErrorComponent 
  message="Erro ao carregar" 
  onRetry={retryFunction}
/>
```

## 🚢 Deploy

### Build para Produção

```bash
npm run build
```

Gera pasta `dist/` com arquivos otimizados.

### Docker

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Variáveis de Ambiente em Produção

```bash
VITE_RICKMORTY_API=https://rickandmortyapi.com/api
VITE_TRIVIA_API=https://opentdb.com/api.php
```

## 🧪 Testes

Estrutura pronta para testes:

```typescript
import { render, screen } from '@testing-library/react';
import CharacterCard from '../CharacterCard';

describe('CharacterCard', () => {
  it('deve renderizar o nome do personagem', () => {
    render(<CharacterCard character={mockCharacter} />);
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
  });
});
```

## 📈 Performance

### Otimizações Implementadas

- ✅ **Lazy Loading**: Componentes carregados sob demanda
- ✅ **Bundle Size**: Minimizado com Vite
- ✅ **Image Optimization**: Uso de URLs otimizadas
- ✅ **Caching**: Estratégia HTTP headers
- ✅ **Code Splitting**: Rotas com React.lazy

### Core Web Vitals

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

## 🔍 Debugging

### VS Code Extensions Recomendadas

- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **React Developer Tools** (Chrome Extension)

### Ativar Debug Mode

```typescript
// src/main.tsx
if (import.meta.env.DEV) {
  console.log('Modo desenvolvimento ativado');
}
```

## 📚 Recursos Úteis

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com)
- [Rick and Morty API](https://rickandmortyapi.com)
- [Open Trivia Database](https://opentdb.com)

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/seu-recurso`
2. Commit: `git commit -m "Add feature"`
3. Push: `git push origin feature/seu-recurso`
4. Abra um Pull Request

## 📝 Convenções de Código

- **Componentes**: PascalCase (MyComponent.tsx)
- **Funções**: camelCase (myFunction)
- **Constantes**: UPPER_SNAKE_CASE (MAX_ITEMS)
- **Pastas**: kebab-case (my-folder)
- **Tipos**: PascalCase + Type/Interface sufixo (UserType)

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 5173 already in use"

```bash
npm run dev -- --port 3000
```

### CORS Error

As APIs são CORS-enabled, mas se tiver problemas:

```typescript
// Configurar proxy em vite.config.ts
server: {
  proxy: {
    '/api': 'https://rickandmortyapi.com'
  }
}
```

## 📊 Métricas DevOps/SRE

### SLI (Service Level Indicators)

- **Disponibilidade**: 99.9%
- **Latência**: < 2 segundos
- **Taxa de Erro**: < 0.1%

### SLO (Service Level Objectives)

- **Uptime**: 99.9% por mês
- **P99 Latency**: 3 segundos
- **Error Rate**: < 1%

### Error Budget

Permitido 0,1% de downtime/erro por mês para inovação contínua.

## 📄 Licença

MIT

## ✉️ Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Entre em contato com a equipe DevOps

---

**Última atualização**: Março 2026
**Versão**: 0.1.0


