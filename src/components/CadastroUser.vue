<template>
    <h1 id="TituloCadastro">CADASTRO</h1>

    <div class="form">
      <form class="inputs" @submit.prevent="verificar">
        <label for="NOME COMPLETO"></label>
        <input v-model="nomeCompleto" type="text" id="NOME COMPLETO" name="nome-completo" placeholder="nome completo">
        
      
        <label for="CPF"></label>
        <input v-model="cpf" type="text" id="CPF" name="cpf" placeholder="cpf">
        <span style="color: red; font-size: 12px; margin-right: 55px;" v-if="cpf && isNaN(cpf)">O CPF deve conter apenas números.</span>

        <label for="DATA DE NASCIMENTO"></label>
        <input v-model="dataNascimento" type="text" id="DATA DE NASCIMENTO" name="data-de-nascimento" placeholder="data de nascimento">

        <label for="TELEFONE"></label>
        <input v-model="telefone" type="text" id="TELEFONE" name="telefone" placeholder="telefone">
        <span style="color: red; font-size: 12px; margin-right: 55px;" v-if="telefone && isNaN(telefone)">O telefone deve conter apenas números.</span>

        <label for="EMAIL"></label>
        <input v-model="email" type="text" id="EMAIL" name="email" placeholder="email">
        <span style="color: red; font-size: 12px; margin-right: 55px;" v-if="emailCorreto === false">O email deve ser válido.</span>


        <label for="SENHA"></label>
        <input v-model="senha" type="text" id="SENHA" name="senha" placeholder="senha">
        
        <label for="CEP (apenas números)"></label>
        <input v-model="cep" type="text" id="CEP" name="cep" placeholder="cep">
        <span style="color: red; font-size: 12px; margin-right: 55px;" v-if="cep && isNaN(cep)">O CEP deve conter apenas números.</span>

        <label for="NUMERO"></label>
        <input v-model="numero" type="text" id="NUMERO" name="numero" placeholder="numero">

        <label for="BAIRRO"></label>
        <input v-model="bairro" type="text" id="BAIRRO" name="bairro" placeholder="bairro">

        <label for="LOGRADOURO"></label>
        <input v-model="logradouro" type="text" id="LOGRADOURO" name="logradouro" placeholder="logradouro">
        
        <button type="submit">Enviar</button>

        <transition name="camposNulls">
          <div id="camposNull" v-if="verificacao === true">
          <p>{{ camposMessage }}</p>
        </div>
        </transition>

      <transition name="fade">
      <div class="confirmacao" v-if="criado === true">
        <h2>Confirmação de Cadastro</h2>
        <p>Seu cadastro foi realizado com sucesso!</p>
      </div>
    </transition>

      </form>
    </div>

</template>

<style>
body {
  background: linear-gradient(135deg, rgb(10, 6, 40), rgb(60, 80, 200));
  min-height: 100vh;
  margin: 0;
}

#camposNull {
  width: 250px;
  margin-left: 41px;
  font-size: 22px;
  color: rgba(255, 0, 0, 0.842);
  font-weight: bold;

  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
 
}

.camposNulls-enter-active,
  .camposNulls-leave-active {
  transition: opacity 0.5s ease-in;
}

.camposNulls-enter-from,
.camposNulls-leave-to {
  opacity: 0;
}

.confirmacao {
  margin-left: 399px;
  margin-top: -450px;
  width: 400px;
  font-size: 22px;
  color: white;
  background-color: rgb(0, 6, 85);
  background: rgb(0, 6, 85);
  border-radius: 10px;

}

.confirmacao p {
  width: 250px;
  margin-left: 75px;
  margin-top: -25px;
}

.fade-enter-active,
  .fade-leave-active {
  transition: opacity 0.5s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#TituloCadastro {
  color: white;
  background: linear-gradient(90deg, rgb(0, 6, 85), rgb(60, 80, 200));
  width: 800px;
  height: 50px;
  padding-top: 10px;
  border-radius: 5px;
  letter-spacing: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  
}

.form {
  display: flex;
  flex-direction: column;
  margin-right: 1600px;
}

.form button {
  margin-top: 20px;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  margin-left: 90px;
  color: white;
  background-color: rgb(0, 6, 85);
  font-weight: bold;
  font-size: 15px;
  border: 1px solid #ccc;
  border-color: black;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.inputs input {
  padding: 8px;
  font-size: medium;
  border-radius: 10px;
  width: 300px;
  margin-top: 10px;
  margin-left: 20px;
  border: 0px solid #000000;

}


</style>

<script>

import { useRouter } from 'vue-router'

const router = useRouter()


export default {
  name: 'CadastroUser',
  data () {
    return {
      criado: false,
      verificacao: false,
      emailCorreto: true,
      camposMessage: '',
      nomeCompleto: '',
      cpf: '',
      dataNascimento: '',
      telefone: '',
      email: '',
      senha: '',
      numero: '',
      cep: '',
      bairro: '',
      cidade: '',
      logradouro: ''

    }
  },

  watch: {
  async cep(cep) {
  if (cep.length === 8 && !isNaN(cep)) {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`);
    
    if (!response.ok) {
      this.camposMessage = 'CEP não encontrado!';
      this.verificacao = true;
      return;
    }

    const endereco = await response.json();
    this.bairro = endereco.neighborhood;
    this.cidade = endereco.city;
    this.logradouro = endereco.street;
    }
  }
},

  methods: {
    async enviar() {
      try {
      const response = await fetch('http://localhost:3080/api/register-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              nomeCompleto: this.nomeCompleto,
              cpf: this.cpf,
              dataNascimento: this.dataNascimento,
              telefone: this.telefone,
              email: this.email,
              senha: this.senha,
              numeroCasa: this.numero,
              cep: this.cep,
              cidade: this.cidade,
              bairro: this.bairro,
              logradouro: this.logradouro
      })

      });
      const data = await response.json();

      if (!response.ok) {
        this.camposMessage = data.message
        this.verificacao = true;
        this.criado = false;
        return;
      }

      this.criado = true;
      router.push('/')

    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
    },

    verificar(){ 
    if (this.nomeCompleto.trim() === '' || this.cpf.trim() === '' || this.dataNascimento.trim() === '' || 
    this.telefone.trim() === '' || this.email.trim() === '' || this.senha.trim() === '' || this.cep.trim() === '' || this.numero.trim() === '' 
    || this.bairro.trim() === '' || this.logradouro.trim() === '') {

      this.verificacao = true;
      this.criado = false;
      this.camposMessage = 'Todos os campos devem ser preenchidos!';

    }else if(this.email.includes('@') === false || this.email.includes('.') === false) {
      this.verificacao = true;
      this.criado = false;
      this.emailCorreto = false;
      this.camposMessage = 'O email deve ser válido!';
    }
    else if (this.cep.length !== 8) {
      this.verificacao = true;
      this.criado = false;
      this.camposMessage = 'O CEP deve conter exatamente 8 dígitos!';
    }

    else if(isNaN(this.cpf) || isNaN(this.telefone) || isNaN(this.numero) || isNaN(this.cep)) {
      this.verificacao = true;
      this.criado = false;
      this.camposMessage = 'O CPF, telefone e CEP devem conter apenas números!';
    }
    else {
      this.verificacao = false;
      this.enviar();
    }

  }
  }
}

</script>