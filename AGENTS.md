<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# NEXGO — instruções permanentes

## Contexto

O NEXGO é uma plataforma de análise de partidas de futebol com inteligência artificial. O projeto usa Next.js 16, App Router, React, TypeScript strict, Tailwind CSS e Turbopack.

Antes de alterar código relacionado ao framework, leia a documentação correspondente instalada em `node_modules/next/dist/docs/`. Preserve as configurações funcionais do projeto e não presuma comportamentos de versões anteriores do Next.js.

## Fluxo de trabalho

1. Inspecione o estado do repositório e leia a documentação técnica relevante em `docs/`.
2. Apresente um plano breve antes de modificar arquivos.
3. Para uma nova feature, crie ou atualize sua especificação antes da implementação.
4. Faça a menor alteração que satisfaça os critérios de aceite.
5. Execute as verificações aplicáveis e reporte comandos, resultados e limitações.

Não reverta alterações existentes que não façam parte da tarefa. Não altere arquivos gerados manualmente.

## Arquitetura

- Organize código por funcionalidade em `src/features`.
- Mantenha `src/app` focado em rotas, layouts, metadados e composição.
- Use Server Components por padrão. Adicione `"use client"` somente na menor fronteira que necessite interação, estado, efeitos ou APIs do navegador.
- Separe interface, domínio e serviços. Regras de negócio não dependem de React, Next.js ou fornecedores externos.
- Componentes, hooks, utilitários e tipos compartilhados não podem depender de features.
- Uma feature só pode consumir outra por contrato público; evite importações internas profundas e dependências cíclicas.
- Mantenha tipos privados junto de sua feature e mova para `src/types` apenas contratos realmente compartilhados.
- Não crie camadas, barrels, factories, wrappers ou abstrações sem um caso de uso atual.
- Não adicione bibliotecas sem justificar necessidade, alternativas e impacto.

## Spec-Driven Development

Toda funcionalidade futura deve ter, antes da implementação:

- objetivo e limites de escopo;
- requisitos funcionais numerados;
- requisitos não funcionais mensuráveis;
- contratos de dados, estados e erros;
- critérios de aceite rastreáveis;
- plano de testes, incluindo casos de borda.

Use o modelo em `docs/requirements.md`. Se uma decisão em aberto alterar comportamento, segurança ou contrato de dados, resolva-a antes de implementar o trecho afetado.

## Design system

- Use as referências visuais aprovadas como fonte de direção para a implementação da interface.
- Crie componentes compartilhados somente quando representarem padrões realmente reutilizáveis.
- Mantenha componentes específicos dentro da feature à qual pertencem.
- Quando definidos, centralize tokens de cores, espaçamento e tipografia.
- Considere responsividade, acessibilidade e estados de interação em toda implementação de interface.
- Não crie componentes ou tokens antes da definição visual correspondente.

### Referência visual obrigatória

- A referência visual principal está em `public/base-nexgo.jpg`. Inspecione essa imagem antes de implementar qualquer componente visual.
- Preserve sua linguagem Dark Premium: fundo azul quase preto, sidebar vertical compacta com ícones, cards com bordas finas e cantos arredondados, gradientes em azul, roxo e laranja, efeitos luminosos suaves, tipografia minimalista, espaçamentos equilibrados e hierarquia visual clara.
- Use a imagem como referência de identidade visual, não de funcionalidades. Não reproduza textos, métricas ou componentes de produtividade da interface original.
- Adapte os elementos para funcionalidades relacionadas à análise de futebol e trate a área de upload como o principal elemento visual da página.
- Mantenha consistência entre cores, bordas, sombras e espaçamentos em toda a interface.
- Adapte o layout para desktop, tablet e mobile.
- Evite bibliotecas visuais desnecessárias.
- Não use a imagem de referência como background da interface.
- Construa componentes reais com React e Tailwind CSS.

## Contratos entre serviços

- Isole integrações externas da lógica de domínio.
- Não faça o frontend depender de detalhes internos do processamento de vídeo.
- Mantenha contratos entre serviços tipados e documentados.
- Valide respostas externas antes de convertê-las em dados de domínio.
- Não implemente contratos especulativos sem uma necessidade atual.

## Controle de escopo

- Não implemente funcionalidades fora da especificação aprovada.
- Não instale dependências sem justificativa.
- Não refatore módulos não relacionados à tarefa atual.
- Quando houver ambiguidades relevantes, apresente opções antes de implementar.
- Priorize soluções simples, testáveis e evolutivas.

## Qualidade e segurança

- Preserve `strict: true` e não enfraqueça verificações para ocultar erros.
- Valide entradas nas fronteiras de confiança e mantenha segredos fora do código cliente.
- Props entre Server e Client Components devem ser serializáveis.
- Cubra regras de domínio com testes unitários e fluxos críticos com o menor nível de integração suficiente.
- Execute, quando aplicável, lint, checagem de tipos, testes e build.
- Atualize a documentação quando contratos ou limites arquiteturais mudarem.

## Restrições vigentes

Até que uma especificação futura autorize explicitamente, não:

- configure banco de dados, persistência ou ORM;
- implemente autenticação ou autorização;
- integre OpenRouter ou outro provedor de IA;
- adicione Python, YOLO ou OpenCV;
- instale shadcn/ui;
- implemente telas sem a especificação visual aprovada.
