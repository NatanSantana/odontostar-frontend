<template>
    <h1 id="TituloLogin">LOGIN</h1>


    <form class="login"  @submit.prevent="login">

      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" name="email" required>
      <span v-show="verificacao === true" style="color: red;">Email inválido!</span>

      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" name="password" required>

      <button type="submit">Login</button>
    </form>

    <div id="spanAcessos">

      <span  v-if="spanAcesso === false" style="color: red;">ACESSO NEGADO: EMAIL OU SENHA INVÁLIDO</span>
    </div>
    




</template>

<style> 

#spanAcessos {
  margin-top: 10px;
}

#TituloLogin {
  color: white;
  background: linear-gradient(90deg, rgb(0, 6, 85), rgb(60, 80, 200));
  width: 800px;
  height: 50px;
  margin: 0 auto;
  padding-top: 10px;
  border-radius: 5px;
  letter-spacing: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 15px;
  
}

.login button {
  margin-top: 20px;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  color: white;
  background-color: rgb(0, 6, 85);
  font-weight: bold;
  font-size: 15px;
  border: 1px solid #ccc;
  border-color: black;
}

.login input {
  padding: 10px;
  font-size: medium;
  border-radius: 10px;
  width: 300px;
  border: 0px solid #000000;
  
}

.login label {
  font-size: 20px;
  font-weight: bold;
  color: #fdfdfd;

  
}


</style>



<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const verificacao = ref(false)
const email = ref('')
const password = ref('')
let spanAcesso = ref(true)

watch(email, (novoEmail) => {
  if (!novoEmail.includes('@') || !novoEmail.includes('.')) {
    verificacao.value = true
  } else {
    verificacao.value = false
  }
})

async function login() {
  const response = await fetch("http://localhost:3080/api/login-user", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, senha: password.value })
  })

  if (!response.ok) {
    spanAcesso.value = false
    console.error("Acesso Negado")
    return
  }

  const data = await response.json()
  localStorage.setItem('token', data.token)
  router.push('/agendamento')
}
</script>