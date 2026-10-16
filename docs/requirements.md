# Requisitos do NEXGO

## Visão do produto

O NEXGO permitirá que usuários enviem vídeos de partidas de futebol, acompanhem análises geradas por inteligência artificial e consultem os resultados em um dashboard. Os requisitos abaixo são uma linha de base para especificação incremental, não uma autorização para implementar integrações ainda não escolhidas.

## Escopo funcional inicial

### Upload de vídeos

- Selecionar um arquivo de vídeo compatível.
- Validar o arquivo conforme limites que serão definidos na especificação da feature.
- Iniciar o envio e informar seu progresso e resultado.
- Permitir recuperação compreensível em caso de falha.

### Análise de partidas

- Solicitar uma análise a partir de um vídeo enviado com sucesso.
- Representar o estado do processamento, incluindo estados terminal de sucesso e falha.
- Disponibilizar resultados estruturados por meio de um contrato versionável.

### Dashboard

- Listar análises acessíveis ao usuário.
- Exibir estado, informações essenciais e resultados disponíveis de cada análise.
- Tratar estados vazio, carregando, indisponível e erro.

Esses itens são épicos de produto. Regras detalhadas, formatos aceitos, métricas e experiência visual serão definidos antes da implementação de cada incremento.

## Requisitos não funcionais transversais

- **Segurança:** validar dados em fronteiras de confiança; não expor segredos ao cliente; definir autorização antes de manipular dados de usuários.
- **Privacidade:** documentar finalidade, retenção e descarte de vídeos antes de armazená-los.
- **Desempenho:** definir orçamento mensurável por fluxo antes de sua implementação; não enviar JavaScript ao cliente sem necessidade.
- **Acessibilidade:** seguir WCAG 2.2 nível AA como objetivo mínimo para interfaces futuras.
- **Confiabilidade:** operações demoradas devem ter estados explícitos, falhas observáveis e estratégia de repetição segura quando aplicável.
- **Observabilidade:** falhas relevantes devem possuir contexto correlacionável sem registrar dados pessoais ou credenciais.
- **Compatibilidade:** respeitar os navegadores suportados pela versão adotada do Next.js.
- **Manutenibilidade:** TypeScript `strict`, limites de módulos claros e dependências justificadas.

## Fora do escopo desta etapa

- Banco de dados, persistência e ORM.
- Autenticação e autorização.
- Integração com OpenRouter ou outro provedor de IA.
- Serviços Python e uso de YOLO ou OpenCV.
- Telas, identidade visual e componentes de interface.
- Instalação de shadcn/ui ou de qualquer nova biblioteca.

## Processo Spec-Driven Development

Uma feature só está pronta para implementação quando sua especificação contém e a equipe aprovou:

1. **Objetivo:** problema, usuário beneficiado e resultado esperado.
2. **Requisitos funcionais:** comportamentos numerados e observáveis.
3. **Requisitos não funcionais:** metas mensuráveis de qualidade, segurança e operação.
4. **Contratos de dados:** entradas, saídas, estados, erros, exemplos e regras de evolução.
5. **Critérios de aceite:** cenários verificáveis ligados aos requisitos.
6. **Plano de testes:** níveis de teste, casos principais, bordas e estratégia de mocks.

### Modelo de especificação

```markdown
# <Nome da feature>

## Objetivo
<Problema, público e resultado esperado>

## Escopo
### Incluído
- ...
### Não incluído
- ...

## Requisitos funcionais
- RF-001: ...

## Requisitos não funcionais
- RNF-001: ...

## Contratos de dados
### <Contrato>
- Campos e tipos:
- Invariantes:
- Erros:
- Exemplo:

## Critérios de aceite
- CA-001 (RF-001): Dado ..., quando ..., então ...

## Plano de testes
- Unitários:
- Integração:
- Componente:
- Ponta a ponta:
- Casos de borda:

## Questões em aberto
- ...
```

Cada requisito deve ter identificador estável. Mudanças de contrato incompatíveis exigem estratégia explícita de migração ou versionamento. Questões em aberto que afetam comportamento, segurança ou dados impedem a implementação daquele trecho.
