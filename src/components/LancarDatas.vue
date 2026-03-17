<template>
    <h1 id="titulo">Lançar Datas</h1>

    <div class="container">
        <form @submit.prevent="enviar()">
            <input type="date" :min="hoje" :max="daquiDoisAnos" id="data" v-model="dia">
            <input type="time" min="08:00" max="17:00" id="time" v-model="hora">
            <button type="submit" id="submit">Confirmar</button>
            <span id="resultado">{{ mensagemResultado }}</span>

        </form>
    </div>



</template>

<style>

#resultado {
    color: whitesmoke;
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.1);
    font-weight: bold;
}


#submit {
    width: 80px;
    height: 25px;
    background-color: transparent;
    border: 2px solid white;
    color: whitesmoke;
    font-weight: bold;
    font-size: 12px;
    border-radius: 5px;
    transition: 0.3s;
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.2);
}

#submit:hover {
    background: white;
    color: rgb(0, 6, 85);
}

#titulo {
    margin-left: 30%;
}

.container form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    margin-top: -70px;
}

#time {
    height: 65px;
    width: 125px;
    font-size: 15px;
    border-radius: 5px;
    padding: 5px;
    border: 2px solid white;
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.2);
}

#data {
    margin-top: 10%;
    height: 65px;
    width: 125px;
    font-size: 15px;
    border-radius: 5px;
    padding: 5px;
    border: 2px solid white;
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.2);
}

.container {
    height: 550px;
    width: 800px;
    background-color: black;
    margin-left: 30%;
    margin-top: 3%;
    background: linear-gradient(150deg, rgb(0, 6, 85), rgba(0, 0, 0, 0.466));
    box-shadow: 4px 10px 10px rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
}


</style>


<script setup>
import { format, addYears } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import { onMounted, ref } from 'vue';

const mensagemResultado = ref('')
const hoje = format(new Date(), 'yyyy-MM-dd');
const daquiDoisAnos = format(addYears(new Date(), 2), 'yyyy-MM-dd');
const dia = ref('')
const hora = ref('')
const cpfDentista = ref('')
const idDentista = ref('')
const consultorio = ref('')
const token = localStorage.getItem('token')

async function enviar() {
    if (dia.value === '' || hora.value === '') {
        mensagemResultado.value = "Todos os campos devem ser preenchidos"
        return
    }
    const response = await fetch("https://odontostar-backend.onrender.com/api/lancar-datas", {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            data: dia.value,
            dentista: idDentista.value,
            horario: hora.value,
            consultorio: consultorio.value,
            marcada: false
        })
    })

    const data = await response.json()

    if (!response.ok) {
        mensagemResultado.value = data.message
        return 
    } else {
        mensagemResultado.value = "data lançada com sucesso"
        return 
    }

}

onMounted(async ()  =>  {

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token)
    cpfDentista.value = decoded.cpf

    const response = await fetch(`https://odontostar-backend.onrender.com/api/findBy?cpf=${cpfDentista.value}`, {
        headers: {'Authorization': `Bearer ${token}`}
    })

    const data = await response.json();
    
    

    if (!response.ok) {
        console.log(data.message)
        return
    } else {
        const responseDentista = await fetch(`https://odontostar-backend.onrender.com/api/dentistabycpf?cpf=${cpfDentista.value}`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        

        const dataDentista = await responseDentista.json();
        

        idDentista.value = dataDentista.request._id
        consultorio.value = dataDentista.consultorio
        return 
    }


})

</script>