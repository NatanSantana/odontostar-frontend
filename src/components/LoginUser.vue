<template>
    <h1 id="TituloLogin">LOGIN</h1>

    <div class="botoes">

  <button @click="$router.push('/')" id="menu" >Menu</button>


</div>


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
  text-align: center;
}

#TituloLogin {
  color: white;
  background: linear-gradient(90deg, rgb(0, 6, 85), rgb(60, 80, 200));
  width: 90%;
  max-width: 800px;
  height: 50px;
  margin: 0 auto;
  padding-top: 10px;
  border-radius: 5px;
  letter-spacing: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  gap: 15px;
  padding: 0 20px;
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


@media (max-width: 768px) {
  #TituloLogin {
    font-size: 18px;
    letter-spacing: 3px;
    height: auto;
    padding: 15px 10px;
  }

  .login input {
    width: 100%;
    max-width: 300px;
  }

  .login button {
    width: 100%;
    max-width: 300px;
  }
}


@media (max-width: 480px) {
  #TituloLogin {
    font-size: 16px;
    letter-spacing: 2px;
    padding: 12px 10px;
  }

  .login {
    margin-top: 30px;
    gap: 10px;
  }

  .login input {
    width: 100%;
    max-width: 280px;
    font-size: 16px; 
  }

  .login label {
    font-size: 16px;
  }

  .login button {
    width: 100%;
    max-width: 280px;
    height: 40px;
    font-size: 16px;
  }
}

</style>



<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { jwtDecode } from 'jwt-decode';

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
  const response = await fetch("https://odontostar-backend.onrender.com/api/login-user", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email.value, senha: password.value })
  })
    const data = await response.json()

  if (!response.ok) {
    spanAcesso.value = false
    console.error(data.message)
    return
  }

  
  localStorage.setItem('token', data.token)
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token);
  
  if (decoded.role !== 'admin') {
    router.push('/agendamento')
  } if (decoded.role === 'admin') {
    router.push('/gerenciamento')
  } if (decoded.role === 'Dentista') {
    router.push('/lancar-datas')
  }
  
}
</script>