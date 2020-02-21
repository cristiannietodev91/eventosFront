import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    user: localStorage.getItem('user') || ''
  },
  getters: {
    user(state) {
      return state.user
    },
    isLoggedIn: state => !!state.user,
    authStatus: state => state.status
  },
  mutations: {
    auth_success(state, user) {
      state.status = 'success'
      state.user = user
    },
    auth_error(state, payload) {
      state.status = payload
    },
    auth_clean(state) {
      state.status = ''
      state.user = ''
    },
  },
  actions: {
    login({ commit }, payload) {
      //commit('clearError')
      //commit('setProcessing', true)
      commit('auth_clean')
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.usuario, payload.password)
        .then(
          user => {
            const newUser = {
              uid: user.user.uid,
              displayName: user.user.displayName,
              email: user.user.email,
              photoUrl: user.user.photoURL
            }

            console.log('Resultado usuario autenticado :::: > ', newUser);
            const item = { uid: newUser.uid, ...newUser }
            localStorage.setItem('user', JSON.stringify(item))
            //commit('setUser', { uid: newUser.uid, ...newUser })
            commit('auth_success', { uid: newUser.uid, ...newUser });           
            

          },
          err => {
            localStorage.removeItem('user')
            console.log('Error en login firebase ::::>', err)
            commit('auth_error', err.message);          
          }
        )
    },
    register({ commit }, payload) {
      commit('auth_clean')
      //commit('clearError')
      //commit('setProcessing', true)
      //payload.tipoUsuario = "AdminTaller";
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.usuario, payload.password)
        .then(user => {
          user.user
            .updateProfile({
              displayName: payload.name
            })
            .then(() => {
              const newUser = {
                uid: user.user.uid,
                displayName: user.user.displayName,
                email: user.user.email,
                photoUrl: user.user.photoURL
              }

              console.log('Resultado usuario registrado :::: > ', newUser);
              const item = { uid: newUser.uid, ...newUser }
              localStorage.setItem('user', JSON.stringify(item))
              //commit('setUser', { uid: newUser.uid, ...newUser })
              commit('auth_success', { uid: newUser.uid, ...newUser });
              
            });
        })
        .catch(err => {
          //console.log('Error', err)
          commit('auth_error', err.message);
          localStorage.removeItem('user')
        });


      /*ServicesCore.registrarUsuario(payload).then(user => {
        console.debug('Resultado usuario firebase :::> ', user.data);
        const item = { uid: user.data.uid, ...user.data }
        //const item = { uid: user.user.uid, ...currentUser }
        localStorage.setItem('user', JSON.stringify(item))
        commit('setUser', { uid: user.uid, ...user.data })
      },
        err => {
          console.error('Error firebase :::> ', err);
          commit('setError', err.message)
          setTimeout(() => {
            commit('clearError')
          }, 3000)
        })*/
    },
    logout({ commit }) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.removeItem('user')
          commit('auth_clean')
        });
    },
    fetchUser({ commit }, user) {
      if (user) {
        commit('auth_success', { uid: user.uid, ...user.data })
      } else {
        localStorage.removeItem('user')
        commit('auth_clean')
      }      
    }
  },
  modules: {
  }
})
