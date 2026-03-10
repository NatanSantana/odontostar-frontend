<template>
  <div class="pagina">

    <header class="header">
      <h1 class="headerTitulo">⭐ OdontoStar</h1>
      <div class="headerBotoes">
        <button @click="$router.push('/login')" class="btnLogin">Login</button>
        <button @click="$router.push('/cadastro')" class="btnCadastro">Cadastro</button>
      </div>
    </header>

    <section class="hero">
      <div class="heroTexto">
        <h2>Seu sorriso merece o melhor</h2>
        <p>Na OdontoStar, acreditamos que um sorriso saudável transforma vidas. Com uma equipe de profissionais altamente qualificados e tecnologia de ponta, oferecemos atendimento completo em odontologia, do tratamento preventivo às intervenções mais complexas.</p>
        <button @click="$router.push('/cadastro')" class="btnAgendar">Agende sua Consulta</button>
      </div>
    </section>

    <section class="servicos">
      <h2>Nossos Serviços</h2>
      <div class="servicosGrid">
        <div class="servicoCard">
          <span class="icone">🦷</span>
          <h3>Limpeza Dental</h3>
          <p>Remoção de tártaro e placa bacteriana para manter sua saúde bucal em dia.</p>
        </div>
        <div class="servicoCard">
          <span class="icone">⚕️</span>
          <h3>Tratamento de Canal</h3>
          <p>Procedimento eficaz para salvar dentes comprometidos com infecção.</p>
        </div>
        <div class="servicoCard">
          <span class="icone">✨</span>
          <h3>Implante Dentário</h3>
          <p>Reposição de dentes perdidos com implantes modernos e duradouros.</p>
        </div>
        <div class="servicoCard">
          <span class="icone">😁</span>
          <h3>Extração</h3>
          <p>Extração segura e indolor com todo o cuidado que você merece.</p>
        </div>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 OdontoStar — Todos os direitos reservados.</p>
    </footer>

  </div>
</template>

<script>
export default {
  name: 'PaginaMain'
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.pagina {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background: rgb(0, 6, 85);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
}

.headerTitulo {
  color: white;
  font-size: 28px;
  letter-spacing: 3px;
  background: none;
  width: auto;
  height: auto;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
}

.headerBotoes {
  display: flex;
  gap: 15px;
}

.btnLogin {
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 8px 20px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btnLogin:hover {
  background: white;
  color: rgb(0, 6, 85);
}

.btnCadastro {
  background: white;
  color: rgb(0, 6, 85);
  border: 2px solid white;
  padding: 8px 20px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btnCadastro:hover {
  background: transparent;
  color: white;
}


.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 40px;
  background: linear-gradient(135deg, rgb(10, 6, 40), rgb(60, 80, 200));
  flex: 1;
}

.heroTexto {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  text-align: center;
}

.heroTexto h2 {
  color: white;
  font-size: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
}

.heroTexto p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 17px;
  line-height: 1.8;
}

.btnAgendar {
  background: white;
  color: rgb(0, 6, 85);
  border: none;
  padding: 14px 30px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  align-self: center;
  transition: 0.3s;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
}

.btnAgendar:hover {
  background: rgb(60, 80, 200);
  color: white;
}


.servicos {
  padding: 60px 40px;
  background: rgb(0, 6, 85);
  text-align: center;
}

.servicos h2 {
  color: white;
  font-size: 30px;
  margin-bottom: 40px;
  letter-spacing: 2px;
}

.servicosGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1100px;
  margin: 0 auto;
}

.servicoCard {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: 0.3s;
}

.servicoCard:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.servicoCard .icone {
  font-size: 35px;
}

.servicoCard h3 {
  color: white;
  font-size: 18px;
}

.servicoCard p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  line-height: 1.6;
}


.footer {
  background: rgb(0, 3, 50);
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding: 20px;
  font-size: 13px;
}


@media (max-width: 768px) {
  .header {
    padding: 15px 20px;
  }

  .headerTitulo {
    font-size: 20px;
  }

  .heroTexto h2 {
    font-size: 28px;
  }

  .servicosGrid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .header {
    flex-direction: column;
    gap: 15px;
  }

  .heroTexto h2 {
    font-size: 22px;
  }

  .heroTexto p {
    font-size: 15px;
  }

  .servicosGrid {
    grid-template-columns: 1fr;
  }

  .btnLogin, .btnCadastro {
    padding: 8px 15px;
    font-size: 13px;
  }
}
</style>