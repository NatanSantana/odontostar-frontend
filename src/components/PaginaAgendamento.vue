<template>
    <h1 id="titulo">Agende sua Consulta Odontológica</h1>
    

    <div class="DetalhesPaciente">
        <h2>Detalhes do Paciente</h2>
        <p>Nome: {{ nome }}</p>
        <p>Idade: {{ anos }}</p>
        <p>CPF: {{ cpf }}</p>
        <p>Telefone: {{ telefone }}</p>
        <p>Email: {{ email }}</p>
        <p>Bairro: {{bairro}}</p>
        <p>Cidade: {{ cidade }}</p>
    </div>

    <div class="inputPaciente">
        <label style="color: white; font-weight: bold;">*Apenas Números*</label>
        <input v-model="cpfInserir" type="text" placeholder="Digite seu CPF para Carregar seus Dados" id="inputCPF"> 
        <br><br>
        <span v-if="userNull === true" style="color: red; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); font-weight: bold;">Não foi possível encontrar o usuário, verifique o CPF</span>
    </div>
        

    <div class="weather">
        <h2>Previsão do Tempo para o Dia da Consulta</h2>
        <p>Salvador, {{ dataConsulta }}</p>
        <p>Temperatura: {{ temperatura }}</p>
        <p>Condição: {{ descricaoTempo }}</p>
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
        <select v-if="semDataHora === false" v-model="horaEscolhida" name="horarios" id="horariosDisponiveis">
            <option v-for="h in hora" :key="h" :value="h">{{ h }}</option>
        </select>


        <span id="enviarNull" v-if="enviarNegado === true" style="color: red;">Todos os campos devem ser preenchidos para agendar uma consulta</span>
        
        <button v-if="semDataHora === false" type="submit" id="buttonAgendar" @click="enviar()">Agendar Consulta</button>
        <span v-if="consultaAgendada === true && enviarNegado === false" style="color: white; margin-right: 10%; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2); font-size: 18px; font-weight: bold;">{{ resultadoMarcarConsulta }}</span>
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

.weather {
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 200px;
    margin-left: 40%;
    margin-top: -20%;
    color: white;
    position: absolute;
    gap: 10px;
}

.DetalhesPaciente {
    display: flex;
    flex-direction: column;
    background: linear-gradient(90deg, rgb(0, 6, 85), rgb(60, 80, 200));
    width: 400px;
    height: 300px;
    margin-left: 15%;
    margin-top: 8%;
    padding: 20px;
    border-radius: 5px;
    color: white;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
    gap: 15px;
}

.inputPaciente {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-left: 19%;
    margin-top: 20px;
    gap: 5px;
}

.inputPaciente label {
    margin-right: 50px;
    font-size: 15px;
}

.inputPaciente span {
    margin-top: 4%;
    margin-left: 28px;
    width: 250px;
    position: absolute;
}

.inputPaciente #inputCPF {
    font-size: medium;
    border-radius: 10px;
    width: 300px;
    height: 40px;
    border: 0px solid #000000;
}

.formDetalhes {
    display: flex;
    flex-direction: column;
    margin-top: -24%;
    margin-left: 65%;
    gap: 23px;
    width: 340px;
    position: absolute;
}

#enviarNull {
    font-size: 18px;
    margin-top: 120%;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    font-weight: bold;
    width: 300px;
    position: absolute;
}

.formDetalhes #spanSemDataHora {
    margin-left: 14%;
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
    margin-left: 43%;
    width: 150px;
    height: 30px;
    border-radius: 5px;
    color: white;
    background-color: rgb(0, 6, 85);
    font-weight: bold;
    font-size: 15px;
    border: 1px solid black;
}


@media (max-width: 768px) {
    .DetalhesPaciente {
        width: 80%;
        margin-left: 5%;
        margin-top: 20px;
        height: auto;
        padding: 15px;
        font-size: 13px;
    }

    .DetalhesPaciente h2 {
        font-size: 16px;
    }

    .DetalhesPaciente p {
        font-size: 13px;
        margin: 4px 0;
    }

    .inputPaciente {
        width: 80%;
        margin-left: 5%;
        margin-top: 15px;
    }

    .inputPaciente label {
        font-size: 13px;
    }

    .inputPaciente #inputCPF {
        width: 100%;
        height: 35px;
        font-size: 13px;
    }

    .inputPaciente span {
        position: static;
        margin-left: 0;
        margin-top: 5px;
        font-size: 12px;
        width: 100%;
    }

    .weather {
        position: static;
        width: 80%;
        margin-left: 5%;
        margin-top: 15px;
        height: auto;
    }

    .weather h2 {
        font-size: 16px;
    }

    .weather p {
        font-size: 13px;
        margin: 4px 0;
    }

    .formDetalhes {
        position: static;
        width: 80%;
        margin-left: 5%;
        margin-top: 20px;
        gap: 15px;
    }

    .formDetalhes label,
    .formDetalhes #procedimento,
    .formDetalhes #labeldata {
        margin-left: 0;
        width: 100%;
        font-size: 13px;
    }

    .formDetalhes select {
        width: 100%;
        padding: 10px;
        font-size: 13px;
    }

    .formDetalhes button {
        margin-left: 0;
        width: 100%;
        height: 35px;
        font-size: 13px;
    }

    #enviarNull {
        position: static;
        margin-top: 10px;
        width: 100%;
        font-size: 13px;
    }

    .formDetalhes #spanSemDataHora {
        margin-left: 0;
        font-size: 13px;
        width: 100%;
    }
}


@media (max-width: 480px) {

    .DetalhesPaciente {
        width: 80%;
        margin-left: 4%;
        padding: 12px;
        font-size: 12px;
    }

    .DetalhesPaciente h2 {
        font-size: 14px;
    }

    .DetalhesPaciente p {
        font-size: 12px;
        margin: 3px 0;
    }

    .inputPaciente {
        width: 90%;
        margin-top: 8%;
        margin-left: 2.5%;
    }

    .inputPaciente label {
        font-size: 12px;
        margin-right: 40%;
    }

    .inputPaciente #inputCPF {
        font-size: 16px; 
        height: 35px;
    }

    .inputPaciente span {
        font-size: 11px;
    }

    .weather {
        width: 90%;
        margin-top: -5%;
        margin-left: 2.5%;
    }

    .weather h2 {
        font-size: 14px;
    }

    .weather p {
        font-size: 12px;
        margin: 3px 0;
    }

    .formDetalhes {
        width: 90%;
        margin-left: 2.5%;
        margin-top: 10%;
        gap: 12px;
    }

    .formDetalhes label,
    .formDetalhes #procedimento,
    .formDetalhes #labeldata {
        font-size: 12px;
    }

    .formDetalhes select {
        font-size: 16px; 
        padding: 8px;
    }

    .formDetalhes button {
        font-size: 14px;
        height: 40px;
    }

    #enviarNull {
        font-size: 12px;
    }

    .formDetalhes #spanSemDataHora {
        font-size: 12px;
    }
}

</style>

<script setup>
import { ref, watch } from 'vue'
import { format } from 'date-fns'
import { useRouter } from 'vue-router';

const router = useRouter();
const userNull = ref(false);
const consultaAgendada = ref(false);    
const enviarNegado = ref(false);
const semDataHora = ref(false);
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
const horaEscolhida = ref('');
const temperatura = ref('Sem Previsão');
const descricaoTempo = ref('Sem Previsão');
const dataConsulta = ref('Sem Previsão');
const resultadoMarcarConsulta = ref('');



async function enviar() {

    if (nome.value === '' || cpf.value === '' || email.value === '' || 
    especialidade.value === '' || dataEscolhida.value === '' || horaEscolhida.value === '') {
        enviarNegado.value = true;
        return
    }

    const response = await fetch('https://odontostar-backend.onrender.com/api/registrar-consulta', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            nomePaciente: nome.value,
            cpf: cpf.value,
            email: email.value,
            procedimento: especialidade.value,
            data: dataEscolhida.value,
            hora: horaEscolhida.value,
            realizada: false
        }) 
    })
    
    if (response.ok) {
        const data = await response.json();
        console.log("Registrado com sucesso")
        resultadoMarcarConsulta.value = data.message;
        console.log(data.message)
        consultaAgendada.value = true;
        enviarNegado.value = false;
        router.push('/perfil')
        return;
    }

}


watch(dataEscolhida, async (tempoDaData) => {
    if (dataEscolhida.value !== '') {
        const dataFormatada = format(new Date(tempoDaData), 'yyyy-MM-dd');
    const response = await fetch(`https://odontostar-backend.onrender.com/api/previsao-clima?dataDesejada=${dataFormatada}`)

    if (response.ok) {
        const data = await response.json();
        console.log(data)
        temperatura.value = data.temp + "°C";
        descricaoTempo.value = data.desc
        dataConsulta.value = format(new Date(dataEscolhida.value), "dd/MM/yyyy")
    } else {
        dataConsulta.value = 'Sem Previsão'
        temperatura.value = 'Sem Previsão'
        descricaoTempo.value = 'Sem Previsão'
    }

    }
    
})

watch(cpfInserir, async (cpfDigitado) => {
    if (cpfInserir.value.length === 11 && !isNaN(cpfInserir.value)) {
        const response = await fetch(`https://odontostar-backend.onrender.com/api/findBy?cpf=${cpfDigitado}`)
        
        if (response.ok) {
            const data = await response.json();
            nome.value = data.nomeCompleto
            anos.value = data.idade
            cpf.value = data.cpf
            telefone.value = data.telefone
            email.value = data.email
            bairro.value = data.bairro
            cidade.value = data.cidade
            userNull.value = false
            return;
        } else {
            nome.value = ''
            anos.value = ''
            cpf.value = ''
            telefone.value = ''
            email.value = ''
            bairro.value = ''
            cidade.value = ''
            userNull.value = true
            return;
        }
        
    }


}) 

watch(especialidade, async (especialidadeDesejada) => {
  const response = await fetch(`https://odontostar-backend.onrender.com/api/mostrar-datas?especialidade=${especialidadeDesejada}`)
    const data = await response.json()
    console.log(data)
  hora.value = [];

  if (!response.ok) {
    semDataHora.value = true
    console.log(data.error)
    consultaAgendada.value = false;
    return;
  }

  dataEscolhida.value = ''
  semDataHora.value = false
  datas.value = data.request

})

watch(dataEscolhida, (novaData) => {
    
    if (dataEscolhida.value !== '') {
        hora.value = []
        for (const item of datas.value) {
    if (novaData === item.data) { 
      hora.value.push(item.horario)
    }
  }
    } 
})

</script>