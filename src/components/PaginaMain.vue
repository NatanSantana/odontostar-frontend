<template>
    <h1>Página Principal</h1>

    <button @click="$router.push('/cadastro')">Ir para Cadastro</button>
    <button @click="$router.push('/login')">Ir para Login</button>


</template>

<script>
export default {
  name: 'PaginaMain'
}
</script>

<style>
h1 {
  color: white;
  background: linear-gradient(90deg, rgb(0, 6, 85), rgb(60, 80, 200));
  width: 800px;
  height: 50px;
  padding-top: 10px;
  border-radius: 5px;
  letter-spacing: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}
</style>