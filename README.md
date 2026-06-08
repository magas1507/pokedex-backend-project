# Pokédex TypeScript Lite

## Sobre o projeto

O **Pokédex TypeScript Lite** é uma aplicação back-end desenvolvida com Node.js e TypeScript que roda exclusivamente pelo terminal. Ela consome a [PokeAPI](https://pokeapi.co), transforma os dados JSON em objetos tipados e gerencia um catálogo local de Pokémons em memória durante a execução.

Não há interface gráfica, banco de dados real ou servidor web — tudo roda no ambiente Node.js pelo terminal, demonstrando os fundamentos do desenvolvimento back-end moderno.

---

## Objetivo

Praticar os conceitos do Módulo 01:

- Node.js como ambiente de execução back-end
- TypeScript com tipagem forte e interfaces
- Consumo de API externa com `fetch`
- Funções assíncronas com `async/await`
- Tratamento de erros com `try/catch` e classes customizadas
- Programação Orientada a Objetos (classes, modificadores de acesso)
- Métodos de array: `map`, `filter`, `find`, `some`, `every`, `reduce`, `forEach`
- Arquitetura em camadas: controllers, services, models, utils
- Versionamento com Git e GitFlow

---

## Tecnologias utilizadas

| Tecnologia | Versão | Para quê |
|---|---|---|
| Node.js | v18+ | Ambiente de execução back-end |
| TypeScript | ^5.0 | Tipagem estática e segurança de código |
| TSX | ^4.0 | Executa arquivos `.ts` diretamente |
| node-fetch | ^3.0 | Requisições HTTP para a PokeAPI |
| PokeAPI | v2 | Fonte de dados externa dos Pokémons |
| Git + GitHub | — | Versionamento e entrega |

---

## Pré-requisitos

Antes de executar, você precisa ter instalado:

- [Node.js](https://nodejs.org) v18 ou superior
- npm (já vem com o Node.js)
- [Git](https://git-scm.com)

Verifique com:

```bash
node -v
npm -v
git --version
```

---

## Como instalar

Clone o repositório:

```bash
git clone https://github.com/magas1507/pokedex-backend-project.git
```

Acesse a pasta:

```bash
cd pokedex-typescript-lite
```

Instale as dependências:

```bash
npm install
```

---

## Como executar

```bash
npm run dev
```

ou

```bash
npm run start
```

---

## Estrutura do projeto

```
pokedex-typescript-lite/
│
├── src/
│   ├── main.ts                        # Ponto de entrada — instancia e executa a aplicação
│   │
│   ├── controllers/
│   │   └── TerminalController.ts      # Orquestra o fluxo completo no terminal
│   │
│   ├── services/
│   │   ├── PokeApiService.ts          # Integração com a PokeAPI via fetch + async/await
│   │   └── BoxService.ts              # Classe CatalogoPokemon — gerencia o catálogo local
│   │
│   ├── models/
│   │   ├── Pokemon.ts                 # Interfaces PokemonResumo e PokemonApiResponse
│   │   └── CustomErrors.ts            # Classes APIError e LocalBoxError
│   │
│   └── utils/
│       └── textFormatters.ts          # Funções puras de formatação de texto para o terminal
│
├── pc_box.json                        # Base de dados local inicializada com []
├── tsconfig.json                      # Configuração do compilador TypeScript (strict mode)
├── package.json                       # Scripts, dependências e metadados do projeto
├── .gitignore                         # Arquivos ignorados pelo Git
└── README.md                          # Documentação do projeto
```

---

## Explicação dos arquivos

### `src/models/Pokemon.ts`

Define as duas interfaces principais do projeto:

**`PokemonApiResponse`** — espelha a estrutura real da resposta da PokeAPI. Só mapeia os campos que o projeto usa, ignorando os demais:

```typescript
export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
}
```

**`PokemonResumo`** — objeto simplificado que o projeto usa internamente. Extrai só o necessário da resposta bruta da API:

```typescript
export interface PokemonResumo {
  id: number;
  name: string;
  type: string[];
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
}
```

---

### `src/models/CustomErrors.ts`

Classes de erro customizadas que estendem a classe nativa `Error` do JavaScript. Permitem identificar exatamente de onde veio o problema:

```typescript
export class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}

export class LocalBoxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocalBoxError";
  }
}
```

`Error` é uma classe nativa do JavaScript — não precisa de import. O `extends` faz herança, e o `super(message)` chama o construtor pai.

---

### `src/services/PokeApiService.ts`

Responsável por toda a comunicação com a PokeAPI. Contém a função `searchPokemon`:

- Recebe um nome ou ID como `string`
- Monta a URL: `https://pokeapi.co/api/v2/pokemon/{nameOrId}`
- Faz a requisição com `fetch` (via `node-fetch`)
- Verifica se a resposta foi bem-sucedida (`response.ok`)
- Mapeia os dados para `PokemonResumo`
- Usa `try/catch` para capturar erros sem quebrar a aplicação

**Métodos de array usados aqui:**
- `map` — transforma `types[]` da API em lista de strings de nomes
- `find` — localiza cada stat (`hp`, `attack`, `defense`) dentro do array `stats[]`

---

### `src/services/BoxService.ts`

Contém a classe `CatalogoPokemon`, que gerencia o catálogo local em memória:

| Atributo/Método | Acesso | Descrição |
|---|---|---|
| `pokemons` | `private` | Array interno que armazena os Pokémons |
| `addPokemon(pokemon)` | `public` | Adiciona um Pokémon, impedindo duplicata pelo `id` |
| `listPokemon()` | `public` | Exibe todos os Pokémons do catálogo |
| `remover(id)` | `public` | Remove um Pokémon pelo `id` |
| `calculateTotalWeight()` | `public` | Retorna a soma dos pesos de todos os Pokémons |
| `allHasName()` | `public` | Verifica se todos os registros têm nome |
| `searchByName(nome)` | `public` | Busca um Pokémon pelo nome |
| `total()` | `public` | Retorna a quantidade atual no catálogo |

**Métodos de array usados aqui:**
- `some` — verifica duplicidade antes de adicionar
- `forEach` — itera e exibe cada Pokémon na listagem
- `filter` — remove um Pokémon pelo id
- `reduce` — calcula o peso total
- `every` — valida que todos têm nome
- `find` — busca por nome

---

### `src/utils/textFormatters.ts`

Funções puras de formatação — não têm efeitos colaterais, apenas recebem dados e retornam strings formatadas:

- `formatPokemon(pokemon)` — formata um Pokémon para exibição no terminal
- `formatHeader(titulo)` — gera um cabeçalho decorativo com `=`
- `formatMessage(tipo, texto)` — formata mensagens com prefixo `[OK]`, `[ERRO]` ou `[AVISO]`

---

### `src/controllers/TerminalController.ts`

Camada de controle que orquestra todo o fluxo da aplicação. Recebe o `CatalogoPokemon` via **injeção de dependência** no construtor e executa os passos do demo em sequência.

---

### `src/main.ts`

Ponto de entrada da aplicação. Instancia as dependências e chama o controller:

```typescript
async function main(): Promise<void> {
  const catalog = new PokemonCatalog();
  const controller = new TerminalController(catalog);
  await controller.executeFlowDemo();
}

main();
```

---

## Funcionalidades

- Buscar Pokémon por nome ou ID via PokeAPI
- Tratar erro 404 (Pokémon inexistente) sem quebrar a aplicação
- Tratar erros de rede com classe customizada `APIError`
- Mapear resposta JSON da API para objeto TypeScript simplificado
- Adicionar Pokémon ao catálogo local em memória
- Impedir registro duplicado pelo `id`
- Listar todos os Pokémons do catálogo formatados
- Remover Pokémon pelo `id`
- Exibir estatísticas: total, peso total, validação de nomes
- Mensagens claras no terminal com prefixos `[OK]`, `[ERRO]`, `[AVISO]`

---

## Exemplos de execução

### Busca válida

Entrada testada:
```
pikachu
```

Saída obtida:
```
[OK] Pokémon encontrado: pikachu
#25 - pikachu | Tipos: electric | Altura: 4 | Peso: 60 | HP: 35 | Ataque: 55 | Defesa: 40
```

---

### Busca inválida

Entrada testada:
```
pokemon-inexistente
```

Saída obtida:
```
[ERRO] Pokémon não encontrado: pokemon-inexistente
```

---

### Duplicidade

Entrada testada:
```
adicionar pikachu duas vezes
```

Saída obtida:
```
[OK] pikachu adicionado ao catálogo.
[AVISO] pikachu já está no catálogo.
```

---

### Remoção

Entrada testada:
```
remover ID 25
```

Saída obtida:
```
[OK] Pokémon removido do catálogo.
```

### Remoção de ID inexistente

Entrada testada:
```
remover ID 999
```

Saída obtida:
```
[AVISO] Nenhum Pokémon encontrado com esse ID.
```

---

## Conceitos aplicados

### TypeScript e tipagem
Todos os arquivos são `.ts` com `strict: true` no `tsconfig.json`. Parâmetros, retornos e atributos de classe têm tipagem explícita em todo o projeto.

### Interfaces
`PokemonApiResponse` — tipagem da resposta bruta da PokeAPI, garantindo segurança no acesso aos campos. `PokemonResumo` — objeto simplificado interno com apenas os dados necessários.

### Fetch e async/await
A função `searchPokemon` usa `await fetch(url)` via `node-fetch` para consultar a PokeAPI de forma assíncrona. O retorno é uma `Promise<PokemonResumo | null>`.

### Tratamento de erros
`APIError` é lançado quando `response.ok` é `false` (status 404). O bloco `catch` captura e diferencia erros de API de erros internos inesperados, sem interromper a execução.

### Classes e POO
`CatalogoPokemon` encapsula o array `private pokemons[]` e expõe métodos `public` para manipulação. O `TerminalController` recebe o catálogo por injeção de dependência no construtor.

### Métodos de array
O projeto demonstra 7 métodos diferentes:

| Método | Arquivo | Uso |
|---|---|---|
| `map` | PokeApiService.ts | Transforma `types[]` da API em lista de nomes |
| `find` | PokeApiService.ts | Localiza cada stat (hp, attack, defense) |
| `some` | BoxService.ts | Verifica duplicidade pelo id |
| `forEach` | BoxService.ts | Itera e exibe cada Pokémon |
| `filter` | BoxService.ts | Remove Pokémon pelo id |
| `reduce` | BoxService.ts | Calcula peso total do catálogo |
| `every` | BoxService.ts | Valida que todos os Pokémons têm nome |

---

## Branches utilizadas

```
main          → código estável, versão final entregue
develop       → integração contínua das features
feat/pokedex  → implementação de todas as funcionalidades
docs/readme   → documentação do projeto
```

---

## Organização do Kanban

Link do Kanban: COLE_AQUI_O_LINK

---

## Melhorias futuras

- Criar menu interativo no terminal com `readline`
- Persistir o catálogo no arquivo `pc_box.json` usando `node:fs/promises`
- Criar filtro por tipo de Pokémon
- Criar uma API REST com Express expondo as rotas do catálogo