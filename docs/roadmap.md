# Roadmap técnico

O roadmap organiza decisões e entregas; não fixa datas. Cada fase depende de uma especificação aprovada e pode ser dividida em incrementos menores demonstráveis.

## Fase 0 — Fundação arquitetural

**Objetivo:** estabelecer limites, estrutura e método de especificação.

- Estrutura de diretórios por feature.
- Princípios e regras de dependência.
- Linha de base de requisitos.
- Modelo SDD e critérios de prontidão.
- Verificações de lint, tipos e build preservadas.

**Saída:** documentação revisada e projeto base saudável.

## Fase 1 — Descoberta de produto e interface

**Objetivo:** converter referências visuais e necessidades de usuário em especificações implementáveis.

- Definir jornadas prioritárias e personas.
- Consolidar referências do Pinterest e direção visual.
- Especificar estados responsivos, acessibilidade e conteúdo.
- Definir contratos iniciais sem escolher infraestrutura prematuramente.

**Gate:** fluxos, critérios de aceite e protótipos aprovados.

## Fase 2 — Upload de vídeos

**Objetivo:** entregar o fluxo vertical mínimo de seleção e envio.

- Especificar formatos, tamanhos, segurança, progresso e cancelamento.
- Escolher armazenamento e estratégia de upload por decisão arquitetural.
- Implementar domínio, adaptador, interface e testes do fluxo.

**Gate:** upload validado de ponta a ponta, com falhas e privacidade cobertas.

## Fase 3 — Análise de partidas

**Objetivo:** processar um vídeo enviado e produzir resultado estruturado.

- Definir taxonomia, precisão esperada e contrato dos resultados.
- Avaliar processamento assíncrono, idempotência, filas e fornecedores.
- Implementar estados de processamento, observabilidade e recuperação.

**Gate:** resultado reproduzível para o conjunto de validação e falhas operáveis.

## Fase 4 — Dashboard

**Objetivo:** permitir consulta útil ao histórico e aos resultados.

- Especificar filtros, ordenação, paginação e visualizações.
- Implementar estados vazio, carregamento, erro e dados parciais.
- Validar acessibilidade, responsividade e orçamento de desempenho.

**Gate:** cenários principais cobertos por testes ponta a ponta.

## Fase 5 — Identidade, acesso e produção

**Objetivo:** preparar uso multiusuário e operação segura.

- Especificar autenticação, autorização e isolamento dos dados.
- Definir retenção, exclusão, auditoria e políticas de privacidade.
- Realizar revisão de segurança, capacidade, custos e recuperação.
- Definir SLOs, alertas e runbooks.

**Gate:** checklist de produção e riscos residuais aprovados.

## Critério de entrada de um incremento

- Especificação com todas as seções SDD preenchidas.
- Dependências e decisões externas identificadas.
- Contratos revisados pelos consumidores.
- Questões bloqueantes resolvidas.

## Critério de conclusão de um incremento

- Critérios de aceite demonstrados.
- Testes planejados implementados e aprovados.
- Lint, tipos e build aprovados.
- Documentação e contratos atualizados.
- Observabilidade, acessibilidade, segurança e desempenho avaliados conforme o risco.
