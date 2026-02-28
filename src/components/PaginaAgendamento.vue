<template>
    <h1>Agende sua Consulta Odontológica</h1>
    

    <div class="DetalhesPaciente">
        <h2>Detalhes do Paciente</h2>
        <p>Nome: João Silva</p>
        <p>Idade: 30 anos</p>
        <p>CPF: 123.456.789-00</p>
        <p>Telefone: (11) 98765-4321</p>
        <p>Email: </p>
        <p>Bairro: Centro</p>
        <p>Cidade: São Paulo</p>

        <input type="text" placeholder="Digite seu CPF para Carregar seus Dados" id="inputCPF">
    </div>


    <div class="weather">
        <h2>Previsão do Tempo para o Dia da Consulta</h2>
        <p>São Paulo, 27/08/2026</p>
        <p>Temperatura: 25°C</p>
        <p>Condição: Ensolarado</p>
    </div>



    <div class="formDetalhes">
        <label for="procedimentos">Detalhes Da Consulta:</label>
        <select name="procedimentos" id="procedimentosDisponiveis">
            <option value="Tratamento de Canal">Tratamento de Canal</option>
            <option value="Extração de Dente">Extração de Dente</option>
            <option value="Limpeza Dental">Limpeza Dental</option>
            <option value="Implante Dentário">Implante Dentário</option>
        </select>

        <select name="datas" id="datasDisponiveis">
            <option value="27/08/2026">27/08/2026</option>
            <option value="28/08/2026">28/08/2026</option>
            <option value="29/08/2026">29/08/2026</option>
            <option value="30/08/2026">30/08/2026</option>
        </select>
        
        <select name="horarios" id="horariosDisponiveis">
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
        </select>


        <select name="dentistas" id="dentistasDisponiveis">
            <option value="Dr. Silva">Dr. Silva</option>
            <option value="Dra. Oliveira">Dra. Oliveira</option>
            <option value="Dr. Santos">Dr. Santos</option>
            <option value="Dra. Costa">Dra. Costa</option>
        </select>
        <button type="submit" id="buttonAgendar">Agendar Consulta</button>


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
    gap: 15px;

}

.formDetalhes label {
    font-size: 24px;
    font-weight: bold;
    width: 300px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    color: white;
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

<script>

export default {
  name: 'PaginaAgendamento'
}

</script>