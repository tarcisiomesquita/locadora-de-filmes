<template>
    <div class="row">
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
</template>
<script>
export default {
  name: "my-form",
  data() {
    return {
      estados: {
        RJ: "Rio de Janeiro",
        SP: "São Paulo",
        MG: "Mato Grosso",
        ES: "Espírito Santo",
        CE: "Ceará"
      },
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
    submitFormulario() {
      alert("Pedido finalizado")
    }
  }
}
</script>