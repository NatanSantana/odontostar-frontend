<template>
    <h1 id="titulo">Cadastro De Dentista</h1>

    <div class="botoes">

  <button @click="$router.push('/')" id="menu" >Menu</button>


</div>

    <div class="containerCadastro">
        <form @submit.prevent="enviar()">
            <input v-model="nomeCompleto" placeholder="NOME COMPLETO">

            <select v-model="especialidade" name="procedimentos" id="procedimentosDisponiveis">
                <option value="Tratamento de Canal">Tratamento de Canal</option>
                <option value="Extração de Dente">Extração de Dente</option>
                <option value="Limpeza Dental">Limpeza Dental</option>
                <option value="Implante Dentário">Implante Dentário</option>
            </select>

            <input v-model="consultorio" type="text" placeholder="CONSULTORIO">
            <input v-model="cpf" type="text" placeholder="CPF">
            
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

@media (max-width: 1280px) {
    .containerCadastro {
        width: 90%;
        height: auto;
        padding: 30px 0;
    }

    .containerCadastro input,
    .containerCadastro select {
        width: 60%;
        margin-left: 20%;
    }

    #submit {
        margin-left: 40%;
    }
}

@media (max-width: 768px) {
    .containerCadastro {
        width: 90%;
        height: auto;
        padding: 20px 0;
    }

    .containerCadastro input,
    .containerCadastro select {
        width: 70%;
        margin-left: 15%;
        height: 45px;
    }

    #submit {
        margin-left: 35%;
        width: 100px;
    }

    #mensagemResultado {
        font-size: 14px;
        margin-left: 15%;
    }
}

@media (max-width: 480px) {
    .containerCadastro {
        margin-top: 15%;
        width: 95%;
        padding: 15px 0;
    }

    .containerCadastro input,
    .containerCadastro select {
        width: 80%;
        margin-left: 10%;
        height: 40px;
        font-size: 16px;
    }

    #submit {
        margin-left: 30%;
        width: 120px;
        height: 40px;
        margin-top: 5%;
    }

    #mensagemResultado {
        font-size: 13px;
        margin-left: 10%;
    }
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

    if (cpf.value.length !== 11) {
        mensagemResultado.value = 'O cpf deve ter 11 dígitos'
        return
    }

    if (Number(consultorio) <= 0) {
        mensagemResultado.value = 'O número do consultório deve ser positivo'
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