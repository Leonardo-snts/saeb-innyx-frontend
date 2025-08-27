# Configuração do Projeto SAEB Innyx

## Configuração do Backend

### 1. Configurar variáveis de ambiente

Copie o arquivo `backend/env.example` para `backend/.env` e configure as variáveis:

```bash
cp backend/env.example backend/.env
```

Edite o arquivo `backend/.env` com suas configurações reais:

- **Firebase**: Configure suas credenciais do Firebase
- **Looker**: Configure suas credenciais do Looker
- **Porta**: A porta padrão é 5000

### 2. Instalar dependências

```bash
cd backend
npm install
```

## Configuração do Frontend

### 1. Instalar dependências

```bash
cd frontend
npm install
```

## Executando o Projeto

### Opção 1: Executar ambos simultaneamente (RECOMENDADO)

Na raiz do projeto:

```bash
# Instalar dependências de todos os projetos
npm run install:all

# Executar em modo desenvolvimento
npm run dev
```

### Opção 2: Executar separadamente

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

## Scripts Disponíveis

- `npm run dev` - Executa frontend e backend em modo desenvolvimento
- `npm run start` - Executa frontend e backend em modo produção
- `npm run build` - Constrói ambos os projetos
- `npm run install:all` - Instala dependências de todos os projetos
- `npm run clean:install` - Limpa e reinstala todas as dependências

## Portas

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

## Estrutura do Projeto

```
saeb-innyx/
├── backend/          # Servidor Node.js + Express
├── frontend/         # Aplicação React + Vite
├── package.json      # Scripts para executar ambos
└── SETUP.md         # Este arquivo
```

## Notas Importantes

1. **Node.js**: Certifique-se de ter Node.js versão 22 ou superior
2. **Variáveis de ambiente**: Nunca commite o arquivo `.env` no Git
3. **Firebase**: Configure corretamente as credenciais do Firebase
4. **Looker**: Configure as credenciais do Looker para integração
