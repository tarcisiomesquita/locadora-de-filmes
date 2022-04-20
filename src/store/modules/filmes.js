import axios from "axios"

const state = {
    filmes: {}
}

const getters = {
    filmes: state => state.filmes,
    filme: state => (id) => {
        return state.filmes.find(filme => filme.id === id)
    }
}

const mutations = {
    SET_STORE: (state, filmes) => {
        state.filmes = filmes
    }
}
const actions = {
    INICIALIZAR_STORE: async ({ commit }) => {
       await axios.get('https://run.mocky.io/v3/9435e4ae-48f9-4a3f-a83d-f547f84388a3')
            .then((response) => {
                console.log(response.data.filmes)
                commit('SET_STORE', response.data.filmes)
            })
            .catch(function (error) {
                console.log(error);
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}