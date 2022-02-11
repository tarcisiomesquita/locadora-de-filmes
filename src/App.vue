<template>
  <div id="app">
    <h1>Bem vindo a {{ title }}</h1>

    <h3 v-if="horas >= 9 && horas < 17" id="aberta">ABERTA</h3>
    <h3 v-else-if="horas >= 17 && horas < 18" id="proxima-fechar">PRÓXIMA DE FECHAR</h3>
    <h3 v-else id="fechada">FECHADA</h3>
  </div>
</template>
 
<script>
export default {
  name: 'app',
  data: function() {
    return {
      title: 'Locadora de Filmes',
      horas: new Date().getHours()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#aberta {
  color: green
}

#proxima-fechar {
  color: yellow
}

#fechada {
  color: red
}

</style>
