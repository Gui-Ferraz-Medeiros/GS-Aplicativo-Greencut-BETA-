# 🌿 Greencut (v0.2.1-BETA-MOCKADO)

> Solução inteligente para detecção de vegetação alta, conformidade regulatória e otimização de frentes de conservação nas rodovias da Motiva.

---

## 👥 Integrantes do Grupo (Grupo 24)
* **Guilherme Ferraz** - RM: 564743
* **Roberto Marques Moreira** - RM: 564935
* **Anny Elly** - RM: 565055
* **Laís Salomão** - RM: 565262

---

## 📑 Contexto Operacional e Regulatório (ARTESP & ANTT)
A manutenção e conservação das faixas de domínio das rodovias brasileiras são rigidamente fiscalizadas por órgãos reguladores como a **ARTESP** (âmbito estadual) e a **ANTT** (âmbito federal). Essas entidades exigem que a vegetação ao longo das pistas seja mantida sob limites estritos (geralmente abaixo de 30 cm) para:
1. Garantir a visibilidade total das placas de sinalização vertical.
2. Evitar a obstrução de praças de pedágio, trevos e acessos.
3. Prevenir incêndios na vegetação seca que possam comprometer a visibilidade das pistas.

**O Impacto Financeiro:** O não cumprimento dessas exigências resulta em notificações automáticas e **multas contratuais pesadas diárias** para a concessionária Motiva. Portanto, a eficiência na roçada é diretamente ligada à saúde financeira e jurídica da empresa.

---

## 🎯 O Problema Específico
Atualmente, o monitoramento da vegetação ao longo das rodovias administradas pela Motiva depende de inspeções visuais humanas. Inspetores precisam percorrer milhares de quilômetros de carro, anotando o estado da grama em planilhas ou pranchetas "a olho".

Isso gera um **gargalo operacional**:
* **Incompatibilidade Temporal:** A grama pode crescer aceleradamente após períodos de chuva intensa, atingindo níveis críticos antes da próxima inspeção agendada.
* **Desperdício de Recursos:** Frentes de conservação (equipes de roçada mecanizada e manual) são enviadas para trechos que ainda não necessitam de manutenção com base em cronogramas fixos (ex: a cada 30 dias), desperdiçando combustível, horas de trabalho e desgaste de maquinário pesado.

---

## 💡 A Proposta de Solução: Greencut
O **Greencut** é um ecossistema multiplataforma (Mobile Native & PWA) projetado para automatizar o **reconhecimento, coleta de dados de telemetria e despacho estratégico** de frentes de trabalho.

A solução integra dados físicos coletados por totens IoT (equipados com sensores ultrassônicos e transmissão via rede LoRa/Wi-Fi) a uma interface de software de alta performance. O sistema traduz a altura da grama em "status de criticidade", gerando relatórios de priorização automatizados e permitindo a abertura imediata de Ordens de Serviço (OS) para os trechos que violam as normas da ARTESP/ANTT.

---

## 👥 Personas e Atores Envolvidos

### 1. O Gestor de Infraestrutura / Supervisor (Âmbito de Análise)
* **Perfil:** Profissional de engenharia ou logística responsável por garantir o cumprimento dos contratos regulatórios e gerenciar o orçamento das frentes de conservação.
* **Uso do App:** Acessa o dashboard gerencial (PWA/Desktop ou Mobile), analisa o mapa interativo com os pins de criticidade (Normal, Atenção, Crítico) e realiza o planejamento estratégico semanal, despachando ordens de serviço direcionadas.

### 2. O Operador da Frente de Conservação (Âmbito de Execução)
* **Perfil:** Profissional técnico que atua diretamente em campo operando roçadeiras mecânicas ou tratores. Enfrenta desafios como sol forte, ruído severo e zonas de sombra de conectividade (falta de sinal celular).
* **Uso do App:** Recebe a Ordem de Serviço em seu dispositivo mobile com a rota otimizada até o quilômetro exato do problema, executa o serviço e atualiza o status de manutenção (mesmo estando offline).

---

## 🛠 Stack Tecnológica e Justificativa

A arquitetura de software do Greencut foi desenhada sob o paradigma de **extrema portabilidade, leveza e resiliência de dados**:

* **Core do Ecossistema:** `React` & `TypeScript`.
  * *Justificativa:* Garante desempenho de interface e segurança de tipagem para manipulação dos dados dos sensores.
* **Ferramental de Build & Deploy Híbrido:** `Vite` & `pnpm`.
  * *Justificativa:* Como a solução requer acessibilidade imediata tanto em campo quanto em escritórios centrais, o ecossistema é preparado para deploys rápidos e leves. O `pnpm` otimiza o cache de módulos e acelera o ciclo de integração.
* **Camada de Interface (UI/UX):** `Tailwind CSS`, `Radix UI` e `Lucide React`.
  * *Justificativa:* O uso de Tailwind permite temas de alto contraste essenciais para operadores sob luz solar direta. O Radix UI garante acessibilidade e consistência.
* **Micro-Interações e Dinâmica:** `framer-motion`.
  * *Justificativa:* Fornece feedbacks visuais e transições fluidas nas mudanças de status e navegação entre telas.
* **Gerenciamento de Formulários e Notificações:** `React Hook Form` e `Sonner`.
  * *Justificativa:* Reduz re-renderizações ao preencher relatórios de campo e apresenta alertas de prioridade de forma clara.

---

## 🚫 Restrições Técnicas Identificadas
Durante a fase de exploração e mapeamento da arquitetura da solução, o grupo identificou as seguintes restrições tecnológicas que moldaram o desenvolvimento do software:

1. **Zonas de Sombra de Conectividade:** Rodovias frequentemente possuem trechos sem cobertura de rede celular 3G/4G/5G.
   * *Mitigação no App:* A arquitetura do app foi projetada para ser **offline-capable**. As Ordens de Serviço e mapas locais são cacheados e as alterações de status são salvas localmente, aguardando sincronização quando o sinal voltar.
2. **Restrição Energética e de Alcance dos Totens IoT:** Os sensores de campo operam por baterias alimentadas por energia solar e não possuem largura de banda para conexões HTTP tradicionais de longo alcance.
   * *Mitigação no App:* A camada de backend abstrai a comunicação via protocolo LoRaWAN. O aplicativo consome uma API REST limpa que recebe apenas as cargas de dados necessárias.
3. **Ergonomia e Ambiente de Operação Severo:** Operadores de campo utilizam luvas e atuam em ambientes de alta trepidação e barulho.
   * *Mitigação no App:* Botões de ação principal possuem áreas de clique expandidas e elementos de interface de alto contraste, reduzindo o risco de cliques errados.

---

## 📋 Lista de Requisitos

### Requisitos Funcionais (RF)
* **RF01:** O aplicativo deve apresentar um mapa interativo exibindo a malha rodoviária dividida por trechos e quilometragens.
* **RF02:** O sistema deve categorizar e exibir visualmente o nível crítico da vegetação por cores (Verde: OK, Amarelo: Atenção, Vermelho: Crítico - acima de 30cm).
* **RF03:** O app deve permitir ao Gestor gerar e despachar uma Ordem de Serviço (OS) vinculada a um ponto geográfico crítico.
* **RF04:** O aplicativo deve permitir que o Operador visualize as tarefas destinadas a ele e altere o status para "Em Andamento" e "Concluído".
* **RF05:** O app deve disparar notificações visuais urgentes (toasts) na tela do painel assim que um totem reportar violação dos limites da ARTESP/ANTT.

### Requisitos Não Funcionais (RNF)
* **RNF01 (Disponibilidade/Resiliência):** O aplicativo deve persistir dados localmente e permitir alteração de status de Ordens de Serviço mesmo sem conexão com a internet (*offline-first*).
* **RNF02 (Usabilidade/Acessibilidade):** A paleta de cores e tipografia aplicadas na interface do operador devem seguir padrões de alto contraste W3C para visualização sob luz solar direta.
* **RNF03 (Desempenho):** O tempo de renderização e atualização dos marcadores de sensores no mapa não deve ultrapassar 2 segundos sob conexões de dados móveis padrão.
* **RNF04 (Segurança):** O acesso às telas de despacho de frentes de trabalho deve ser restrito via autenticação de credenciais.

---

## 🎨 Protótipo no Figma
O protótipo de alta fidelidade simula com precisão as jornadas de análise (Gestor) e execução (Operador), incluindo os fluxos de login, navegação pelo dashboard de priorização e acompanhamento de ordens de serviço.

👉 [Acesse o Protótipo Navegável do Greencut no Figma](https://www.figma.com/make/aEjgDVVWaESowEwTYpG7wB/Motiva-Greencut--0.2.1-BETA-?t=Areq4SY2juVczFfp-1)

---

## 🚀 Instalação

1. Abra o terminal no diretório do projeto:
   ```bash
   cd c:Seucaminho\sprint2-cpad-greencut-guif-4
   ```

2. Instale as dependências com `npm` (ou `pnpm` se preferir):
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

4. Abra o endereço mostrado no terminal (geralmente `http://localhost:5173`).

---

## 📁 Estrutura Principal do Projeto

* `src/main.tsx` — ponto de entrada da aplicação.
* `src/app/App.tsx` — controle de telas, estado global e lógica de navegação.
* `src/app/components/` — componentes de interface como `Dashboard`, `LoginScreen`, `OperatorDashboard`, `ReportScreen` e `SensorDetails`.
* `src/mocks/mockData.ts` — dados falsos para rodovias, sensores, ocorrências, notificações e intervenções.

---

## 💡 Observações

* O app usa mock de dados local para simular o comportamento de uma solução Motiva, sem chamadas a APIs externas.
* A entrega foca na estrutura do código, navegação funcional e apresentação de cenários realistas para a Sprint 2.