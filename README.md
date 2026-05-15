# Animação 3D com Three.js

Visualizador interativo de modelo 3D com animação esqueletal, desenvolvido com Three.js para trabalho acadêmico.

## Descrição

Aplicação web que carrega um modelo GLB contendo animação de dança, permitindo controle via interface com botões e câmera interativa. O projeto demonstra o uso de ferramentas essenciais de gráficos 3D em tempo real, incluindo carregamento de ativos, iluminação, controle de câmera e reprodução de animações.

## Tecnologias

- **Three.js** 0.179.1 — biblioteca de gráficos 3D para WebGL
- **GLTFLoader** — carregador de modelos em formato glTF/GLB
- **OrbitControls** — controle orbital da câmera com suporte a toque e damping
- **HTML5**, **CSS3**, **JavaScript** (ES6 modules)
- **WebGL** — renderização de gráficos

## Estrutura do Projeto

```
trabalho_animacao/
├── index.html                          # Entrada HTML principal
├── assets/
│   ├── javascript/
│   │   └── main.js                     # Lógica Three.js, animação e eventos
│   ├── styles/
│   │   └── style.css                   # Estilização dos controles e UI
│   ├── models/
│   │   └── shaggy_macarena_dance.glb   # Modelo 3D com animação
│   └── images/
│       └── scooby-snack.png            # Textura dos botões
└── README.md                           # Este arquivo
```

## Como Executar

### Requisitos

- Navegador moderno com suporte a WebGL e ES6 modules
- Conexão com internet (Three.js carregado via CDN)

### Passos

1. Clonar ou baixar o projeto:

   ```bash
   git clone https://github.com/Luiz-Fernando-Policarpo-Leandro/animacao_shaggy.git
   cd trabalho_animacao
   ```

2. Servir localmente com um servidor HTTP simples:

   **Com Python 3:**

   ```bash
   python -m http.server 8000
   ```

   **Com Node.js (npm http-server):**

   ```bash
   npx http-server
   ```

   **Com PHP:**

   ```bash
   php -S localhost:8000
   ```

3. Abrir no navegador:
   ```
   http://localhost:8000
   ```

## Funcionalidades Implementadas

### Carregamento de Modelo

- Carregamento assíncrono de arquivo GLB via GLTFLoader
- Extração automática da primeira animação do modelo
- Feedback de progresso de carregamento no console

### Controle de Câmera

- **OrbitControls** para rotação, zoom e pan
- Damping habilitado para movimento suave
- Posicionamento inicial da câmera em perspectiva 3/4

### Iluminação

- **Luz Ambiente** branca com intensidade 1.0 para cobertura geral
- **Luz Direcional** branca com intensidade 2.0 posicionada em (5, 10, 5)

### Controle de Animação via Botões

| Botão                | Função                                                       |
| -------------------- | ------------------------------------------------------------ |
| **Dance** / **Idle** | Inicia ou para a animação                                    |
| **Play** / **Pause** | Pausa ou retoma a reprodução (apenas durante animação ativa) |
| **Reset**            | Reinicia a animação do começo (mantém estado play/pause)     |

### Interação de Teclado

- **easter egg**: Aperte enter e shift ao mesmo tempo

## Fonte do Modelo

**Origem:** [Sketchfab](https://sketchfab.com/)  
**Modelo:** [Shaggy Macarena Dance](https://sketchfab.com/3d-models/shaggy-macarena-dance-c46e35ea92e34e08b6f6d8a6007f743b)  
**Licença:** Consultar página original do modelo para detalhes de uso

## Observações Técnicas

- **CORS:** O projeto usa imports via CDN (jsDelivr/unpkg). Avisos de CORS no console são normais em desenvolvimiento local se acessar via `file://`
- **Performance:** Otimizado para dispositivos com suporte a WebGL. Teste em navegadores diferentes para compatibilidade
- **Animações:** O mixer de animação utiliza delta time para sincronização correta entre frames
- **Responsividade:** Interface e câmera ajustam-se automaticamente ao redimensionamento da janela

## Notas Finais

Este projeto atende requisitos acadêmicos de demonstração prática de Three.js, cobrindo conceitos fundamentais de gráficos 3D interativos em tempo real.

Para issues ou melhorias, abra uma discussion no repositório.
