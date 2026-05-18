# 🌿 Greencut (v0.2.1-BETA)

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
* **Desdesperdício de Recursos:** Frentes de conservação (equipes de roçada mecanizada e manual) são enviadas para trechos que ainda não necessitam de manutenção com base em cronogramas fixos (ex: a cada 30 dias), desperdiçando combustível, horas de trabalho e desgaste de maquinário pesado.

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

* **Core do Ecossistema:** `React Native (v18.3.1)` & `TypeScript`.
  * *Justificativa:* Garante a compilação nativa para sistemas operacionais mobile (iOS/Android), permitindo acesso direto às APIs de hardware (como GPS e Câmera), combinado com a segurança de tipagem do TypeScript para evitar falhas em tempo de execução ao manipular dados dos sensores.
* **Ferramental de Build & Deploy Híbrido:** `Vite (v6.3.5)` & `pnpm`.
  * *Justificativa:* Como a solução requer acessibilidade imediata tanto em campo quanto em escritórios centrais, o ecossistema é preparado para deploys híbridos e rápidos (**PWA-Ready**). O `pnpm` otimiza o cache de módulos e acelera o ciclo de integração contínua (CI/CD).
* **Camada de Interface (UI/UX):** `Tailwind CSS (v4.1.12)`, `Tailwind Merge`, `Radix UI` e `Lucide React (v0.487.0)`.
  * *Justificativa:* O uso de Tailwind v4 com CSS Variables permite a injeção instantânea de temas de **alto contraste**, essencial para operadores que usam o aplicativo sob luz solar direta em rodovias. O Radix UI garante primitivos de acessibilidade física e digital.
* **Micro-Interações e Dinâmica:** `Motion (v12.23.24)`.
  * *Justificativa:* Fornece feedbacks visuais e transições fluidas no mapa e nas mudanças de status das ordens de serviço, reduzindo a carga cognitiva dos usuários.
* **Gerenciamento de Formulários e Notificações:** `React Hook Form (v7.55.0)` e `Sonner (v2.0.3)`.
  * *Justificativa:* Reduz as re-renderizações ao preencher relatórios técnicos de campo, preservando a bateria dos dispositivos móveis. O Sonner entrega alertas de prioridade do tipo "toast" de forma síncrona.

---

## 🚫 Restrições Técnicas Identificadas
Durante a fase de exploração e mapeamento da arquitetura da solução, o grupo identificou as seguintes restrições tecnológicas que moldaram o desenvolvimento do software:

1. **Zonas de Sombra de Conectividade:** Rodovias frequentemente possuem trechos sem cobertura de rede celular 3G/4G/5G. 
   * *Mitigação no App:* A arquitetura do app foi projetada para ser **Offline-capable**. As Ordens de Serviço e mapas locais são cacheados e as alterações de status são salvas em um banco local, aguardando a sincronização automática assim que o sinal for restabelecido.
2. **Restrição Energética e de Alcance dos Totens IoT:** Os sensores de campo operam por baterias alimentadas por energia solar e não possuem largura de banda para conexões HTTP tradicionais de longo alcance.
   * *Mitigação no App:* A camada de backend abstrai a comunicação via protocolo LoRaWAN (baixo consumo e longo alcance). O aplicativo consome uma API REST limpa que recebe apenas as cargas de dados brutas (telemetria de distância em centímetros e ID do totem), sem sobrecarregar o tráfego de dados.
3. **Ergonomia e Ambiente de Operação Severo:** Operadores de campo utilizam luvas e operam em ambientes de alta trepidação e barulho.
   * *Mitigação no App:* Restrição na interface de design. Botões de ação principal (como "Iniciar Roçada" ou "Concluir") possuem áreas de clique (*hit targets*) expandidas no Figma, evitando cliques errados.

---

## 📋 Lista de Requisitos

### Requisitos Funcionais (RF)
* **RF01:** O aplicativo deve apresentar um mapa interativo exibindo a malha rodoviária dividida por trechos e quilometragens.
* **RF02:** O sistema deve categorizar e exibir visualmente o nível crítico da vegetação por cores (Verde: OK, Amarelo: Atenção, Vermelho: Crítico - acima de 30cm).
* **RF03:** O app deve permitir ao Gestor gerar e despachar uma Ordem de Serviço (OS) vinculada a um ponto geográfico crítico.
* **RF04:** O aplicativo deve permitir que o Operador visualize as tarefas destinadas a ele e altere o status para "Em Andamento" e "Concluído".
* **RF05:** O app deve disparar notificações visuais urgentes (Toasts) na tela do painel assim que um totem reportar violação dos limites da ARTESP/ANTT.

### Requisitos Não Funcionais (RNF)
* **RNF01 (Disponibilidade/Resiliência):** O aplicativo deve persistir dados localmente e permitir a alteração de status de Ordens de Serviço mesmo sem conexão com a internet (*Offline-First*).
* **RNF02 (Usabilidade/Acessibilidade):** A paleta de cores e tipografia aplicadas na interface do operador devem seguir padrões de alto contraste W3C para visualização sob luz solar direta.
* **RNF03 (Desempenho):** O tempo de renderização e atualização dos marcadores de sensores no mapa não deve ultrapassar 2 segundos sob conexões de dados móveis padrão.
* **RNF04 (Segurança):** O acesso às telas de despacho de frentes de trabalho deve ser restrito via autenticação de credenciais corporativas criptografadas.

---

## 🎨 Protótipo no Figma
O protótipo de alta fidelidade simula com precisão as jornadas de análise (Gestor) e execução (Operador), incluindo os fluxos de login, navegação pelo dashboard de priorização e acompanhamento de ordens de serviço.

👉 [Acesse o Protótipo Navegável do Greencut no Figma](https://www.figma.com/make/aEjgDVVWaESowEwTYpG7wB/Motiva-Greencut--0.2.1-BETA-?t=Areq4SY2juVczFfp-1)
