<template>
  <div>
    <div class="row">
      <my-header
        class="col-12"
        title="Locadora de Filmes"
        :quantidadeNoCarrinho="quantidadeNoCarrinho"
      ></my-header>
    </div>
    <div class="row">
      <div class="col-3" v-for="filme in filmesOrdenados" :key="filme.id">
        <div class="card">
          <img :src="filme.imagem" class="card-img-top" alt="imagem do filme" />
          <div class="card-body">
            <h5 class="card-title">{{ filme.titulo }}</h5>
            <p class="card-text" v-html="filme.descricao"></p>
            <span
              class="mensagem-estoque"
              v-if="estoqueRestantePorFilme(filme) === 0"
              >Indisponível</span
            >
            <span
              class="mensagem-estoque"
              v-else-if="estoqueRestantePorFilme(filme) < 5"
            >
              Apenas {{ estoqueRestantePorFilme(filme) }} itens no estoque
            </span>
            <span class="mensagem-estoque" v-else> Alugue agora! </span>
            <p class="card-text">{{ formatarPreco(filme.valor, "$") }}</p>
            <div class="avaliacao">
              <span
                v-for="n in 5"
                :key="n"
                :class="{ 'avaliacao-active': checarAvaliacao(n, filme) }"
              >
                <img
                  src="../assets/star.jpg"
                  height="20"
                  alt="estrelas dde avaliação"
                />
              </span>
            </div>
            <a
              v-if="validarPermissaoParaAdicionarNoCarrinho(filme)"
              @click="adicionarAoCarrinho(filme)"
              class="btn btn-primary"
              >ALUGAR</a
            >
            <a v-else class="btn btn-primary disabled">ALUGAR</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import image from "../assets/logo.png"
import MyHeader from "./Header.vue"
export default {
  name: "my-main",
  components: {
    MyHeader,
  },
  data() {
    return {
      filmes: [
        {
          id: 1,
          titulo: "Vingadores",
          descricao: "Um <b>filme</b> de heróis",
          valor: 25,
          imagem: image,
          estoqueDisponivel: 3,
          avaliacao: 5,
        },
        {
          id: 2,
          titulo: "Pantera Negra",
          descricao: "Um <b>filme</b> de panteras",
          valor: 35,
          imagem: image,
          estoqueDisponivel: 6,
          avaliacao: 4,
        },
        {
          id: 3,
          titulo: "Homem-Formiga",
          descricao: "Um <b>filme</b> de formigas",
          valor: 20,
          imagem: image,
          estoqueDisponivel: 2,
          avaliacao: 3,
        },
        {
          id: 4,
          titulo: "Capitã Marvel",
          descricao: "Um <b>filme</b> de capitãs",
          valor: 40,
          imagem: image,
          estoqueDisponivel: 8,
          avaliacao: 4,
        },
        {
          id: 5,
          titulo: "Hulk",
          descricao: "Um <b>filme</b> de força",
          valor: 10,
          imagem: image,
          estoqueDisponivel: 7,
          avaliacao: 2,
        },
      ],
        carrinho: [],
    }
  },
  methods: {
    formatarPreco(preco, simbolo) {
      if (!parseInt(preco)) {
        return ""
      }
      var precoFormatado = preco.toFixed(2).replace(".", ",")
      return simbolo + " " + precoFormatado
    },
    adicionarAoCarrinho(filme) {
      this.carrinho.push(filme.id)
    },
    quantidadeNoCarrinhoPorFilme(filme) {
      var quantidade = 0
      for (let i = 0; i < this.carrinho.length; i++) {
        if (filme.id == this.carrinho[i]) {
          quantidade++
        }
      }
      return quantidade
    },
    validarPermissaoParaAdicionarNoCarrinho(filme) {
      return filme.estoqueDisponivel > this.quantidadeNoCarrinhoPorFilme(filme)
    },
    estoqueRestantePorFilme(filme) {
      return filme.estoqueDisponivel - this.quantidadeNoCarrinhoPorFilme(filme)
    },
        checarAvaliacao(n, filme) {
      return filme.avaliacao - n >= 0 
    }
  },
  computed: {
    quantidadeNoCarrinho() {
      return this.carrinho.length
    },
    filmesOrdenados() {
      if (this.filmes.length > 0) {
        return [...this.filmes].sort((a, b) => {
          if(a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
            return -1
          }
          if(a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
            return 1
          }
          return 0
        })
      }
      else {
        return []
      }
    }
  }
}
</script>
<style scoped>
.mensagem-estoque {
  font-weight: bold;
}

span.avaliacao-active {
  background-image: url('../assets/star-fill.jpg');
  background-repeat: no-repeat;
  background-position-y: 3px;
  background-position-x: 1px;
  background-size: 20px;
}
</style>