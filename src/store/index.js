import Vue from 'vue'
import Vuex from 'vuex'

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");

// Usaremos router en nuestra tienda
import router from '../router'

import db from '../main'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Creamos uno de los usuarios
    usuario: '',
    error: '',
    // reutilización de codigo de crud
    tareas: [],
    tarea: { nombre: '', id: '' },
    carga: false,
    texto: ''
  },
  mutations: {
    // Crearemos un setUsuario para llenar el state - a todo lo que reibamos como parametro va ser considereado un payload
    setUsuario(state, payload) {
      state.usuario = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    // Reutilización de codigo
    setTareas(state, payload) {
      state.tareas = payload
    },
    setTarea(state, payload) {
      state.tarea = payload
    },
    setEliminarTarea(state, payload) {
      const tareasFiltradas = state.tareas.filter(item => item.id !== payload)
      state.tareas = tareasFiltradas
    },
    cargarFirebase(state,payload){
      state.carga = payload
    }

  },
  actions: {


    buscador({commit, state}, payload){

      console.log(payload);
      state.texto = payload.toLowerCase();

    },

    // CrearUsuario 
    crearUsuario({ commit }, payload) {
      // aqui utilizaremos firebase 
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          console.log(res.user.email);
          console.log(res.user.uid);
          //usamos set para guardar en nuestro state ese usuario
          commit('setUsuario', { email: res.user.email, uid: res.user.uid });

          // Crear una colección
          db.collection(res.user.email).add({
            nombre: 'Tarea de ejemplo'
          })
            .then(() => {
              router.push({ name: 'inicio' });
            })
            .catch(err => {
              // console.log(err);
              commit('setError', err.code);
            })

        })
        .catch(err => {
          // console.log(err.message);
          // Ejecutamos los errores
          commit('setError', err.code);
        })
    },

    ingresoUsuario({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          // console.log(res);
          commit('setUsuario', { email: res.user.email, uid: res.user.uid })
          router.push({ name: 'inicio' });
        })
        .catch(err => {
          // console.log(err);
          commit('setError', err.code);
        })
    },

    detectarUsuario({ commit }, payload) {

      if (payload != null) {
        // Llenamos la información de nuestro usuario
        commit('setUsuario', { email: payload.email, uid: payload.uid })
      } else {
        commit('setUsuario', null)
      }
    },

    cerrarSession({ commit }) {
      firebase.auth().signOut()
      commit('setUsuario', null)
      router.push({ name: 'ingreso' })
    },
    // Reutilización de codigo de crud
    getTareas({ commit }) {
      // spinner
      commit('cargarFirebase',true);

      //Devuelve información de usuario activo (usuario logueado)
      const usuario = firebase.auth().currentUser
      const tareas = []

      // config api key  + collection 
      db.collection(usuario.email).get()
        .then(res => {

          res.forEach(doc => {

            // Crearemos un objeto
            let tarea = doc.data()
            tarea.id = doc.id
            // empujamos a tareas
            tareas.push(tarea)
          })
          // se realiza el commit cuando se cargen todos los archivos
            commit('cargarFirebase', false);          
        })
      commit('setTareas', tareas)
    },

    getTarea({ commit }, idTarea) {
      const usuario = firebase.auth().currentUser
      // accedemos directamente al docuento que tendra ese id
      db.collection(usuario.email).doc(idTarea).get()
        .then(doc => {
          console.log(doc.id)
          console.log(doc.data())
          let tarea = doc.data()
          tarea.id = doc.id
          commit('setTarea', tarea)
        })
    },

    editarTarea({ commit }, tarea) {
      const usuario = firebase.auth().currentUser
      // utilizamos update
      db.collection(usuario.email).doc(tarea.id).update({
        nombre: tarea.nombre
      })
        .then(() => {
          console.log('tarea editada');
          // redirecciona a la ruta raiz
          router.push('/')
        })
    },

    agregarTarea({ commit }, nombreTarea) {
      commit('cargarFirebase', true);  
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).add({
        nombre: nombreTarea
      })
        .then(doc => {
          console.log(doc.id)
          router.push('/')
          commit('cargarFirebase', false);  
        })
    },

    eliminarTarea({ commit, dispatch }, idTarea) {
      const usuario = firebase.auth().currentUser
      db.collection(usuario.email).doc(idTarea).delete()
        .then(() => {
          console.log('Tarea eliminada')
          commit('setEliminarTarea', idTarea)
        })
    }
  },

  getters: {
    existeUsuario(state) {
      if (state.usuario === null || state.usuario === '' || state.usuario === undefined) {
        return false
      } else {
        return true
      }
    },
    arrayFiltrado(state) {
      // Vamos a retornar un nuevo arreglo
      let arregloFiltrado = []
      // recorremos el state de tareas
      for (let tarea of state.tareas) {
        // toma el primer nombre de la tarea y lo pasa a minusculas
        let nombre = tarea.nombre.toLowerCase();

        if (nombre.indexOf(state.texto) >= 0) {
          // Vamos a agregar la tarea completa
          arregloFiltrado.push(tarea);
        }
      }
      return arregloFiltrado;
    }
  },




})
