import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");

var firebaseConfig = {
  apiKey: "AIzaSyADRRssK-O56yaEl4_wRI1JSNW4gHvujAY",
  authDomain: "login-vue-201dd.firebaseapp.com",
  databaseURL: "https://login-vue-201dd.firebaseio.com",
  projectId: "login-vue-201dd",
  storageBucket: "login-vue-201dd.appspot.com",
  messagingSenderId: "220210300628",
  appId: "1:220210300628:web:62f64fe2e788dbd14fdd41"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged( (user)=> {
  // console.log(user);
  // si usuario existe
  if( user ){
    // ejecutamos la store que llama una acción 
    store.dispatch('detectarUsuario', { email: user.email , uid: user.uid })
  }else{
    store.dispatch('detectarUsuario', null)
  }

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')

})

