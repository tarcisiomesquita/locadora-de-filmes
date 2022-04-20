<template>
    <my-header class="col-12" title="Locadora de Filmes"></my-header>
    <!-- <div class="col-5 mt-1">
        <img :src="filme.imagem" alt="imagem do filme">
    </div>
    <div class="col-7 mt-1">
        <h1>{{ filme.titulo }}</h1>
        <p v-html="filme.descricao"></p>
        <p>{{ formatarPreco(filme.valor, 'R$') }}</p>
    </div> -->

    <div class="col-3 mx-auto">
        <div class="card ">
            <img :src="filme.imagem" class="card-img-top" :alt="'Capa DVD de' + filme.titulo" />
            <div class="card-body">
                <h5 class="card-title">{{ filme.titulo }}</h5>
                <p class="card-text" v-html="filme.descricao"></p>
                <p class="card-text">{{ formatarPreco(filme.valor, "$") }}</p>
                <div>
                    <button class="btn btn-primary" @click="editar">Editar Filme</button>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import MyHeader from "./Header.vue"
export default {
    name: 'my-filme',
    components: {
        MyHeader
    },
    data() {
        return {
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
        editar() {
            this.$router.push({ name: 'editar-filme'})
        }
    },
    computed: {
        filme() {
            return this.$store.getters.filme(parseInt(this.$route.params.id))
        }
    }
}
</script>