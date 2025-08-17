# Frontend Tailwind - SAEB Innyx

## 📋 Descrição
Frontend React com Tailwind CSS para integração com Looker, incluindo telas de Participação e Notas.

## 🚀 Tecnologias
- **React 18** - Biblioteca para construção de interfaces
- **Tailwind CSS** - Framework CSS utility-first
- **Vite** - Build tool e dev server
- **React Router** - Roteamento client-side
- **Axios** - Cliente HTTP para requisições
- **Chart.js** - Biblioteca de gráficos
- **Chartjs-plugin-datalabels** - Plugin para labels nos gráficos

## 🎯 Funcionalidades

### 📊 Tela de Participação (`/`)
- **Gráfico por Distrito** (Look 410): Percentual de presentes/ausentes por distrito
- **Tabela Detalhada** (Look 411): Dados completos de participação
- **Gráfico SEMED** (Look 412): Percentual total de presentes/ausentes
- **Filtros dinâmicos**: Simulado, Escola, Fase, Turma

### 📈 Tela de Notas (`/notas`)
- **Score Card Acertos** (Look 413): Percentual de acertos
- **Score Card Erros** (Look 414): Percentual de erros  
- **Gráfico por Distrito** (Look 415): Acertos e erros por distrito
- **Filtros dinâmicos**: Simulado, Escola, Fase, Turma

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── Navigation.jsx          # Navegação entre páginas
│   ├── participacoes/          # Componentes da tela de participação
│   │   ├── DistritoChart.jsx   # Gráfico por distrito
│   │   ├── TotalChart.jsx      # Gráfico SEMED
│   │   ├── TabelaParticipacoes.jsx # Tabela de dados
│   │   └── Filtros.jsx         # Filtros dinâmicos
│   └── notas/                  # Componentes da tela de notas
│       ├── ScoreCardAcertos.jsx # Score card de acertos
│       ├── ScoreCardErros.jsx  # Score card de erros
│       ├── GraficoDistrito.jsx # Gráfico por distrito
│       └── Filtros.jsx         # Filtros dinâmicos
├── pages/
│   ├── Participacoes.jsx       # Página principal de participação
│   └── Notas.jsx               # Página de notas
├── services/
│   └── api.js                  # Serviços de API para Looker
└── App.jsx                     # Componente principal com rotas
```

## 🔌 Integração Looker

### Looks Utilizados

#### Tela de Participação:
- **Look 410**: `participacoes_saeb.porcet_presentes` e `participacoes_saeb.porcet_ausentes` por distrito
- **Look 411**: `participacoes_saeb.sum_presentes`, `participacoes_saeb.sum_ausentes`, etc.
- **Look 412**: `participacoes_saeb.porcet_presentes` e `participacoes_saeb.porcet_ausentes` total

#### Tela de Notas:
- **Look 413**: `notas_saeb.porcentagem_acertos` (score card)
- **Look 414**: `notas_saeb.porcentagem_erros` (score card)
- **Look 415**: `notas_saeb.porcentagem_acertos` e `notas_saeb.porcentagem_erros` por distrito

#### Filtros (compartilhados):
- **Look 422**: `participacoes_saeb.simulado`
- **Look 423**: `participacoes_saeb.escola`
- **Look 424**: `participacoes_saeb.fase`
- **Look 425**: `participacoes_saeb.turma`

### Endpoint da API
```
POST /api/looker/processes
{
  "lookId": "ID_DO_LOOK",
  "filters": {
    "campo": "valor"
  }
}
```

## 🎨 Design System

### Cores
- **Teal**: `#0891b2` (azul-esverdeado)
- **Orange**: `#f97316` (laranja)
- **Gray**: Tons de cinza para textos e bordas

### Componentes
- **Score Cards**: Cards grandes com fundo colorido e números grandes
- **Gráficos**: Barras lado a lado com labels e legendas
- **Tabelas**: Dados organizados com headers coloridos
- **Filtros**: Dropdowns responsivos com labels

## 🚀 Como Executar

### Instalação
```bash
cd frontend-tailwind
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` baseado no `.env.example`:
```env
VITE_API_URL=http://localhost:3001
```

### Looker
Configure as credenciais do Looker no arquivo `.env`:
```env
LOOKER_CLIENT_ID=seu_client_id
LOOKER_CLIENT_SECRET=seu_client_secret
LOOKER_BASE_URL=https://creattives.cloud.looker.com
```

## 📱 Responsividade
- **Mobile First**: Design responsivo para todos os dispositivos
- **Grid System**: Layout adaptativo com Tailwind CSS
- **Breakpoints**: sm, md, lg, xl para diferentes tamanhos de tela

## 🧪 Testes
- **Console Logs**: Logs de debug para verificar dados
- **Error Boundaries**: Tratamento de erros com fallbacks
- **Loading States**: Estados de carregamento para melhor UX

## 🔄 Atualizações
- **Filtros em Tempo Real**: Atualização automática ao alterar filtros
- **Cache de Dados**: Dados são buscados apenas quando necessário
- **Estado Global**: Gerenciamento de estado com React hooks

## 📚 Recursos Adicionais
- **Navegação**: Alternância entre telas de Participação e Notas
- **Filtros Compartilhados**: Mesma lógica de filtros em ambas as telas
- **Design Consistente**: Visual uniforme entre todas as páginas
