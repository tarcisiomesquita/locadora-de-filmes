<template>
    <div>
        <h1>Bem vindo a {{ title }}</h1>
        <h3 v-if="horas >= 9 && horas < 17" id="aberta">ABERTA</h3>
        <h3 v-else-if="horas >= 17 && horas < 18" id="proxima-fechar">PRÓXIMA DE FECHAR</h3>
        <h3 v-else id="fechada">FECHADA</h3>
        <div class="row">
            <div class="col">
              <h2>Filmes encontrados</h2>
            </div>
        </div>
        <div class="row" >
            <div class="col">
              <router-link class="col" :to="{ name: 'form' }" custom v-slot="{ navigate, isActive }">
                <button role="link" @click="navigate" :class="['btn btn-primary', 'btn-lg', { active: isActive, 'exact-active': isExactActive }]">Carrinho: {{ quantidadeNoCarrinho }} Filmes</button>
              </router-link>
            </div>
        </div>
   </div>
</template>
<script>
    export default {
        name: 'my-header',
        props: {
            title: String,
            quantidadeNoCarrinho: Number
        },
        data() {
            return {
                horas: new Date().getHours
            }
        },
        methods: {
          mostrarCarrinho() {
            this.$router.push({name: "form"})
          }
        }
    }
</script>
<style scoped>
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