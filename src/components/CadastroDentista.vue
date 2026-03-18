<template>
    <h1 id="titulo">Cadastro De Dentista</h1>

    <div class="containerCadastro">
        <form @submit.prevent="enviar()">
            <input v-model="nomeCompleto" placeholder="NOME COMPLETO">

            <select v-model="especialidade" name="procedimentos" id="procedimentosDisponiveis">
                <option value="Tratamento de Canal">Tratamento de Canal</option>
                <option value="Extração de Dente">Extração de Dente</option>
                <option value="Limpeza Dental">Limpeza Dental</option>
                <option value="Implante Dentário">Implante Dentário</option>
            </select>

            <input v-model="consultorio" type="number" placeholder="CONSULTORIO">
            <input v-model="cpf" type="number" placeholder="CPF">
            
            <button type="submit" id="submit">Confirmar</button>

            <span id="mensagemResultado">{{ mensagemResultado }}</span>


        </form>

    </div>

</template>

<style>

#mensagemResultado {
    color: whitesmoke;
    font-weight: bold;
    margin-right: 12px;
    margin-top: 2%;
}

#submit {
    margin-left: 46%;
    margin-top: 2%;
}

.containerCadastro form {
    display: flex;
    flex-direction: column;

}

.containerCadastro input {
    width: 200px;
    height: 60px;
    border-radius: 5px;
    margin-left: 41%;
    margin-top: 5%;
    border: 2px solid whitesmoke;
}

.containerCadastro select {
    width: 200px;
    height: 60px;
    border-radius: 5px;
    margin-left: 41%;
    margin-top: 5%;
    border: 2px solid whitesmoke;
}

.containerCadastro {
    width: 1200px;
    height: 700px;
    margin: 0 auto;
    margin-top: 2%;
    background: linear-gradient(150deg, rgb(1, 2, 94), rgb(81, 0, 231));
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
}


</style>

<script setup >
import { ref } from 'vue';


const mensagemResultado = ref('')
const nomeCompleto = ref('')
const especialidade = ref('')
const consultorio = ref('')
const cpf = ref('')
const token = localStorage.getItem('token')

async function enviar() {
    if (nomeCompleto.value === '' || especialidade.value === '' || consultorio.value === '' || cpf.value === '') {
        mensagemResultado.value = 'Todos os campos devem estar preenchidos'
        return
    }
    

    const response = await fetch("https://odontostar-backend.onrender.com/api/registrar-dentista", {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
            nomeCompleto: nomeCompleto.value,
            especialidade: especialidade.value,
            consultorio: consultorio.value,
            cpf: cpf.value
        })
    })
    const data = await response.json()


    if (!response.ok) {
        console.log(data.message)
    } else {
        mensagemResultado.value = ("Dentista Registrado")
    }

}

</script>