# OdontoStar - Frontend 🦷

Interface web do sistema de agendamento odontológico OdontoStar.

## 🔗 Links

- **Frontend:** https://odontostar-frontend.vercel.app
- **Repositório Backend:** https://github.com/NatanSantana/odontostar-backend

---

## ☁️ Hospedagem

O FrontEnd está hospedado no **Vercel**

O backend está hospedado no **Render** no plano gratuito.

> ⚠️ **Atenção:** O servidor entra em modo de hibernação após um período de inatividade. Na primeira requisição após esse período, o servidor pode demorar **1 minuto ou mais** para responder. As requisições seguintes voltam ao normal.
```
---


## 🛠️ Tecnologias

- Vue.js 3
- Vue Router
- jwt-decode
- date-fns

---

## ⚙️ Funcionalidades

**Paciente (`user`):**
- Cadastro e login
- Agendamento de consultas com previsão do tempo
- Preenchimento automático de endereço por CEP
- Cancelamento de consultas
- Visualização de consultas no perfil

**Administrador (`admin`):**
- Gerenciamento de consultas (marcar como realizada ou cancelar)
- Cadastro de dentistas
- Cadastro de usuários com qualquer role

**Dentista (`Dentista`):**
- Lançamento de datas e horários disponíveis

---

## 🚀 Como Rodar Localmente

**Pré-requisitos:**
- Node.js instalado
- Backend rodando localmente ou usando a URL de produção

**Instalação:**
```bash
cd app
npm install
npm run serve
```

O frontend estará disponível em `http://localhost:8080`.

---

## 🔧 Configuração

Por padrão o frontend aponta para o backend em produção. Para rodar com o backend local, troque a URL nas chamadas fetch de:

```
https://odontostar-backend.onrender.com
```

Para:

```
http://localhost:3080
```

---

## 📄 Páginas

| Página | Rota | Acesso |
|--------|------|--------|
| Página Principal | `/` | Público |
| Login | `/login` | Público |
| Cadastro | `/cadastro` | Público |
| Agendamento | `/agendamento` | Usuário logado |
| Perfil | `/perfil` | Usuário logado |
| Gerenciamento | `/gerenciamento` | Admin |

---