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
        <div class="col">
          <button @click="mostrarCarrinho" class="btn btn-primary">Carrinho: {{ quantidadeNoCarrinho }} Filmes</button>
        </div>
      </div>
    <div class="row" v-if="mostrarFilmes">
      <div class="col-3" v-for="filme in filmesOrdenados" :key="filme.id">
        <div class="card">
          <img :src="filme.imagem" class="card-img-top" alt="imagem do filme">
          <div class="card-body">
            <h5 class="card-title">{{ filme.titulo }}</h5>
            <p class="card-text" v-html="filme.descricao"></p>
            <span class="mensagem-estoque" v-if="estoqueRestantePorFilme(filme) === 0">Indisponível</span>
            <span class="mensagem-estoque" v-else-if="estoqueRestantePorFilme(filme) < 5">
              Apenas {{ estoqueRestantePorFilme(filme) }} itens no estoque
            </span>
            <span class="mensagem-estoque" v-else>
              Alugue agora!
            </span>
            <p class="card-text">{{ formatarPreco(filme.valor, "$") }}</p>
            <div class="avaliacao">
              <span v-for="n in 5" :key="n" :class="{ 'avaliacao-active': checarAvaliacao(n, filme) }">
                <img src="./assets/star.jpg" height=20 alt="estrelas dde avaliação">
              </span>
            </div>
            <a v-if="validarPermissaoParaAdicionarNoCarrinho(filme)" @click="adicionarAoCarrinho(filme)" class="btn btn-primary">ALUGAR</a>
            <a v-else class="btn btn-primary disabled">ALUGAR</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <h2>Carrinho</h2>
      <div class="col-12">
        <form action="">
          <div class="mb-3">
            <label for="primeiro-nome">Primeiro nome</label>
            <input type="text" class="form-control" id="primeiro-nome" placeholder="Digite o primeiro nome" v-model.trim.lazy="pedido.primeiroNome">
          </div>
          <div class="mb-3">
            <label for="ultimo-nome">Último nome</label>
            <input type="text" class="form-control" id ="ultimo-nome" placeholder="Digte o ultimo nome" v-model.trim.lazy="pedido.ultimoNome">
          </div>
          <div class="mb-3">
            <label for="endereco">Endereço</label>
            <input type="text" class="form-control" id="endereco" placeholder="Digite o endereço" v-model.trim.lazy="pedido.endereco">
          </div>
          <div class="mb-3">
            <label for="cidade">Cidade</label>
            <input type="text" class="form-control" id="cidade" placeholder="Digite a cidade" v-model.trim.lazy="pedido.cidade">
          </div>
          <div class="mb-3">
            <label for="estado">Estado</label>
            <select class="form-control" id="estado" v-model="pedido.estado">
              <option disabled value>Escolha um estado</option>
              <!-- <option :value="estados.RJ">RJ</option>
              <option :value="estados.SP">SP</option>
              <option :value="estados.MG">MG</option>
              <option :value="estados.ES">ES</option>
              <option :value="estados.CE">CE</option> -->
              <option v-for="(estado, sigla) in estados" :key="sigla" :value="estado">{{sigla}}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="cep">CEP</label>
            <input type="text" class="form-control" id="cep" placeholder="Digite o CEP" v-model.number="pedido.cep">
          </div>
          <div class="mb-3">
              <input type="checkbox" class="form-check-input" id="pago-na-entrega" v-model="pedido.pagoNaEntrega" :true-value="pedido.simNaEntrega" :false-value="pedido.naoNaEntrega">
              <label class="form-check-label" for="pago-na-entrega">Pago na entrega?</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="manha" value="Manhã" v-model="pedido.entrega">
            <label class="form-check-label" for="manha">Manhã</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="tarde" value="Tarde" v-model="pedido.entrega">
            <label class="form-check-label" for="tarde">Tarde</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="noite" value="Noite" v-model="pedido.entrega">
            <label class="form-check-label" for="noite">Noite</label>
          </div>
          <div class="mb-3">
            <button type="submit" class="btn btn-primary" @click="submitFormulario">
              Finalizar pedido
            </button>
          </div>
        </form>
      </div>
      <div class="col-12">
        <pre>
          Primeiro nome: {{pedido.primeiroNome}}
          Último nome: {{pedido.ultimoNome}}
          Endereço:{{pedido.endereco}}
          Cidade: {{pedido.cidade}}
          Estado: {{pedido.estado}}
          CEP: {{pedido.cep}}
          Pago na entrega: {{pedido.pagoNaEntrega}}
          Entrega: {{pedido.entrega}}
        </pre>
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
      mostrarFilmes: true,
      horas: new Date().getHours(),
      estados: {
        RJ: "Rio de Janeiro",
        SP: "São Paulo",
        MG: "Mato Grosso",
        ES: "Espírito Santo",
        CE: "Ceará"
      },
      filmes: [
        { id: 1, titulo: "Vingadores", descricao: "Um <b>filme</b> de heróis", valor: 25, imagem: image, estoqueDisponivel: 3, avaliacao: 5 },
        { id: 2, titulo: "Pantera Negra", descricao: "Um <b>filme</b> de panteras", valor: 35, imagem: image, estoqueDisponivel: 6, avaliacao: 4 },
        { id: 3, titulo: "Homem-Formiga", descricao: "Um <b>filme</b> de formigas", valor: 20, imagem: image, estoqueDisponivel: 2, avaliacao: 3  },
        { id: 4, titulo: "Capitã Marvel", descricao: "Um <b>filme</b> de capitãs", valor: 40, imagem: image, estoqueDisponivel: 8, avaliacao: 4 },
        { id: 5, titulo: "Hulk", descricao: "Um <b>filme</b> de força", valor: 10, imagem: image, estoqueDisponivel: 7, avaliacao: 2 }
      ],
      carrinho: [],
      pedido: {
        primeiroNome: "",
        ultimoNome: "",
        endereco: "",
        cidade: "",
        estado: "",
        cep: "",
        pagoNaEntrega: "Não",
        simNaEntrega: "Sim",
        naoNaEntrega: "Não",
        entrega: ""
      }
    }
  },
  methods: {
    formatarPreco(preco, simbolo) {
      if(!parseInt(preco)) {
        return ""
      }
      var precoFormatado = preco.toFixed(2).replace('.',',')
      return simbolo + " " + precoFormatado
    },
    adicionarAoCarrinho(filme) {
      this.carrinho.push(filme.id)
    },
    quantidadeNoCarrinhoPorFilme(filme) {
      var quantidade = 0
      for (let i=0; i < this.carrinho.length; i++) {
        if (filme.id == this.carrinho[i]) {
          quantidade++
        }
      }
      return quantidade
    },
    validarPermissaoParaAdicionarNoCarrinho(filme) {
      return  filme.estoqueDisponivel > this.quantidadeNoCarrinhoPorFilme(filme)
    },
    mostrarCarrinho() {
      this.mostrarFilmes = this.mostrarFilmes ? false : true
    },
    submitFormulario() {
      alert("Pedido finalizado")
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
