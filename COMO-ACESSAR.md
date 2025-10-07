# 🔐 Como Acessar o Sistema LaudoPay

## 🚀 Executar o Sistema

1. **Instalar dependências** (se ainda não fez):
```bash
npm install
```

2. **Executar em modo desenvolvimento**:
```bash
npm run dev
```

3. **Acessar no navegador**:
```
http://localhost:3000
```

## 🔑 Login Demo

O sistema está configurado em **modo demo** e aceita qualquer combinação de email/senha.

### Exemplos de login que funcionam:

- **Email**: `admin@demo.com` | **Senha**: `123456`
- **Email**: `medico@teste.com` | **Senha**: `senha123`
- **Email**: `qualquer@email.com` | **Senha**: `qualquersenha`

### ⚠️ Importante:
- Ambos os campos (email e senha) devem ser preenchidos
- O email deve ter formato válido (conter @ e domínio)
- A senha deve ter pelo menos 6 caracteres

## 🎯 Fluxo de Teste Completo

Após fazer login, você pode testar:

1. **Dashboard** - Ver estatísticas gerais
2. **Pacientes** - Cadastrar novos pacientes
3. **Novo Laudo** - Criar laudos com ou sem cobrança
4. **Laudos** - Ver todos os laudos criados
5. **Enviar Cobrança** - Simular envio via WhatsApp
6. **Download** - Baixar laudos prontos
7. **Configurações** - Alterar tema (claro/escuro)

## 🔧 Dados Demo Pré-carregados

O sistema vem com alguns dados de exemplo:

### Pacientes:
- João Silva (+5511999999999)
- Maria Santos (+5511888888888)

### Laudos:
- Exame de Sangue - João Silva (R$ 150,00 - Aguardando pagamento)
- Raio-X Tórax - Maria Santos (Gratuito - Pronto para download)

## 🌙 Dark Mode

- Clique no ícone de lua/sol no canto superior direito
- A preferência é salva automaticamente

## 📱 Responsivo

O sistema funciona em:
- Desktop
- Tablet
- Mobile

## ❓ Problemas Comuns

### "Não consigo fazer login"
- Verifique se preencheu email E senha
- Email deve ter formato válido (ex: teste@email.com)
- Senha deve ter pelo menos 6 caracteres

### "Página não carrega"
- Verifique se o servidor está rodando (`npm run dev`)
- Acesse http://localhost:3000
- Verifique se não há erros no console do navegador

### "Erro 404"
- O sistema redireciona automaticamente para /login se não autenticado
- Após login, redireciona para /dashboard

## 🔄 Reset do Sistema

Para limpar todos os dados e voltar ao estado inicial:
1. Abra o DevTools do navegador (F12)
2. Vá em Application > Storage
3. Clique em "Clear storage"
4. Recarregue a página

---

**Sistema pronto para demonstração! 🎉**