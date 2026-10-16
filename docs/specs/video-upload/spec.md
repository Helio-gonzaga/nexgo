# Upload local de vídeo — especificação visual e funcional v1

## Status do documento

- **Estado:** decisões funcionais e visuais aprovadas; implementação aguardando autorização
- **Feature:** `video-upload`
- **Versão do contrato:** `1`
- **Referência visual:** `public/base-nexgo.jpg`
- **Natureza desta etapa:** especificação; não autoriza integrações, persistência ou processamento de vídeo

## Objetivo

Definir a primeira experiência Upload-First do NEXGO para que uma pessoa possa selecionar, por clique ou arrastar e soltar, um vídeo de partida em MP4 ou WebM, receber validação imediata e reproduzir um preview local antes de qualquer processamento futuro.

A página inicial deve comunicar com clareza a identidade do NEXGO e colocar a seleção do vídeo como ação primária. A experiência termina no navegador: nesta versão, “vídeo pronto” significa somente que o arquivo foi validado e carregado em um player HTML5 local. Nenhum byte deve ser enviado a um servidor.

## Escopo

### Incluído

- Shell responsivo com identidade NEXGO, sidebar vertical e sua adaptação em barra superior compacta no mobile.
- Área de boas-vindas curta, subordinada à ação principal.
- Seleção de um único arquivo por vez via seletor nativo ou drag-and-drop.
- Aceite de MP4 e WebM, limitado a 200 MB por arquivo.
- Validação local de quantidade, extensão, MIME, tamanho e capacidade do navegador de carregar os metadados.
- Preparação e reprodução de preview local em player HTML5.
- Remoção e substituição do arquivo selecionado.
- Estados vazio, arrastando, carregando, pronto/sucesso e erro.
- Cards informativos sobre capacidades futuras de visão computacional e análise assistida por IA, descritas como possibilidades, não como resultados já produzidos.
- Comportamento responsivo e requisitos de acessibilidade.

### Fora de escopo

- Upload de rede, APIs, Route Handlers, armazenamento, banco de dados ou ORM.
- Autenticação, autorização, contas ou histórico por usuário.
- Análise real do vídeo, extração de métricas ou geração de resultados.
- Integrações com OpenRouter ou outros provedores de IA, Python, YOLO ou OpenCV.
- Progresso de transferência, retomada, cancelamento de rede ou retry de upload.
- Persistência do arquivo ou do estado após recarregar ou sair da página.
- Múltiplos arquivos, playlists, captura por câmera ou importação por URL.
- Edição, corte, compressão, transcodificação ou geração de thumbnail.
- Dashboard, estatísticas de partidas ou dados fictícios apresentados como reais.
- Instalação de bibliotecas de componentes, player ou upload.

## Referência visual

`public/base-nexgo.jpg` é fonte de direção estética, não um layout a ser copiado. A futura interface não deve usar a imagem como background nem reproduzir seus textos, métricas, gráficos ou recursos de produtividade.

### Leitura da referência

- **Tema Dark Premium:** base azul quase preta, com superfícies discretamente mais claras e alto contraste nos elementos essenciais.
- **Sidebar:** trilho vertical estreito, isolado do conteúdo, com identidade no topo, navegação por ícones e ação secundária no rodapé.
- **Cards:** blocos modulares com cantos arredondados, bordas finas azul-acinzentadas e pouca diferença tonal em relação ao fundo.
- **Cor e luz:** azul elétrico como destaque primário; roxo e laranja como acentos e halos localizados. O brilho é difuso e não reduz a legibilidade.
- **Tipografia:** sans-serif minimalista, títulos claros e fortes, textos auxiliares pequenos e de contraste mais baixo.
- **Espaçamento:** margens amplas, ritmo consistente e separação suficiente para preservar uma aparência calma, mesmo com conteúdo denso.
- **Hierarquia:** um elemento dominante, seguido de módulos menores; contraste, escala e posição indicam prioridade sem excesso de ornamentação.

### Aplicação ao NEXGO

- A área de upload ocupa o maior peso visual e aparece antes dos cards informativos na ordem de leitura e de foco.
- A boas-vindas apresenta título e instrução curta, sem competir com a ação principal.
- Azul identifica ação, foco e estado pronto; roxo pode enriquecer superfícies informativas; laranja fica reservado a atenção e erro, sempre acompanhado por texto/ícone.
- Halos e gradientes são decorativos, limitados às superfícies principais e desativáveis por preferências de contraste quando necessário.
- Ícones devem ser simples, consistentes e acompanhados de nome acessível; não podem ser o único meio de comunicar uma ação ou estado.

## Design tokens propostos

Os valores abaixo formam uma proposta inicial a ser centralizada apenas quando a implementação visual for aprovada. Nomes são semânticos; valores poderão ser calibrados após avaliação no navegador.

### Cores

| Token | Valor proposto | Uso |
| --- | --- | --- |
| `color-bg-canvas` | `#030711` | Fundo global azul quase preto |
| `color-bg-sidebar` | `#07101F` | Sidebar |
| `color-bg-surface` | `#081223` | Cards e área de upload |
| `color-bg-surface-raised` | `#0D1930` | Hover, drag ativo e controles elevados |
| `color-border-subtle` | `#1B2A45` | Bordas de cards e divisores |
| `color-border-active` | `#3B82F6` | Foco, drag ativo e seleção válida |
| `color-text-primary` | `#F4F7FF` | Títulos e conteúdo principal |
| `color-text-secondary` | `#A7B2C8` | Instruções e metadados |
| `color-text-muted` | `#6F7D98` | Conteúdo auxiliar não essencial |
| `color-accent-blue` | `#38BDF8` | Ação primária e feedback pronto |
| `color-accent-purple` | `#8B5CF6` | Gradiente e conteúdo informativo |
| `color-accent-orange` | `#FB923C` | Atenção e parte quente do gradiente |
| `color-success` | `#34D399` | Arquivo local válido |
| `color-error` | `#FB7185` | Erros de validação e preview |

Gradientes propostos:

- **Ação primária:** `linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)`.
- **Halo frio:** azul e roxo com opacidade máxima de `20%`, blur decorativo e sem cobrir texto.
- **Halo quente:** laranja com opacidade máxima de `14%`, restrito aos cards informativos ou feedback de atenção.

### Tipografia

- Família: fonte sans-serif já adotada pelo projeto/sistema; não adicionar fonte externa nesta feature.
- Título da página: `clamp(1.75rem, 4vw, 2.5rem)`, peso `650–700`, line-height `1.15`.
- Título de card: `1rem–1.125rem`, peso `600`, line-height `1.4`.
- Corpo: `1rem`, peso `400`, line-height `1.6`.
- Auxiliar: `0.875rem`, peso `400–500`, line-height `1.5`.
- Texto essencial nunca deve ficar abaixo de `0.875rem`.

### Espaçamento, forma e elevação

- Escala de espaçamento: `4, 8, 12, 16, 24, 32, 48, 64px`.
- Padding de cards: `16px` em mobile, `24–32px` a partir de tablet.
- Gap de layout: `16px` em mobile, `24px` em tablet e desktop.
- Raios: `12px` para controles, `16px` para cards, `20px` para a área de upload.
- Borda padrão: `1px solid color-border-subtle`; área em drag/foco: `2px` visual sem alterar o layout.
- Sombra: `0 16px 48px rgb(0 0 0 / 28%)`; brilho externo apenas em elementos prioritários.
- Alvo interativo mínimo: `44 × 44px`.
- Largura máxima sugerida do conteúdo: `1200px`, centralizado no espaço disponível.

### Responsividade proposta

| Faixa | Comportamento |
| --- | --- |
| `< 640px` | A sidebar vertical se transforma em barra superior compacta, preservando marca, nomes acessíveis e indicação da seção ativa; conteúdo em uma coluna; upload ocupa a largura; cards informativos ficam empilhados e ações textuais permanecem visíveis. |
| `640–1023px` | Sidebar compacta; conteúdo em uma coluna ampla; cards informativos podem formar duas colunas quando houver espaço. |
| `≥ 1024px` | Sidebar fixa na lateral visual; conteúdo principal ao lado; upload dominante; cards informativos em grade subordinada. |

Os breakpoints indicam mudança de composição, não dispositivos específicos. A página não deve produzir rolagem horizontal a partir de `320px` de largura.

## Requisitos funcionais

- **RF-001 — Shell e identidade:** exibir layout principal com marca textual NEXGO, navegação responsiva e região principal semanticamente identificável.
- **RF-002 — Boas-vindas:** exibir título e texto breve que expliquem que o primeiro passo é escolher um vídeo de partida para análise futura.
- **RF-003 — Ação primária:** apresentar a área de seleção local como maior e mais proeminente componente interativo da página inicial.
- **RF-004 — Seleção por clique:** ao acionar a área ou seu botão, abrir o seletor nativo configurado para um único arquivo de vídeo MP4 ou WebM.
- **RF-005 — Drag-and-drop:** aceitar um único arquivo solto sobre a área, fornecer feedback durante o arraste e submeter o arquivo à mesma validação da seleção por clique.
- **RF-006 — Formatos:** aceitar somente arquivos resolvidos como MP4 (`video/mp4` e `.mp4`) ou WebM (`video/webm` e `.webm`). Quando o MIME declarado estiver vazio, usar a extensão como fallback inicial, sem considerar o arquivo válido até o navegador carregar seus metadados.
- **RF-007 — Tamanho:** aceitar arquivo com tamanho máximo inclusivo de `200.000.000 bytes` (200 MB decimal) e rejeitar qualquer arquivo maior.
- **RF-008 — Validação preliminar:** validar quantidade, extensão, MIME declarado e tamanho antes de criar uma Blob URL; quando mais de um arquivo for fornecido por drag-and-drop, rejeitar a seleção inteira.
- **RF-009 — Validação de metadados e preview:** após a validação preliminar, criar uma Blob URL temporária e exigir que o navegador carregue os metadados do elemento `<video>`. Somente então apresentar o player HTML5 como pronto, com controles nativos, sem autoplay e sem envio de rede pelo NEXGO.
- **RF-010 — Metadados:** no estado pronto, exibir nome do arquivo, formato resolvido, tamanho formatado e duração finita e não negativa obtida dos metadados carregados pelo navegador.
- **RF-011 — Remoção:** permitir remover o arquivo atual, revogar sua URL de objeto e retornar ao estado vazio.
- **RF-012 — Substituição:** permitir escolher outro vídeo; o novo arquivo deve ser validado antes de substituir visualmente o atual. A URL anterior deve ser revogada ao concluir a substituição válida.
- **RF-013 — Falha na substituição:** se o novo arquivo for inválido, manter o vídeo válido anterior disponível e mostrar o erro relativo à tentativa de substituição.
- **RF-014 — Estados:** representar explicitamente `idle`, `dragging`, `loading`, `ready` e `error`, com texto compreensível e sem depender apenas de cor.
- **RF-015 — Recuperação:** após erro sem vídeo anterior, oferecer nova seleção; após erro de substituição, oferecer tentar novamente ou remover o vídeo preservado.
- **RF-016 — Cards informativos:** exibir exatamente dois cards de capacidades futuras: “Visão Computacional”, com o texto “Em breve, identifique jogadores e acompanhe movimentações em campo.”; e “Análise Inteligente”, com o texto “Em breve, transforme dados das partidas em análises técnicas com IA.” Nenhum card deve sugerir que essas capacidades já estão disponíveis.
- **RF-017 — Navegação:** manter Upload como única funcionalidade navegável. Dashboard e Análises podem aparecer desabilitados e identificados como funcionalidades futuras, sem links, rotas adicionais ou comportamento que simule navegação.
- **RF-018 — Navegação responsiva:** manter a sidebar vertical em telas com largura a partir de `640px` e transformá-la em barra superior compacta abaixo de `640px`, preservando identidade, nome acessível dos itens, indicação da seção ativa e estado indisponível dos itens futuros.
- **RF-019 — Ciclo de vida:** revogar toda Blob URL candidata ou ativa quando houver falha de metadados, remoção, substituição concluída ou desmontagem do componente.

## Requisitos não funcionais

- **RNF-001 — Acessibilidade:** atender WCAG 2.2 AA nos fluxos especificados, incluindo contraste mínimo de `4.5:1` para texto normal e `3:1` para texto grande e limites/componentes essenciais.
- **RNF-002 — Teclado:** todas as ações devem funcionar por teclado, com ordem de foco coerente e indicador de foco visível com contraste mínimo de `3:1`.
- **RNF-003 — Leitor de tela:** a área de seleção deve possuir nome, instrução, formatos e limite acessíveis; mudanças de erro e sucesso devem ser anunciadas de modo não intrusivo (`aria-live` apropriado).
- **RNF-004 — Movimento:** respeitar `prefers-reduced-motion`; transições decorativas devem ser removidas ou reduzidas e nenhuma animação deve ser necessária para compreender o estado.
- **RNF-005 — Responsividade:** funcionar sem rolagem horizontal entre `320px` e `1440px`, exceto overflow intrínseco dos controles nativos do player quando imposto pelo navegador.
- **RNF-006 — Desempenho:** não copiar o conteúdo integral do vídeo para memória nem convertê-lo em base64; criar o preview com `URL.createObjectURL`. A reação visual à seleção deve ocorrer em até `100 ms`, desconsiderando o tempo do navegador para ler metadados.
- **RNF-007 — Privacidade:** não transmitir o arquivo, nome, metadados ou eventos a serviços externos; a interface deve informar “processado apenas neste dispositivo nesta etapa”.
- **RNF-008 — Segurança:** tratar nome, tipo e metadados do arquivo como entrada não confiável; renderizar nome como texto e nunca interpretar conteúdo ou caminho fornecido pelo arquivo.
- **RNF-009 — Manutenibilidade:** preservar TypeScript `strict`; validações devem ser regras puras, independentes de React/Next.js, e estados impossíveis devem ser evitados por união discriminada.
- **RNF-010 — Dependências:** usar React, APIs web e player HTML5 existentes; nenhuma nova dependência é permitida para esta versão.
- **RNF-011 — Compatibilidade:** suportar navegadores compatíveis com a versão adotada do Next.js que ofereçam File API, Drag and Drop API, Blob URLs e reprodução do codec contido; suporte ao contêiner não garante suporte a todo codec.
- **RNF-012 — Resiliência:** falhas ao ler metadados ou reproduzir o codec devem produzir erro recuperável e não bloquear nova seleção.
- **RNF-013 — Qualidade visual:** controles e textos essenciais devem permanecer legíveis em zoom de `200%`, e conteúdo deve refluir sem perda funcional.

## Estados da interface

| Estado | Gatilho | Apresentação e ações | Próximos estados |
| --- | --- | --- | --- |
| `idle` | Entrada inicial, remoção ou limpeza de erro | Instrução, formatos, limite, botão “Selecionar vídeo” e área de drop | `dragging`, `loading`, `error` |
| `dragging` | Arquivo(s) sobre a área | Borda/halo ativo e texto “Solte o vídeo aqui”; mantém dimensões | `idle`, `loading`, `error` |
| `loading` | Arquivo passa pela validação preliminar; a Blob URL é criada e o navegador tenta carregar metadados | Indicador de atividade, nome e mensagem “Validando vídeo”; em substituição, o player anterior permanece visível e suas ações conflitantes ficam desabilitadas | `ready`, `error` ou `ready` com erro de substituição |
| `ready` | Navegador carregou metadados válidos do candidato | Player, metadados, confirmação local, “Substituir” e “Remover” | `loading`, `ready` com erro de substituição, `idle` |
| `error` | Quantidade, tipo, tamanho ou preview inválido sem arquivo anterior | Mensagem específica, requisitos aceitos e “Selecionar outro vídeo” | `idle`, `dragging`, `loading` |

Erro durante uma substituição é uma mensagem associada ao estado `ready`, não um estado que descarte o vídeo anterior. Todos os estados devem preservar a área de boas-vindas, a navegação e o conteúdo informativo estáveis para evitar saltos desnecessários de layout.

### Catálogo de erros

| Código | Condição | Mensagem orientativa |
| --- | --- | --- |
| `MULTIPLE_FILES` | Mais de um arquivo fornecido | “Selecione apenas um vídeo por vez.” |
| `UNSUPPORTED_TYPE` | Tipo não reconhecido como MP4 ou WebM | “Formato não suportado. Use um arquivo MP4 ou WebM.” |
| `FILE_TOO_LARGE` | `size > 200.000.000` | “O vídeo excede o limite de 200 MB.” |
| `EMPTY_FILE` | `size === 0` | “O arquivo está vazio. Selecione outro vídeo.” |
| `PREVIEW_UNAVAILABLE` | Navegador não carrega metadados válidos ou o player sinaliza erro | “Não foi possível validar ou reproduzir este vídeo. O arquivo ou codec pode não ser compatível com o navegador.” |
| `UNKNOWN_ERROR` | Falha local não classificada | “Não foi possível preparar o vídeo. Tente selecionar o arquivo novamente.” |

## Contratos de dados

Os contratos são privados à feature enquanto não houver consumidor externo. Não existe contrato de upload remoto nesta versão.

### Configuração de validação

```ts
type VideoValidationPolicyV1 = {
  readonly maxBytes: 200_000_000;
  readonly acceptedMimeTypes: readonly ["video/mp4", "video/webm"];
  readonly acceptedExtensions: readonly [".mp4", ".webm"];
  readonly maxFiles: 1;
};
```

### Arquivo local aceito

```ts
type LocalVideoV1 = {
  readonly file: File;
  readonly objectUrl: string;
  readonly name: string;
  readonly sizeBytes: number;
  readonly declaredMimeType: "video/mp4" | "video/webm" | "";
  readonly resolvedMimeType: "video/mp4" | "video/webm";
  readonly extension: ".mp4" | ".webm";
  readonly durationSeconds: number;
};
```

Invariantes:

- `file.size` deve estar entre `1` e `200.000.000` bytes, inclusive.
- Exatamente um formato deve ser resolvido como MP4 ou WebM; `resolvedMimeType` deriva do par MIME/extensão ou, quando o MIME estiver vazio, da extensão.
- `objectUrl` é efêmera, existe apenas no cliente e nunca deve ser serializada.
- Uma instância de `LocalVideoV1` só pode ser criada depois que o navegador carregar metadados válidos.
- `durationSeconds` deve ser finita e não negativa.
- O arquivo original continua sendo a fonte; não criar cópia integral em memória.

### Resultado de validação

```ts
type VideoValidationErrorCodeV1 =
  | "MULTIPLE_FILES"
  | "UNSUPPORTED_TYPE"
  | "FILE_TOO_LARGE"
  | "EMPTY_FILE";

type VideoValidationResultV1 =
  | {
      readonly ok: true;
      readonly file: File;
      readonly declaredMimeType: "video/mp4" | "video/webm" | "";
      readonly resolvedMimeType: "video/mp4" | "video/webm";
      readonly extension: ".mp4" | ".webm";
    }
  | {
      readonly ok: false;
      readonly code: VideoValidationErrorCodeV1;
    };
```

Regra de identificação aprovada:

1. normalizar a extensão do nome para minúsculas;
2. exigir extensão `.mp4` ou `.webm`;
3. se `File.type` estiver preenchido, exigir correspondência com o MIME esperado pela extensão;
4. se `File.type` estiver vazio, resolver provisoriamente o formato pela extensão;
5. em qualquer caso aprovado preliminarmente, criar uma Blob URL candidata e exigir o evento de metadados com duração válida antes de construir `LocalVideoV1` e entrar em `ready`;
6. em falha ou metadados inválidos, revogar a Blob URL candidata e retornar `PREVIEW_UNAVAILABLE`;
7. não alegar inspeção binária completa nem garantir suporte ao codec: o carregamento de metadados é a segunda fronteira prática de validação desta versão.

### Estado da interface

```ts
type VideoUploadStateV1 =
  | { readonly status: "idle" }
  | { readonly status: "dragging" }
  | {
      readonly status: "loading";
      readonly candidateName: string;
      readonly previousVideo: LocalVideoV1 | null;
    }
  | { readonly status: "ready"; readonly video: LocalVideoV1; readonly replacementError?: VideoUiErrorV1 }
  | { readonly status: "error"; readonly error: VideoUiErrorV1 };

type VideoUiErrorV1 = {
  readonly code:
    | VideoValidationErrorCodeV1
    | "PREVIEW_UNAVAILABLE"
    | "UNKNOWN_ERROR";
  readonly message: string;
};
```

Eventos previstos: `DRAG_ENTER`, `DRAG_LEAVE`, `FILES_CHOSEN`, `VALIDATION_PASSED`, `VALIDATION_FAILED`, `PREVIEW_READY`, `PREVIEW_FAILED`, `REMOVE` e `REPLACE`. São eventos internos de UI, não telemetria nem contratos entre serviços.

## Componentes previstos

Os nomes são indicativos e não obrigam a criação antecipada de abstrações.

| Componente | Responsabilidade | Fronteira sugerida |
| --- | --- | --- |
| `AppShell` | Compor sidebar e área principal responsiva | Compartilhado/layout, Server quando possível |
| `NexgoNavigation` | Marca, Upload ativo e itens futuros desabilitados; sidebar a partir de `640px` e barra superior abaixo desse limite | Compartilhado/layout, Server se não houver interação própria |
| `WelcomeHeader` | Título e orientação breve | Feature ou composição de página, Server |
| `VideoUploadPanel` | Orquestrar input, drag-and-drop, estado e ciclo de Blob URL | Feature, Client; menor fronteira necessária |
| `VideoDropzone` | Área de seleção, instruções e feedback de drag | Feature, dentro da fronteira Client |
| `VideoPreview` | Player HTML5, metadados e ações de remover/substituir | Feature, dentro da fronteira Client |
| `UploadFeedback` | Status e mensagens acessíveis | Feature, dentro da fronteira Client |
| `CapabilityCard` | Conteúdo editorial sobre capacidades futuras | Reutilizável somente se o padrão se repetir; Server |

As regras de validação devem ficar em módulo puro dentro de `src/features/video-upload/domain` ou equivalente justificado pelo código real. A rota em `src/app` deve apenas compor a página. A especificação não exige barrels, contextos, reducers ou hooks separados.

## Critérios de aceite

- **CA-001 (RF-001, RF-002, RF-003):** dado o primeiro acesso, quando a página renderizar, então marca, sidebar/barra adaptada, boas-vindas e área de upload estarão visíveis, e o upload será a ação de maior destaque.
- **CA-002 (RF-004, RF-006):** dado o estado vazio, quando a pessoa acionar “Selecionar vídeo”, então o seletor permitirá um arquivo e indicará MP4 e WebM como formatos aceitos.
- **CA-003 (RF-005, RF-014):** dado um arquivo arrastado sobre a dropzone, quando entrar e sair de sua área, então o feedback visual e textual mudará sem deslocar o layout e retornará ao estado anterior ao sair.
- **CA-004 (RF-006, RF-007, RF-008, RF-009):** dado um MP4 ou WebM entre `1` e `200.000.000` bytes, com MIME correspondente ou vazio, quando selecionado e seus metadados válidos forem carregados, então o preview chegará ao estado `ready`.
- **CA-005 (RF-007, RF-008):** dado um arquivo com exatamente `200.000.000` bytes, quando passar pela validação de tamanho, então seguirá para validação de metadados; com `200.000.001` bytes, será rejeitado com `FILE_TOO_LARGE`.
- **CA-006 (RF-006, RF-008):** dado arquivo de outro formato, MIME incompatível com a extensão ou sem extensão aceita, quando selecionado, então nenhum preview será criado e a mensagem de formato será exibida.
- **CA-007 (RF-008):** dados zero ou múltiplos arquivos em drop, quando soltos, então nenhum candidato será aceito; múltiplos produzirão `MULTIPLE_FILES`.
- **CA-008 (RF-009, RF-010):** dado arquivo preliminarmente válido, quando o navegador carregar metadados com duração finita e não negativa, então haverá player HTML5 sem autoplay, nome, formato resolvido, tamanho e duração, sem requisição de upload iniciada pela aplicação.
- **CA-009 (RF-011, RF-019):** dado vídeo pronto, quando “Remover” for acionado, então a Blob URL será revogada, player e metadados desaparecerão e o estado voltará a `idle`.
- **CA-010 (RF-012, RF-019):** dado vídeo pronto, quando outro arquivo válido e com metadados carregáveis for escolhido, então ele substituirá o anterior, e a URL anterior será revogada somente depois de o novo candidato estar pronto.
- **CA-011 (RF-013, RF-015):** dado vídeo pronto, quando uma substituição inválida ocorrer, então o preview anterior permanecerá e a mensagem específica permitirá nova tentativa ou remoção.
- **CA-012 (RF-014, RF-015):** dado qualquer erro de validação ou preview, quando exibido, então conterá causa compreensível e ação de recuperação, sem depender apenas de cor.
- **CA-013 (RF-016):** quando os cards informativos forem lidos, então serão exibidos os títulos e textos aprovados de Visão Computacional e Análise Inteligente, ambos iniciados por “Em breve”, sem estatísticas, resultados ou promessa de disponibilidade atual.
- **CA-014 (RF-017):** dado Dashboard ou Análises visível na navegação, quando inspecionado ou acionado, então estará semanticamente desabilitado, identificado como futuro e não possuirá link, rota ou navegação.
- **CA-015 (RF-018):** em `639px`, a navegação será uma barra superior compacta; em `640px`, será uma sidebar vertical. Em ambas, marca, Upload ativo e nomes/estados acessíveis permanecerão disponíveis.
- **CA-016 (RNF-001, RNF-002, RNF-003):** dado uso por teclado e leitor de tela, quando o fluxo completo for percorrido, então todas as ações serão operáveis, foco será visível e mudanças de estado serão anunciadas.
- **CA-017 (RNF-004):** dado `prefers-reduced-motion: reduce`, quando estados mudarem, então não haverá animação essencial nem movimento decorativo prolongado.
- **CA-018 (RNF-005, RNF-013):** em viewport de `320px` e zoom de `200%`, quando a página for usada, então o conteúdo refluirá sem perda de ação ou rolagem horizontal causada pela aplicação.
- **CA-019 (RNF-006, RNF-007):** durante o fluxo local, então a aplicação usará Blob URL, não base64, e nenhuma requisição contendo o vídeo ou seus metadados será emitida.
- **CA-020 (RNF-011, RNF-012):** dado contêiner aceito cujo navegador não consiga carregar com metadados válidos, quando a validação de mídia falhar, então a Blob URL candidata será revogada, `PREVIEW_UNAVAILABLE` será exibido e nova seleção continuará possível.
- **CA-021 (RNF-008):** dado nome ou metadado com caracteres especiais, quando exibido, então será tratado somente como texto, sem interpretação como HTML, caminho ou código.
- **CA-022 (RNF-009):** quando a implementação for verificada, então TypeScript permanecerá em modo `strict`, a validação preliminar não importará React/Next.js e o estado será representado pela união discriminada especificada.
- **CA-023 (RNF-010):** quando as dependências forem comparadas antes e depois da implementação, então nenhuma biblioteca de componente, upload, player ou estado terá sido adicionada.

## Plano de testes

### Unitários

- Validar MP4 e WebM com combinações de extensão em maiúsculas/minúsculas e MIME correspondente.
- Verificar limites de `0`, `1`, `199.999.999`, `200.000.000` e `200.000.001` bytes.
- Rejeitar extensão não aceita, MIME não aceito e divergência entre MIME e extensão.
- Cobrir `File.type` vazio com fallback pela extensão e formato resolvido correspondente.
- Rejeitar múltiplos arquivos sem selecionar silenciosamente o primeiro.
- Verificar formatação de tamanho e duração sem arredondamento enganoso.
- Testar transições permitidas da união de estados e preservação do vídeo em falha de substituição.

### Componente

- Seleção pelo input, drag enter/leave/drop e reset que permita selecionar novamente o mesmo arquivo.
- Renderização e anúncios dos cinco estados.
- Criação de uma única Blob URL por arquivo aceito e `URL.revokeObjectURL` na remoção, substituição e desmontagem.
- Ausência de autoplay; presença de controles nativos.
- Sucesso e falha dos eventos de metadados/player, incluindo duração inválida e revogação da URL candidata.
- Ações desabilitadas durante `loading` sem armadilha de foco.
- Navegação completa por teclado e associação entre instruções, input e mensagens.

### Integração

- Compor shell Server com a menor ilha Client de upload, usando somente props serializáveis na fronteira.
- Garantir que validação rejeitada não crie player nem Blob URL.
- Garantir que uma substituição inválida preserve player e URL válidos anteriores.
- Inspecionar que a aplicação não inicia chamadas de rede ao selecionar, reproduzir, remover ou substituir vídeo.

### Ponta a ponta

- Fluxo feliz por clique e por drag-and-drop com fixtures pequenas de MP4 e WebM legalmente mantidas no repositório de testes.
- Erros de tipo, tamanho e múltiplos arquivos, incluindo recuperação.
- Remover e selecionar novamente o mesmo arquivo.
- Layout em larguras representativas de `320`, `639`, `640`, `768`, `1024` e `1440px`, com verificação explícita da troca entre barra superior e sidebar.
- Navegação somente por teclado, zoom de `200%`, contraste e auditoria automatizada de acessibilidade complementada por revisão manual.
- Preferência de movimento reduzido e comportamento de itens indisponíveis na navegação.

### Casos de borda e mocks

- Mockar File API, `URL.createObjectURL`/`revokeObjectURL` e eventos do elemento `<video>` em testes unitários/de componente.
- Nome de arquivo muito longo, Unicode, caracteres de controle visual e múltiplos pontos.
- MIME vazio e MIME divergente da extensão.
- Drop sem arquivo, diretório ou item não-arquivo.
- Falha de decodificação, duração `NaN`/`Infinity` e desmontagem durante `loading`.
- Eventos rápidos e repetidos de drag e substituições consecutivas.

## Decisões arquiteturais

1. **Processamento estritamente local:** a v1 termina em validação e preview no navegador; não haverá serviço, endpoint nem persistência.
2. **Fronteira Client mínima:** interação com `File`, drag-and-drop, player e Blob URLs fica em `VideoUploadPanel`; shell e conteúdo estático permanecem Server Components quando possível.
3. **Domínio independente:** política e resultado de validação são funções/tipos puros, sem dependência de React, Next.js ou fornecedor.
4. **Blob URL em vez de base64:** reduz cópia de memória e atende vídeos grandes; o ciclo de revogação é obrigatório.
5. **Um arquivo por vez:** simplifica estado, validação e intenção da primeira versão.
6. **200 MB decimal e inclusivo:** o limite técnico é `200.000.000 bytes`; a interface mostra “até 200 MB”.
7. **Sucesso local:** `ready` comunica somente que o preview está pronto no dispositivo. A palavra “enviado” não deve aparecer.
8. **Contêiner não é codec:** aceitar MP4/WebM não garante reprodução; erro do player é previsto e recuperável.
9. **Sem navegação fictícia:** a sidebar estabelece identidade e estrutura, mas não cria destinos ainda não especificados.
10. **MIME vazio com segunda validação:** extensão `.mp4` ou `.webm` pode resolver provisoriamente o formato quando `File.type` estiver vazio, mas `ready` exige metadados válidos carregados pelo navegador.
11. **Responsividade da navegação:** a navegação é uma sidebar vertical a partir de `640px` e uma barra superior compacta abaixo desse limite, sem duplicar estados ou destinos.
12. **Conteúdo editorial fixado:** os dois cards usam os textos aprovados em RF-016 e permanecem estáticos em Server Component quando possível.
13. **Server Components por padrão:** somente a feature que manipula File API, drag-and-drop, Blob URLs e eventos do player recebe `"use client"`; composição, navegação e conteúdo estático permanecem no servidor.
14. **Sem abstrações prematuras:** criar apenas módulos e componentes exigidos pelo fluxo atual; não introduzir barrel, contexto global, camada de serviço, factory ou hook compartilhado sem necessidade demonstrada.

## Decisões aprovadas

As quatro decisões anteriormente abertas foram resolvidas:

- **DA-001 — MIME vazio:** aprovado o fallback pela extensão, seguido obrigatoriamente de carregamento válido dos metadados pelo navegador.
- **DA-002 — Navegação mobile:** aprovada a barra superior compacta abaixo de `640px`, mantendo sidebar vertical a partir desse limite.
- **DA-003 — Cards:** aprovados os títulos e textos literais definidos em RF-016.
- **DA-004 — Destinos:** Upload é a única funcionalidade navegável; Dashboard e Análises podem aparecer desabilitados como funcionalidades futuras, sem novas rotas.

Não restam pontos funcionais, de segurança ou de contrato de dados em aberto para esta versão. A implementação continua condicionada à aprovação do plano abaixo.

## Revisão de consistência

### Resultado

- **Requisitos e contratos:** RF-006, RF-008 e RF-009 agora separam validação preliminar de validação de mídia. O contrato registra MIME declarado — inclusive vazio — e MIME resolvido, sem tratar extensão como prova suficiente do conteúdo.
- **Contratos e estados:** `LocalVideoV1` só existe após metadados válidos; durante `loading`, `previousVideo` explicita a preservação do vídeo atual em uma tentativa de substituição.
- **Estados e ciclo de vida:** Blob URL candidata é revogada em falha; URL ativa é revogada em remoção, substituição concluída ou desmontagem. A URL anterior não é revogada antes de um substituto chegar a `ready`.
- **Responsividade:** RF-018 e CA-015 fixam a transição exatamente entre `639px` e `640px` e exigem equivalência semântica entre barra superior e sidebar.
- **Conteúdo e navegação:** RF-016 contém o texto editorial aprovado; RF-017 impede rotas ou interações fictícias para Dashboard e Análises.
- **Arquitetura:** componentes estáticos permanecem Server Components; somente a feature de upload forma a fronteira Client; validação preliminar permanece pura e independente de React.

### Contradições identificadas e resolvidas

1. O contrato anterior exigia um MIME não vazio mesmo permitindo fallback por extensão. Foi dividido em `declaredMimeType` e `resolvedMimeType`.
2. O estado anterior de `loading` não representava o vídeo preservado durante uma substituição. Foi incluído `previousVideo`.
3. A duração era opcional mesmo após o estado `ready`. Como o carregamento de metadados agora é obrigatório, `durationSeconds` passou a ser número finito e não negativo.
4. A revogação anterior cobria apenas a URL ativa. RF-019 passou a cobrir também a URL candidata quando metadados falham.
5. “Sidebar compacta” poderia sugerir o mesmo padrão em todas as larguras. A regra agora fixa barra superior abaixo de `640px` e sidebar vertical a partir de `640px`.
6. Os cards antes tinham conteúdo apenas indicativo. RF-016 agora fixa títulos e textos literais aprovados.

Não foi encontrada contradição restante que impeça a implementação. O navegador carregar metadados reduz a confiança exclusiva na extensão, mas não equivale a inspeção binária completa; esse limite está declarado em RNF-011, RF-009 e na regra de identificação.

## Plano de implementação proposto

Nenhuma etapa abaixo deve começar antes da aprovação explícita deste plano. Antes de alterar código do framework, deve ser lida a documentação aplicável instalada em `node_modules/next/dist/docs/`, conforme `AGENTS.md`.

### Etapa 1 — Base visual, idioma e shell estático

Objetivo: preparar a identidade Dark Premium, metadados da aplicação e composição responsiva sem adicionar interação.

Arquivos previstos:

- Modificar `src/app/layout.tsx`: idioma `pt-BR`, metadados NEXGO e classes globais essenciais.
- Modificar `src/app/globals.css`: tokens aprovados, base dark, foco visível, redução de movimento e estilos globais mínimos.
- Criar `src/components/layout/nexgo-navigation.tsx`: marca, Upload ativo e Dashboard/Análises semanticamente desabilitados; sidebar/barra superior por CSS.

Validação:

- Executar `npm run lint` e `npx tsc --noEmit`.
- Inspecionar em `320`, `639`, `640`, `768`, `1024` e `1440px` para verificar troca de navegação, ausência de overflow e hierarquia.
- Navegar por teclado e conferir nomes acessíveis e ausência de links nos itens futuros.

### Etapa 2 — Domínio e contratos de validação

Objetivo: implementar regras puras para quantidade, extensão, MIME e tamanho, sem React ou APIs de renderização.

Arquivos previstos:

- Criar `src/features/video-upload/domain/video-validation.ts`: tipos privados, política v1, normalização e função pura de validação preliminar.

Validação:

- Conferir por TypeScript os ramos discriminados e executar `npm run lint` e `npx tsc --noEmit`.
- Verificar os casos da matriz unitária: MIME correspondente/vazio/divergente, extensão em caixa variada, arquivo vazio, limites `200.000.000` e `200.000.001`, e múltiplos arquivos.
- Não criar um arquivo de teste não executável. O projeto atualmente não possui test runner ou script `test`; a cobertura automatizada unitária será adicionada quando houver uma solução aprovada que não viole RNF-010. Até lá, esses casos serão exercitados pelo fluxo no navegador e a limitação será reportada.

### Etapa 3 — Fronteira Client do upload

Objetivo: implementar seleção, drag-and-drop, estados, Blob URLs, validação de metadados e recuperação de erros dentro da feature.

Arquivos previstos:

- Criar `src/features/video-upload/components/video-upload-panel.tsx`: única fronteira `"use client"`, estado discriminado e coordenação do ciclo de vida.
- Criar `src/features/video-upload/components/video-dropzone.tsx` somente se a extração reduzir de fato a complexidade do painel.
- Criar `src/features/video-upload/components/video-preview.tsx` somente se a extração isolar claramente player, metadados e ações.

Validação:

- Exercitar seleção por clique e drop, os cinco estados, arquivo válido, MIME vazio, formato inválido, arquivo vazio, tamanho excedido e múltiplos arquivos.
- Instrumentar no teste de navegador `URL.createObjectURL` e `URL.revokeObjectURL` para conferir criação e limpeza em falha, remoção, substituição e desmontagem.
- Confirmar ausência de autoplay, presença dos controles e ausência de requisição de rede contendo arquivo ou metadados.
- Verificar substituição válida e inválida, inclusive preservação do player anterior enquanto o candidato carrega ou falha.

### Etapa 4 — Composição da página e conteúdo aprovado

Objetivo: substituir a página inicial do template pela experiência Upload-First, mantendo conteúdo estático no servidor.

Arquivos previstos:

- Modificar `src/app/page.tsx`: compor shell, boas-vindas, painel Client e cards estáticos.
- Criar `src/features/video-upload/components/capability-card.tsx` apenas se dois cards justificarem o componente; caso contrário, mantê-los diretamente na composição para evitar abstração prematura.

Validação:

- Conferir os textos literais de RF-016 e que “Em breve” esteja visível nos dois cards.
- Confirmar que Upload é o único destino ativo e que nenhuma rota de Dashboard ou Análises foi criada.
- Comparar visualmente com `public/base-nexgo.jpg` apenas quanto à linguagem estética, verificando que a imagem não foi usada como background nem copiada funcionalmente.

### Etapa 5 — Acessibilidade, responsividade e verificação final

Objetivo: validar integralmente os critérios de aceite e corrigir somente desvios do escopo aprovado.

Arquivos previstos:

- Ajustar, se necessário, apenas os arquivos criados ou modificados nas etapas 1–4.
- Não criar novas camadas ou dependências durante o polimento.

Validação:

- Executar `npm run lint`, `npx tsc --noEmit` e `npm run build`.
- Percorrer CA-001 a CA-023 com a combinação de verificações estáticas e navegador, incluindo teclado, anúncios de estado, foco visível, zoom de `200%`, `prefers-reduced-motion` e larguras limítrofes `639/640px`.
- Verificar contraste WCAG 2.2 AA dos tokens efetivamente renderizados.
- Inspecionar rede e confirmar ausência de upload, telemetria, APIs ou rotas adicionais.
- Revisar o grafo Client para confirmar que apenas a feature interativa depende de APIs do navegador.
- Reportar comandos, resultados e a limitação de automação de testes decorrente da ausência de test runner, caso ela permaneça.

## Inventário consolidado de arquivos previstos

| Ação | Arquivo | Finalidade |
| --- | --- | --- |
| Modificar | `src/app/layout.tsx` | Idioma, metadados e base do documento |
| Modificar | `src/app/globals.css` | Tokens e estilos globais Dark Premium |
| Modificar | `src/app/page.tsx` | Composição Server da página Upload-First |
| Criar | `src/components/layout/nexgo-navigation.tsx` | Navegação responsiva e identidade |
| Criar | `src/features/video-upload/domain/video-validation.ts` | Contratos e validação preliminar pura |
| Criar | `src/features/video-upload/components/video-upload-panel.tsx` | Interatividade e estado local do upload |
| Condicional | `src/features/video-upload/components/video-dropzone.tsx` | Extração somente se simplificar o painel |
| Condicional | `src/features/video-upload/components/video-preview.tsx` | Extração somente se isolar responsabilidade real |
| Condicional | `src/features/video-upload/components/capability-card.tsx` | Extração somente se o padrão justificar reutilização |

Não estão previstos Route Handlers, novas rotas, hooks compartilhados, barrels, serviços, banco de dados, arquivos de configuração ou dependências adicionais.
