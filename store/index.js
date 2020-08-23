import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    count: 0,
    users: []
  },
  getters: {
    getUsers (state) {
      return state.users
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setUsers (state, users) {
      console.log(state, users)
      state.users = users
    }
  },
  actions: {
    // async fetchUsers({commit}) {
    //     commit('setUsers', await fetch('https://jsonplaceholder.typicode.com/users'))
    // }
    fetchUsers({ commit }) {
      return new Promise((resolve) => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            return response.json()
          })
          .then((result) => {
            console.log(result)
            commit('setUsers', result)
            return resolve
          })
          .catch((error) => {
            console.log(error.statusText)
          })
      })
    }
    // async fetchUsers({commit}) {
    //     let response
    //     try {
    //         await fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(result => {
    //             return result.json()
    //         })
    //         .then(result2 => {
    //             response = result2
    //         })
    //         commit('setUsers', response)
    //         // console.log(response.json())
    //         return response
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
  }
})

export default store
