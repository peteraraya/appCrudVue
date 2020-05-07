import Vue from 'vue'
import Vuex from 'vuex'

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");

// Usaremos router en nuestra tienda
import router from '../router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Creamos uno de los usuarios
    usuario: '',
    error:   ''
  },
  mutations: {
    // Crearemos un setUsuario para llenar el state - a todo lo que reibamos como parametro va ser considereado un payload
    setUsuario(state, payload){
      state.usuario = payload;
    },
    setError(state, payload){
      state.error = payload;
    }

  },
  actions: {
    // CrearUsuario 
    crearUsuario({commit}, payload){
      // aqui utilizaremos firebase 
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
            .then( res=>{
              console.log( res.user.email);
              console.log( res.user.uid  );
              //usamos set para guardar en nuestro state ese usuario
              commit('setUsuario',{email:res.user.email, uid: res.user.uid});
              router.push({name:'inicio'});

            })
            .catch( err=>{
              console.log(err.message);
              // Ejecutamos los errores
              commit('setError', err.message);
            })
    },
    ingresoUsuario({commit},payload){
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
                .then( res =>{
                  // console.log(res);
                  commit('setUsuario', { email: res.user.email, uid: res.user.uid })
                  router.push({ name: 'inicio' });
                })
                .catch( err=> {
                  console.log(err);
                  commit('setError', err.message);
                })
    },

    detectarUsuario({ commit }, payload){
    
      if ( payload != null) {
        // Llenamos la información de nuestro usuario
        commit('setUsuario',{ email:payload.email, uid:payload.uid })  
      }else{
        commit('setUsuario', null)  
      }
    },

    cerrarSession({commit}){
      firebase.auth().signOut()
      commit('setUsuario', null)
      router.push({name: 'ingreso'})
    }
  },

  getters:{
    existeUsuario(state){
      if(state.usuario === null || state.usuario === '' || state.usuario === undefined){
        return false
      }else{
        return true
      }
    }
  }


 


  
})
