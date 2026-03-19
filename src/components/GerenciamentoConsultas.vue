<template>
<h1 id="titulo">Controle de Consultas</h1>

<div class="botoes">

  <button @click="$router.push('/')" id="menu" >Menu</button>


</div>

    <div class="ConsultasMarcadas">
      <span v-if="existeConsultas" style="color: whitesmoke; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); font-weight: bold; ">Não há consultas</span>
    <table>
    <thead>
      <tr>
        <th>Paciente</th>
        <th>CPF</th>
        <th>Procedimento</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Dentista</th>
      </tr>
    </thead>
   <tbody>
  <tr v-for="consulta in consultasPaginadas" :key="consulta._id">
    <td>{{ consulta.nomePaciente }}</td>
    <td>{{ consulta.cpf }}</td>
    <td>{{ consulta.procedimento }}</td>
    <td v-if="consulta.data">{{ format(parseISO(consulta.data), 'dd/MM/yyyy') }}</td>
    <td v-else>-</td>
    <td>{{ consulta.hora }}</td>
    <td>{{ consulta.nomeDentista }}</td>
  </tr>
</tbody>
  </table>

  <div class="paginacao">
    <button @click="paginaAtual--" :disabled="paginaAtual === 1">←</button>
    <span style="color: white;">{{ paginaAtual }} / {{ totalPaginas }}</span>
    <button @click="paginaAtual++" :disabled="paginaAtual === totalPaginas">→</button>
  </div>

</div>

<div class="funcoes">

  <div id="consultaRealizada">
    <h2>Funções</h2>
    <form>
    <select v-model="operacaoEscolhida">
      <option value="Marcar como Realizada">Marcar como Realizada</option>
    </select>
      <input v-model="cpfPaciente" placeholder="CPF">
      <input v-model="diaConsulta" placeholder="DATA">
      <input v-model="hora" placeholder="HORA">

      <button type="button" @click="verificar()">Confirmar</button>
      <span style="color: red; font-size: 20px; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); font-weight: bold;">{{ mensagemAoEnviar }}</span>
    </form>
      
  </div>


</div>
</template>


<style>

#titulo {
  color: white;
  background: linear-gradient(90deg, rgb(0, 6, 85), rgb(60, 80, 200));
  width: 90%;
  max-width: 800px;
  height: 60px;
  padding-top: 13px;
  border-radius: 5px;
  letter-spacing: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  text-align: center;
}

.paginacao {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  margin-left: 5%;
}

.paginacao button {
  background-color: rgb(0, 6, 85);
  color: white;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 16px;
}

.paginacao button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.funcoes {
  position: absolute;
  top: 150px;
  left: 55%;
}

.funcoes #consultaRealizada {
  display: flex;
  flex-direction: column;
  background: darkblue;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  gap: 10px;
  min-height: 100vh;
  width: 600px;
  height: 1010px;
  padding: 20px;
  border-radius: 10px;
  margin-left: 40%;
  margin-top: -25%;
}

.funcoes #consultaRealizada select {
  width: 180px;
  height: 50px;
  font-size: 15px;
  border-radius: 5px;
  border: thin;
  margin-left: 3px;
}

.funcoes #consultaRealizada form {
  display: flex;
  flex-direction: column;
  position: absolute;
  gap: 10px;
  margin-top: 40%;
}

.funcoes #consultaRealizada button {
  width: 130px;
  border-radius: 5px;
  border: thin;
  font-weight: bold;
  height: 30px;
  background-color: rgb(0, 6, 85);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  color: whitesmoke;
  margin-left: 3%;
}

.funcoes #consultaRealizada h2 {
  color: whitesmoke;
  font-size: 50px;
  margin-top: 20%;
}

.funcoes #consultaRealizada input {
  width: 350px;
  height: 50px;
  font-size: 17px;  
  border-radius: 7px;
}

.ConsultasMarcadas {
  width: 60%;
  border-radius: 10px;
  margin-left: 5%;
  margin-top: 4%;
}

.ConsultasMarcadas table {
  border-collapse: collapse;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  font-size: 18px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

th {
  background-color: rgb(0, 6, 85);
}

tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
    font-size: 13px;
  }

  th, td {
    padding: 8px;
  }

  .funcoes {
    position: static;
    width: 90%;
    margin-left: 5%;
    margin-top: 30px;
  }

  .funcoes #consultaRealizada {
    width: 100%;
    height: auto;
    min-height: auto;
    margin-left: 0;
    margin-top: 0;
  }

  .funcoes #consultaRealizada h2 {
    font-size: 30px;
    margin-top: 10px;
  }

  .funcoes #consultaRealizada form {
    position: static;
    margin-top: 20px;
  }

  .funcoes #consultaRealizada input {
    width: 100%;
    height: 40px;
    font-size: 14px;
  }

  .funcoes #consultaRealizada select {
    width: 100%;
    height: 40px;
    font-size: 14px;
  }

  .funcoes #consultaRealizada button {
    width: 100%;
    height: 40px;
    margin-left: 0;
  }
}


@media (max-width: 480px) {
  #titulo {
    font-size: 15px;
    letter-spacing: 2px;
    padding: 12px 10px;
  }

  .ConsultasMarcadas table {
    font-size: 5px;
    
  }

  th, td {
    padding: 2px;
    font-size: 11px;
    width: 20px;
  }

  .funcoes #consultaRealizada h2 {
    font-size: 20px;
  }

  .funcoes #consultaRealizada input {
    font-size: 16px;
    height: 40px;
  }

  .funcoes #consultaRealizada select {
    font-size: 16px;
    height: 40px;
  }

  .funcoes #consultaRealizada button {
    height: 45px;
    font-size: 15px;
  }

  .paginacao button {
    width: 25px;
    height: 25px;
    font-size: 14px;
  }
}
</style>


<script setup> 
import { ref, onMounted, computed } from 'vue';
import { format, parseISO} from 'date-fns';

const consultasPendentes = ref([]);
const diaConsulta = ref('')
const cpfPaciente = ref('')
const hora = ref('')
const operacaoEscolhida = ref('')
const mensagemAoEnviar = ref('')
const existeConsultas = ref(false)
const paginaAtual = ref(1);
const itensPorPagina = 5;
const token = localStorage.getItem('token')

const consultasPaginadas = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  return consultasPendentes.value.slice(inicio, fim);
});

const totalPaginas = computed(() => {
  return Math.ceil(consultasPendentes.value.length / itensPorPagina);
});

async function consultas() {
  const response = await fetch('https://odontostar-backend.onrender.com/api/buscar-consultaspendentes', {
    headers: {'Authorization': `Bearer ${token}`}
  })
  const data = await response.json();
  if (data.error === "Não há consultas") {
    existeConsultas.value = true;
    return
  }
  consultasPendentes.value = data
}

async function enviar() {
  if (operacaoEscolhida.value === "Marcar como Realizada") {
    const response = await fetch('https://odontostar-backend.onrender.com/api/marcar-realizada', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        cpfPaciente: cpfPaciente.value,
        diaConsulta: diaConsulta.value,
        hora: hora.value
      })  
    })
    const data = await response.json();
    if (!response.ok) {
      mensagemAoEnviar.value = data.message
      return
    }
    window.location.reload();
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