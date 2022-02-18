<template>
  <div id="app" class="container">
    <h1>Bem vindo a {{ title }}</h1>

    <h3 v-if="horas >= 9 && horas < 17" id="aberta">ABERTA</h3>
    <h3 v-else-if="horas >= 17 && horas < 18" id="proxima-fechar">PRÓXIMA DE FECHAR</h3>
    <h3 v-else id="fechada">FECHADA</h3>

    <div class="row">
        <div class="col">
          <h2>Filmes encontrados</h2>
        </div>
    </div>

    <div class="row">
      <div class="col-3" v-for="filme in filmes" :key="filme.id">
        <div class="card">
          <img :src="filme.imagem" class="card-img-top" alt="imagem do filme">
          <div class="card-body">
            <h5 class="card-title">{{ filme.titulo }}</h5>
            <p class="card-text" v-html="filme.descricao"></p>
            <p class="card-text">{{ formatarPreco(filme.valor, "$") }}</p>
            <a href="#" class="btn btn-primary">ALUGAR</a>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
 
<script>
import image from "./assets/logo.png"
export default {
  name: 'app',
  data() {
    return {
      title: 'Locadora de Filmes',
      horas: new Date().getHours(),
      filmes: [
        { id: 1, titulo: "Vingadores", descricao: "Um <b>filme</b> de heróis", valor: 25, imagem: image },
        { id: 2, titulo: "Pantera Negra", descricao: "Um <b>filme</b> de panteras", valor: 35, imagem: image },
        { id: 3, titulo: "Homem-Formiga", descricao: "Um <b>filme</b> de formigas", valor: 20, imagem: image },
        { id: 4, titulo: "Capitã Marvel", descricao: "Um <b>filme</b> de capitãs", valor: 40, imagem: image },
        { id: 5, titulo: "Hulk", descricao: "Um <b>filme</b> de força", valor: 10, imagem: image }
      ]
    }
  },
  methods: {
    formatarPreco(preco, simbolo) {
      if(!parseInt(preco)) {
        return ""
      }
      
      var precoFormatado = preco.toFixed(2).replace('.',',')
      return simbolo + " " + precoFormatado
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
