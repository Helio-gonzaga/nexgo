# Estrutura do projeto

## Estrutura atual

```text
NEXGO/
├── docs/
│   ├── architecture.md
│   ├── project-structure.md
│   ├── requirements.md
│   └── roadmap.md
├── public/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── features/
│   │   ├── dashboard/
│   │   ├── match-analysis/
│   │   └── video-upload/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── AGENTS.md
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

Os arquivos `.gitkeep` preservam diretórios que ainda estão intencionalmente vazios. Devem ser removidos quando o primeiro arquivo real for adicionado à respectiva pasta.

## Responsabilidade dos diretórios

| Caminho | Responsabilidade | Não deve conter |
| --- | --- | --- |
| `src/app` | Rotas, layouts, metadados e composição do App Router | Regras de negócio ou adaptadores de fornecedor |
| `src/components/ui` | Primitivos e componentes reutilizáveis | Conhecimento de uma feature específica |
| `src/components/layout` | Estruturas compartilhadas de página | Fluxos de negócio |
| `src/features/video-upload` | Código privado e API pública do upload | Lógica de análise |
| `src/features/match-analysis` | Domínio e orquestração de análise | UI genérica ou upload |
| `src/features/dashboard` | Consulta e apresentação das análises | Processamento do vídeo |
| `src/hooks` | Hooks usados por múltiplas features | Hooks específicos de uma feature |
| `src/lib` | Utilitários e integrações transversais | Regras próprias de uma feature |
| `src/types` | Contratos realmente compartilhados | Tipos privados ou tipos que podem ser inferidos |
| `docs` | Arquitetura, requisitos e planejamento | Segredos ou documentação gerada de build |

## Organização incremental de features

Não se deve criar uma árvore completa vazia. Conforme uma feature crescer, ela pode adotar somente os diretórios necessários:

```text
src/features/<feature>/
├── components/    # interface exclusiva da feature
├── contracts/     # API pública e formatos de dados
├── domain/        # regras puras e invariantes
├── services/      # casos de uso e portas
├── lib/           # detalhes privados
└── index.ts        # API pública, somente quando houver consumidores
```

Arquivos de teste devem ficar próximos do código quando isso facilitar sua descoberta. Um diretório `tests/` é reservado para cenários que cruzem vários módulos.

## Regras de importação

- Usar o alias `@/*` para importações a partir de `src` quando ele melhorar a legibilidade.
- Preferir importações relativas dentro do mesmo módulo pequeno.
- Importar outra feature apenas por sua API pública; evitar caminhos internos profundos.
- Features podem importar módulos compartilhados; módulos compartilhados não importam features.
- O domínio não importa React, Next.js, APIs do navegador ou SDKs externos.
- Evitar arquivos `index.ts` apenas para reexportar tudo; criar uma API pública quando existir um limite útil.
- Evitar ciclos entre features. Um contrato comum comprovadamente transversal deve ser movido para `src/types`.

## Convenções de nomes

- Diretórios e arquivos: `kebab-case`.
- Componentes e tipos: `PascalCase`.
- Funções, variáveis e hooks: `camelCase`; hooks começam com `use`.
- Constantes globais imutáveis: `UPPER_SNAKE_CASE` quando isso trouxer clareza.
- Testes: `<nome>.test.ts` ou `<nome>.test.tsx`.

## Inclusão de novos módulos

Antes de criar uma pasta compartilhada, confirmar que há pelo menos dois consumidores reais e que a responsabilidade possui nome claro. Antes de adicionar uma dependência, registrar o problema resolvido, alternativas consideradas, impacto no cliente e custo de manutenção.
