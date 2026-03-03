<template>
    <h1>Agende sua Consulta Odontológica</h1>
    

    <div class="DetalhesPaciente">
        <h2>Detalhes do Paciente</h2>
        <p>Nome: {{ nome }}</p>
        <p>Idade: {{ anos }}</p>
        <p>CPF: {{ cpf }}</p>
        <p>Telefone: {{ telefone }}</p>
        <p>Email: {{ email }}</p>
        <p>Bairro: {{bairro}}</p>
        <p>Cidade: {{ cidade }}</p>

        <input v-model="cpfInserir" type="text" placeholder="Digite seu CPF para Carregar seus Dados" id="inputCPF">
    </div>


    <div class="weather">
        <h2>Previsão do Tempo para o Dia da Consulta</h2>
        <p>São Paulo, 27/08/2026</p>
        <p>Temperatura: 25°C</p>
        <p>Condição: Ensolarado</p>
    </div>



    <div class="formDetalhes">
        <label id="procedimento">Selecione um Procedimento:</label>
        <select v-model="especialidade" name="procedimentos" id="procedimentosDisponiveis">
            <option value="Tratamento de Canal">Tratamento de Canal</option>
            <option value="Extração de Dente">Extração de Dente</option>
            <option value="Limpeza Dental">Limpeza Dental</option>
            <option value="Implante Dentário">Implante Dentário</option>
        </select>
    
        <span id="spanSemDataHora" v-if="semDataHora === true" style="color: red;">Não há Datas para esse tipo de procedimento</span>

        <label v-if="semDataHora === false" id="labeldata">Escolha uma Data:</label>
        <select v-if="semDataHora === false" v-model="dataEscolhida" name="datas" id="datasDisponiveis">
            <option v-for="item in datas" :key="item._id" :value="item.data">{{ format(new Date(item.data), "dd/MM/yyyy") }}</option>   
        </select>
        
        <label v-if="semDataHora === false" >Selecione um horário:</label>
        <select v-if="semDataHora === false" name="horarios" id="horariosDisponiveis">
            <option v-for="h in hora" :key="h" :value="h">{{ h }}</option>
        </select>



        
        <button v-if="semDataHora === false" type="submit" id="buttonAgendar">Agendar Consulta</button>
    </div>





</template>

<style>

.weather {
    width: 400px;
    height: 200px;
    margin-left: 40%;
    margin-top: -19%;
    padding: 20px;
    border-radius: 5px;
    color: white;
}

.DetalhesPaciente {
    background: linear-gradient(90deg, rgb(0, 6, 85), rgb(60, 80, 200));
    width: 400px;
    height: 300px;
    margin-left: 15%;
    margin-top: 8%;
    padding: 20px;
    border-radius: 5px;
    color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}

.DetalhesPaciente #inputCPF {
    margin-top: 40px;
    padding: 10px;
    font-size: medium;
    border-radius: 10px;
    width: 300px;
    border: 0px solid #000000;
}

.formDetalhes {
    display: flex;
    flex-direction: column;
    margin-left: 65%;
    margin-top: -10%;
    gap: 20px;

}

.formDetalhes #spanSemDataHora {
    margin-left: 8%;
    width: 200px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-weight: bold;
}


.formDetalhes label {
    font-size: 14px;
    font-weight: bold;
    width: 200px;
    margin-left: 120px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    color: white;
}

.formDetalhes #procedimento {
    margin-left: 100px;
}

.formDetalhes #labeldata {
    margin-left: 132px;
}

.formDetalhes select {
    padding: 20px;
    font-size: medium;
    border-radius: 10px;
    width: 300px;
    border: 0px solid #000000;
    display: flex;
    flex-direction: column;
}

.formDetalhes button {
    margin-left: 22%;
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





</style>

<script setup>
import { ref, watch } from 'vue'
import { format } from 'date-fns'

const semDataHora = ref(true)
const especialidade = ref('');
const datas = ref('');
const hora = ref(['']);
const dataEscolhida = ref('');
const cpfInserir = ref('');
const nome = ref('');
const anos = ref('');
const cpf = ref('');
const telefone = ref('');
const email = ref('');
const bairro = ref('');
const cidade = ref('');



watch(cpfInserir, async (cpfDigitado) => {
    if (cpfInserir.value.length === 11 && !isNaN(cpfInserir.value)) {
        const response = await fetch(`http://localhost:3080/api/findBy?cpf=${cpfDigitado}`)

        const data = await response.json();
        nome.value = data.nomeCompleto
        anos.value = data.idade
        cpf.value = data.cpf
        telefone.value = data.telefone
        email.value = data.email
        bairro.value = data.bairro
        cidade.value = data.cidade
    }


}) 

watch(especialidade, async (especialidadeDesejada) => {
  const response = await fetch(`http://localhost:3080/api/mostrar-datas?especialidade=${especialidadeDesejada}`)

  hora.value = [];

  if (!response.ok) {
    semDataHora.value = true
    return;
  }

  const data = await response.json()
  semDataHora.value = false
  datas.value = data.request
})

watch(dataEscolhida, (novaData) => {
  hora.value = []

  for (const item of datas.value) {
    if (novaData === item.data) { 
      hora.value.push(item.horario)
    }
  }
})

</script>