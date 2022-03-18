<template>
  <div id="app" class="container">
    <div class="row" v-if="mostrarFilmes">
      <my-main></my-main>
    </div>
    <my-form></my-form>
  </div>
</template>
 
<script>
import MyMain from "./components/Main.vue"
import MyForm from "./components/Form.vue"
export default {
  name: 'app',
  components: {
    MyMain,
    MyForm
  },
  data() {
    return {
      title: 'Locadora de Filmes',
      mostrarFilmes: true,
    }
  },
  methods: {
    mostrarCarrinho() {
      this.mostrarFilmes = this.mostrarFilmes ? false : true
    }
  },
  computed: {
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

.mensagem-estoque {
  font-weight: bold;
}

span.avaliacao-active {
  background-image: url('./assets/star-fill.jpg');
  background-repeat: no-repeat;
  background-position-y: 3px;
  background-position-x: 1px;
  background-size: 20px;
}
</style>
