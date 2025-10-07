# LaudoPay - Sistema de Laudos Médicos

Sistema completo para assinatura de laudos médicos e cobrança via WhatsApp, construído com Next.js 15, TypeScript e TailwindCSS.

## 🚀 Funcionalidades

- ✅ **Autenticação JWT** com localStorage
- ✅ **Dashboard** com estatísticas e ações rápidas
- ✅ **Gestão de Laudos** - criar, visualizar, baixar
- ✅ **Gestão de Pacientes** - cadastro e listagem
- ✅ **Cobrança via WhatsApp** - envio de links de pagamento
- ✅ **Dark Mode** com toggle e persistência
- ✅ **Responsivo** - funciona em desktop e mobile
- ✅ **Validação de Formulários** com react-hook-form + zod
- ✅ **Toasts** para feedback do usuário
- ✅ **Middleware** para proteção de rotas
- ✅ **Testes** básicos com Jest + React Testing Library

## 🛠 Tecnologias

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS V4**
- **React Hook Form** + **Zod**
- **Lucide React** (ícones)
- **Jest** + **React Testing Library**

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/login/          # Página de login
│   ├── (dashboard)/
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── reports/           # Listagem de laudos
│   │   │   └── create/        # Criar novo laudo
│   │   ├── patients/          # Gestão de pacientes
│   │   └── settings/          # Configurações
│   └── layout.tsx
├── components/
│   ├── layout/                # Componentes de layout
│   │   ├── AppSidebar.tsx
│   │   ├── AppTopbar.tsx
│   │   └── ProtectedShell.tsx
│   ├── ReportCard.tsx         # Card de laudo
│   ├── ReportForm.tsx         # Formulário de laudo
│   ├── PatientForm.tsx        # Formulário de paciente
│   ├── PaymentStatusBadge.tsx # Badge de status
│   ├── WhatsappSendDialog.tsx # Modal de envio WhatsApp
│   ├── ConfirmDialog.tsx      # Modal de confirmação
│   └── Toast.tsx              # Sistema de notificações
├── hooks/
│   ├── useAuth.ts             # Hook de autenticação
│   └── useToast.ts            # Hook de toasts
├── lib/
│   ├── api.ts                 # Camada de API
│   ├── auth.ts                # Utilitários de auth
│   ├── types.ts               # Tipos TypeScript
│   └── validators.ts          # Schemas de validação
└── middleware.ts              # Middleware de rotas
```

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite as variáveis conforme necessário:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=LaudoPay
```

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

### 4. Login Demo

Para testar o sistema, use qualquer email/senha na tela de login (modo demo).

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch
```

## 📱 Fluxo de Uso

1. **Login** - Faça login com qualquer credencial (demo)
2. **Dashboard** - Visualize estatísticas e ações rápidas
3. **Cadastrar Paciente** - Vá em "Pacientes" → "Novo Paciente"
4. **Criar Laudo** - Vá em "Novo Laudo", selecione paciente, defina preço
5. **Enviar Cobrança** - Se o laudo exigir pagamento, clique em "Enviar Cobrança"
6. **Download** - Após pagamento, o laudo fica disponível para download

## 🎨 Personalização

### Cores e Tema

O sistema usa as classes do TailwindCSS. Para personalizar:

- **Cores primárias**: Edite as classes `bg-blue-*`, `text-blue-*`
- **Dark mode**: Automático com `dark:` classes
- **Componentes**: Baseados no TailAdmin existente

### Componentes Reutilizáveis

- `Button` - Botões com variantes
- `Badge` - Badges de status
- `Toast` - Notificações
- `Modal` - Diálogos e confirmações

## 🔌 Integração com Backend

O sistema está preparado para integração com backend através da camada `lib/api.ts`.

### Endpoints Esperados:

```
POST /auth/login
GET  /reports?me=true
POST /reports
POST /reports/:id/send-payment
GET  /reports/:id/download
GET  /patients
POST /patients
GET  /dashboard/stats
```

### Estrutura de Resposta:

```typescript
// Login
{ token: string, professional: { id, name, email } }

// Reports
{ id, title, body, price, requiresPayment, status, createdAt, patient }

// Stats
{ totalReports, pendingPayments, totalRevenue, readyReports }
```

## 🔒 Segurança

- **JWT** armazenado em localStorage
- **Middleware** protege rotas privadas
- **Interceptor** trata 401 automaticamente
- **Validação** client-side com Zod
- **HTTPS** recomendado em produção

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Executar build
npm start
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ usando Next.js e TailwindCSS**