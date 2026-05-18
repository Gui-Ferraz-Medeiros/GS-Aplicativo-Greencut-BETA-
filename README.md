# 🌿 Greencut (v0.2.1-BETA)

> Solução inteligente para detecção de vegetação alta e otimização de frentes de conservação nas rodovias concessionadas da Motiva.

---

## 👥 Integrantes do Grupo
* **Guilherme Ferraz** - RM: [Seu RM]
* **Roberto Moreira** - RM: [RM Roberto]
* **Anny Elly** - RM: [RM Anny]
* **Laís Salomão** - RM: [RM Laís]

---

## 🎯 O Problema
Atualmente, o monitoramento da vegetação ao longo das rodovias administradas pela Motiva depende de inspeções visuais humanas e cronogramas operacionais fixos (ex: roçada a cada 30 dias). Isso gera um cenário de ineficiência de recursos: equipes são deslocadas para locais que não demandam manutenção (gerando custos com combustível e maquinário) ou atuam tardiamente em áreas críticas, onde a mata alta já obstrui placas de sinalização e reduz a visibilidade dos motoristas, violando diretrizes da ARTESP e ANTT.

---

## 💡 A Proposta de Solução: Greencut
O **Greencut** é um ecossistema mobile e PWA focado no **reconhecimento, coleta de dados em tempo real e despacho estratégico de frentes de trabalho**. 
O aplicativo centraliza os dados coletados pelos sensores de campo (totens IoT), gera mapas dinâmicos sobre o estado da rodovia e automatiza o envio de Ordens de Serviço (OS) para os operadores, eliminando o achismo e transformando a conservação rodoviária em um processo sob demanda orientado a dados.

---

## 👤 Personas Mapeadas

### 1. O Gestor de Infraestrutura (Análise)
* **Perfil:** Responsável por analisar a saúde das rodovias, controlar o orçamento de manutenção e bater as metas regulatórias.
* **Uso do App:** Utiliza o dashboard para visualizar os pontos de mata alta, priorizar trechos de risco e despachar as frentes de trabalho de forma automatizada.

### 2. O Operador de Campo (Execução)
* **Perfil:** Profissional que realiza a roçada física nas pistas. Muitas vezes trabalha sob sol forte e em zonas com baixa conectividade.
* **Uso do App:** Recebe a rota otimizada da Ordem de Serviço, atualiza o status do trabalho em tempo real e utiliza o modo offline para registrar a conclusão do serviço mesmo sem sinal.

---

## 🛠 Stack Tecnológica e Justificativa

A arquitetura do Greencut foi selecionada com foco em alta performance, design responsivo de nível de produção e resiliência em campo:

### Core & Framework
* **React Native (v18.3.1) & TypeScript:** Desenvolvimento cross-platform robusto, garantindo tipagem estática e segurança na manipulação dos dados de telemetria dos sensores.
* **Vite (v6.3.5) & pnpm:** Setup de build ultra-rápido com gerenciador de pacotes eficiente, minimizando o consumo de disco e o tempo de build.

### Interface & Estilização
* **Tailwind CSS (v4.1.12), Custom CSS variables & Tailwind Merge:** Estilização utilitária de última geração que permite criar uma identidade visual consistente, escalável e de carregamento instantâneo.
* **Radix UI & Lucide React (v0.487.0):** Componentes de interface primitivos com foco total em acessibilidade e iconografia limpa para facilitar o uso por operadores em campo.
* **Motion (v12.23.24):** Animações fluidas para melhorar as transições de status e a experiência de navegação (UX).

### Fluxo de Dados & Notificações
* **React Hooks:** Gerenciamento de estado nativo, limpo e previsível.
* **React Hook Form (v7.55.0):** Performance otimizada para o preenchimento de relatórios e abertura de ordens de serviço em campo sem re-renderizações desnecessárias.
* **Sonner (v2.0.3):** Sistema de notificações toast elegante e imediato para alertas críticos de mata alta.

### Características Especiais
* **PWA-ready & Responsive Design:** O app se adapta perfeitamente a tablets de frotas de caminhões ou celulares dos operadores.
* **Offline-capable:** Capacidade de armazenar e processar dados localmente enquanto o operador estiver em áreas sem cobertura de rede telefônica na rodovia.

---

## 📋 Documentação de Requisitos

### Requisitos Funcionais (RF)
* **RF01:** O sistema deve exibir um mapa interativo com os trechos da rodovia e o nível de crescimento da vegetação em tempo real.
* **RF02:** O sistema deve permitir que o Gestor despache uma equipe enviando uma Ordem de Serviço diretamente para o app do Operador.
* **RF03:** O app do Operador deve traçar a rota exata até o trecho que necessita da roçada.
* **RF04:** O aplicativo deve permitir o registro de conclusão da roçada (mudança de status) mesmo sem conexão com a internet.

### Requisitos Não Funcionais (RNF)
* **RNF01:** A interface deve seguir padrões de alto contraste para permitir a leitura do operador sob luz solar direta.
* **RNF02:** O aplicativo deve sincronizar os dados salvos localmente assim que o dispositivo restabelecer conexão com a rede celular.
* **RNF03:** O tempo de resposta para atualização de dados críticos em tela não deve ultrapassar 2 segundos em conexões estáveis.

---

## 🎨 Protótipo no Figma
O protótipo de alta fidelidade mapeia toda a jornada do Gestor e do Operador, aplicando as transições ideais de tela.

👉 [Acesse o Protótipo Navegável do Greencut no Figma](https://www.figma.com/make/aEjgDVVWaESowEwTYpG7wB/Motiva-Greencut--0.2.1-BETA-?t=Areq4SY2juVczFfp-1)
