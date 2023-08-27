import axios from "axios";
export default {
    namespaced: true,
    state: {
        brands: [],
    },
    getters: {
        getbrands: state => state.brands
    },
    actions: {
        async fetchbrands({ commit }) {
            try {
                const databrands = await axios.get("https://ecommerce.olipiskandar.com/api/v1/all-brands")
                commit('SET_BRANDS', databrands.data.data.slice(0,20))
            } catch (error) {
                alert("Ada error");
                console.log(error);
            }
        },
    },
    mutations: {
        SET_BRANDS(state, brands) {
            state.brands = brands
        },
    }
}