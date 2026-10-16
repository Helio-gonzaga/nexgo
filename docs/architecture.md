# Arquitetura do NEXGO

## Propósito

O NEXGO é uma plataforma para envio de vídeos de futebol, processamento de análises assistidas por inteligência artificial e consulta dos resultados. Este documento define os limites arquiteturais iniciais. Ele não escolhe banco de dados, autenticação, provedor de IA ou pipeline de visão computacional.

## Princípios

1. Organizar o código por funcionalidade, mantendo alta coesão dentro de cada feature.
2. Usar Server Components por padrão e criar fronteiras Client apenas para interação, APIs do navegador ou estado local.
3. Manter regras de negócio independentes do framework e de serviços externos.
4. Fazer dependências apontarem da infraestrutura e da interface para o domínio, nunca no sentido inverso.
5. Compartilhar apenas conceitos realmente transversais; duplicação pequena é preferível a uma abstração prematura.
6. Manter contratos explícitos e TypeScript em modo `strict`.
7. Introduzir bibliotecas e integrações somente por decisão registrada e necessidade demonstrada.

## Contextos funcionais iniciais

| Feature | Responsabilidade | Fora do seu limite |
| --- | --- | --- |
| `video-upload` | Seleção, validação e acompanhamento do envio de vídeos | Analisar partidas ou apresentar resultados |
| `match-analysis` | Orquestrar e representar o ciclo de análise de uma partida | Armazenamento definitivo e visualização do dashboard |
| `dashboard` | Consultar e apresentar resumos e resultados de análises | Processar vídeos ou executar modelos de IA |

As integrações entre features devem ocorrer por contratos públicos e dados serializáveis. Uma feature não deve importar detalhes internos de outra.

## Camadas de uma feature

Pastas internas só devem ser criadas quando houver código que as justifique:

- `components/`: interface específica da feature.
- `domain/`: entidades, value objects e regras de negócio puras.
- `services/`: casos de uso e portas para dependências externas.
- `contracts/`: tipos de entrada, saída e eventos públicos da feature.
- `lib/`: utilitários privados e adaptadores locais.
- `tests/`: testes que não possam ficar próximos do arquivo testado.

O fluxo de dependências permitido é:

```text
app -> features -> domínio/contratos
  |         |
  +-> components compartilhados
  +-> lib e types compartilhados

serviços/adaptadores -> contratos do domínio
domínio -X-> React, Next.js, navegador ou fornecedores externos
```

## Fronteiras do App Router

- `src/app` contém somente composição de rotas, layouts, metadados, estados de rota e Route Handlers quando necessários.
- Páginas e layouts devem delegar comportamento para as features e evitar regras de negócio.
- Arquivos são Server Components quando não possuem a diretiva `"use client"`.
- A diretiva `"use client"` deve ficar na menor fronteira interativa possível; props que cruzem essa fronteira precisam ser serializáveis.
- Segredos, credenciais e adaptadores exclusivos do servidor nunca devem ser importados pelo grafo de módulos Client.
- Route Handlers serão criados apenas quando existir um consumidor HTTP real; não são a camada de domínio.

## Código compartilhado

- `src/components/ui`: componentes visuais reutilizáveis, sem dependência de features.
- `src/components/layout`: estruturas de página reutilizáveis, sem regra de negócio.
- `src/hooks`: hooks efetivamente compartilhados. Por definição, hooks React que usam estado ou efeitos pertencem ao lado Client.
- `src/lib`: utilitários e adaptadores transversais. Módulos exclusivos do servidor devem ser identificáveis pelo nome ou subpasta `server` e protegidos com `server-only` quando forem introduzidos.
- `src/types`: contratos usados por mais de uma feature. Tipos privados permanecem junto da feature.

Features podem depender desses módulos compartilhados. Módulos compartilhados não podem depender de features.

## Dados e integrações

Os contratos devem distinguir identificadores, estados e instantes de tempo de forma inequívoca. Datas que atravessam limites de transporte devem usar strings ISO 8601. Estados assíncronos devem ser modelados como uniões discriminadas quando isso evitar combinações inválidas.

Banco de dados, autenticação, OpenRouter e processamento Python/YOLO/OpenCV estão deliberadamente fora desta etapa. Quando uma integração for aprovada, sua interface deve ser definida no núcleo consumidor e sua implementação deve ficar em um adaptador externo.

## Qualidade

Cada incremento deve passar por:

1. critérios de aceite rastreáveis aos requisitos;
2. lint e checagem estática de tipos;
3. testes proporcionais ao risco da alteração;
4. build de produção antes de integração quando a mudança afetar execução ou configuração;
5. revisão das fronteiras Server/Client e ausência de segredos no bundle do cliente.

Decisões arquiteturais que alterem estes limites devem ser registradas neste documento ou em um ADR futuro.
