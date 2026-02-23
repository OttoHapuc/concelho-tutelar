# Diretrizes de Padronização do Sistema (Next.js + TS + Prisma + Postgres)

## 1. Objetivo

Este documento define padrões de arquitetura, organização de pastas, nomenclatura e boas práticas para desenvolvimento do sistema em **Next.js (App Router) com TypeScript**, **Prisma** e **PostgreSQL**, adotando:

- **Padrão PT-BR** (código e mensagens)
- **SOLID**
- **Lint + Prettier** (padronização automática)
- Organização modular para **Front (Dashboard)** e **API**

---

## 2. Stack e Convenções Gerais

### 2.1 Stack

- **Next.js** (App Router)
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**

### 2.2 Idioma e padrão PT-BR

- Funções, variáveis, arquivos e pastas em **português** (exceto nomes consagrados de libs, ex.: `route.ts`, `page.tsx`, `layout.tsx`).
- Mensagens retornadas (erros/sucesso) em **PT-BR** e padronizadas.

### 2.3 SOLID (obrigatório)

- **S**: cada arquivo/função deve ter responsabilidade única.
- **O**: evoluir por extensão, evitar alterar “núcleos” quando der para adicionar.
- **L/I/D**: respeitar contratos, interfaces, injeção por parâmetros onde fizer sentido.
- Evitar “Deus arquivos”: se cresceu demais, **quebrar em unidades menores**.

---

## 3. Qualidade: Lint, Prettier e Scripts

### 3.1 Lint + Prettier

- Lint deve falhar em:
  - imports fora do padrão / não usados
  - `any` sem justificativa
  - padrões inseguros/anti-patterns relevantes
- Prettier é obrigatório para formatação.

### 3.2 Scripts principais (obrigatórios)

#### `format`

- Deve executar formatação **somente do que foi modificado**.
- **Uso obrigatório após qualquer implementação**.

> Exemplo de intenção: formatar staged files ou diff recente.

#### `build`

- Deve validar se o sistema está de acordo com as especificações/configurações de funcionamento.
- Deve rodar: checagem TypeScript + build do Next + validações necessárias.

---

## 4. Estrutura do Front-end (Dashboard)

### 4.1 Estrutura base

O Front-end segue o padrão:

`src/app/(public)/*nome_modulo*/`
`src/app/dashboard/(modulos)/*nome_modulo*/`

Conteúdo esperado dentro de cada módulo:

- `components/`
  - Responsável por **todos os componentes específicos da página** do módulo.
  - **Nomenclatura obrigatória**:
    - `page.<nome_modulo>.<nome_componente>.tsx`
    - componentes complexos ou que escalam muito devem se transformar em um novo diretório
      /<nome_componente>
    - <nome_componente>.<nome_sub_componente>.tsx

- `validations/`
  - Responsável por conter **funções de validação**.
  - Validações devem **retornar formato padronizado** e mensagens de erro consistentes.
  - Evitar validação “solta”: preferir funções reutilizáveis e nomeadas.

- `actions/`
  - Responsável por conter **actions do módulo**.
  - **Nomenclatura obrigatória**:
    - `page-action.<nome_modulo>.<nome_action>.ts`
  - **Todas as exportações** devem ser centralizadas em:
    - `actions/index.ts`

- `page.tsx`
  - Página do módulo.
  - Deve importar componentes/validations/actions do módulo.
  - Evitar regra de negócio densa no `page.tsx`.

### 4.2 Regras de UI e organização

- Componentes devem ser pequenos e focados (SRP).
- Componentes “de tela” ficam no `components/` do módulo, não globais.
- Se algo virar “componente reutilizável do sistema”, criar pasta compartilhada (ex.: `src/components/`) **apenas quando o reuso for real**.

---

## 5. Estrutura da API (Auth por módulos)

### 5.1 Estrutura base

Padrão de rota:

`src/app/api/auth/(modulos)/*nome_modulo*/`

Dentro do módulo, seguir:

- `form/`
  - Responsável pelos dados de apresentação para inputs da tela.
  - Deve conter estruturas/objetos que definem:
    - campos
    - labels
    - placeholders
    - masks/opções quando aplicável
  - Não deve conter regra de negócio.

- `*acao_secundaria*/`
  - Pasta para **ações secundárias** do módulo.
  - Uso típico: manipulação de tabelas associadas onde o fluxo é **secundário e interno** ao módulo.
  - **Nome desta pasta normalmente é o nome da tabela** que receberá tratamentos específicos/associativos.
  - **Nomenclatura de actions obrigatória**:
    - `acao_secundaria-action.<nome_action>.ts`
  - **Todas as exportações** devem ser centralizadas em:
    - `index.ts`
  - A sub-rota pode conter rotas no mesmo padrão da rota principal.

- Arquivos de handlers por método:
  - Principal:
    - `get.ts`
    - `post.ts`
    - usados por `route.ts`
  - Por ID:
    - `[id]/get.ts`
    - `[id]/put.ts`
    - `[id]/deleted.ts`
    - usados por `[id]/route.ts`

### 5.2 Regras obrigatórias de banco (crucial)

- **Toda rota deve iniciar conexão** com o banco.
- **Ao finalizar deve fechar a conexão**.
- É proibido deixar conexão aberta após response.
- Preferir padronizar um helper (ex.: `withDb(...)`) para reduzir repetição e risco.

---

## 6. Tipagens (Types)

### 6.1 Pasta de types

- Pasta obrigatória: `src/types/`
- Deve conter:
  - `app/*nome_modulo*/` (tipos do Front)
  - `api/*nome_modulo*/` (tipos de request/response/DTO)

### 6.2 Index por agrupamento

- Todos os tipos devem ser agrupados e exportados por um:
  - `src/types/index.ts`
- E também por `index.ts` dentro de cada módulo quando fizer sentido.

---

## 7. Schemas (Validação e Contratos)

### 7.1 Pasta de schemas

- Pasta obrigatória: `src/shemas/` _(manter conforme especificado)_
- Estrutura:
  - `src/shemas/*nome_modulo*/`
  - Contém todos os schemas que atenderão as rotas da API.

### 7.2 Regras

- Schemas devem ser a fonte de verdade para:
  - validação de entrada (query/body/params)
  - normalização/transformação quando aplicável
- Mensagens de validação devem ser padronizadas (PT-BR) e reutilizáveis.

---

## 8. Padrão de Retorno e Erros (Padronização)

- Toda rota e validação deve retornar formato consistente.

Sugestão de contrato (exemplo):

- Sucesso:
  - `{ sucesso: true, mensagem: string, dados?: T }`
- Erro:
  - `{ sucesso: false, mensagem: string, erros?: Array<{ campo?: string, mensagem: string }> }`

> Importante: padronizar isso em `src/types/api/...` e reaproveitar.

---

## 9. Exportações e Índices

- `actions/index.ts` obrigatório no front por módulo.
- `acao_secundaria/index.ts` obrigatório na API quando existir subpasta secundária.
- `src/types/index.ts` obrigatório.
- Evitar imports “profundos” desnecessários; preferir importar via `index.ts` para padronização.

---
