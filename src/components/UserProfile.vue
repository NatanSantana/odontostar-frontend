<template>
<h1 id="titulo">Veja As Consultas Marcadas</h1>

<div class="botoes">

  <button @click="$router.push('/')" id="menu" >Menu</button>


</div>

<div class="ConsultasMarcadas">
      <span v-if="existeConsultas" style="color: whitesmoke; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); font-weight: bold; ">Não há consultas</span>
    <table>
    <thead>
      <tr>
        <th>Procedimento</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Dentista</th>
      </tr>
    </thead>
   <tbody>
  <tr v-for="consulta in consultasPendentes" :key="consulta._id">
    <td>{{ consulta.procedimento }}</td>
    <td v-if="consulta.data">{{ format(parseISO(consulta.data), 'dd/MM/yyyy') }}</td>
    <td v-else>-</td>
    <td>{{ consulta.hora }}</td>
    <td>{{ consulta.nomeDentista }}</td>
  </tr>
</tbody>
  </table>
</div>

<div class="funcoes">

  <div id="consultaRealizada">
    <h2>Funções</h2>
    <form>
    <select v-model="operacaoEscolhida">
      <option value="Cancelar Consulta">Cancelar Consulta</option>
    </select>
      <input v-model="cpfPaciente" placeholder="CPF">
      <input v-model="diaConsulta" placeholder="DATA">
      <input v-model="hora" placeholder="HORA">

      <button type="button" @click="verificar()" id="btn">Confirmar</button>
      <span style="color: red; font-size: 20px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); font-weight: bold;">{{ mensagemAoEnviar }}</span>
    </form>
      
  </div>

  </div>

</template>

<style>

.botoes {
  margin-left: 94%;
  margin-top: -90px;
  z-index: 2;
  position: absolute;
}

.botoes #menu {
  height: 40px;
  width: 80px;
  background-color: transparent;
  color: whitesmoke;
  border-radius: 5px;
  border: 2px solid white;
  font-weight: bold;
  font-size: 15px;
  transition: 0.3s;
}

.botoes #menu:hover {
  background: white;
  color: rgb(0, 6, 85);
  
}




@media (max-width: 768px) {
  #titulo {
    font-size: 16px;
    letter-spacing: 3px;
    height: auto;
    padding: 15px 10px;
  }

  .ConsultasMarcadas {
    width: 90%;
    margin-left: 5%;
  }

  .ConsultasMarcadas table {
    width: 100%;
    font-size: 12px;
  }

  th, td {
    padding: 6px;
  }

  .funcoes {
    position: static;
    width: 90%;
    margin-left: 5%;
    margin-top: 30px;
  }

  .funcoes #consultaRealizada {
    width: 100%;
  }

  .funcoes #consultaRealizada h2 {
    font-size: 24px;
  }

  .funcoes #consultaRealizada input,
  .funcoes #consultaRealizada select {
    font-size: 14px;
  }

  .funcoes #consultaRealizada button {
    width: 100%;
    height: 40px;
  }
}

@media (max-width: 480px) {

  .botoes {
    margin-top: -120px;
    margin-left: 85%;
  }

  .botoes #menu {
    width: 45px;
    padding: 5px;
    height: 27px;
    font-size: 11px;
  }
  
  #titulo {
    font-size: 17px;
    letter-spacing: 2px;
    padding: 12px 10px;
  }

  .ConsultasMarcadas table {
    font-size: 11px;
  }

  th, td {
    padding: 5px;
  }

  .funcoes #consultaRealizada h2 {
    font-size: 20px;
  }

  .funcoes #consultaRealizada input,
  .funcoes #consultaRealizada select {
    font-size: 16px; 
    height: 40px;
  }

  .funcoes #consultaRealizada button {
    height: 45px;
    font-size: 15px;
  }
}

</style>

<script setup>
import { ref, onMounted } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { format, parseISO} from 'date-fns';




const operacaoEscolhida = ref('');
const mensagemAoEnviar = ref('')
const cpfPaciente = ref('')
const diaConsulta = ref('')
const hora = ref('')
const existeConsultas = ref(false)
const consultasPendentes = ref([]);
const token = localStorage.getItem('token')


async function consultas() {
  const decoded = jwtDecode(token)
  const response = await fetch(`https://odontostar-backend.onrender.com/api/buscar-consultasbycpf?cpf=${decoded.cpf}`)
  const data = await response.json();
  
  if (data.message === "Não há consultas") {
    existeConsultas.value = true;
    return
  }
  console.log(data)
  consultasPendentes.value = data
}

async function enviar() {
  const response = await fetch(`https://odontostar-backend.onrender.com/api/desmarcar-consulta?cpf=${cpfPaciente.value}&data=${diaConsulta.value}&hora=${hora.value}`,
    { method: 'DELETE' }
  );

  if (response.ok) {
    mensagemAoEnviar.value = "Consulta Cancelada com Sucesso"
  }
}

function verificar() {
  if (cpfPaciente.value === '' || diaConsulta.value === '' || hora.value === '' || operacaoEscolhida.value === '') {
    mensagemAoEnviar.value = "Preencha Todos os Campos"
  } else {
    enviar()
  }
}

onMounted(() => {
  consultas();
});
</script>