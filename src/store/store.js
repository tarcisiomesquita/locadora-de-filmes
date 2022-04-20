// import Vue from "vue"
import { createStore } from "vuex"
import filmes from './modules/filmes'

export const store = createStore({
    modules: {
        filmes
    } 
})
