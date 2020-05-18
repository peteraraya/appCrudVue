import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//Bue-Bootstrap
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vuelidate
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

var firebase = require("firebase/app");
// Add the Firebase products that you want to use
require("firebase/auth");


// Utilizaremos firestore
require("firebase/firestore");

// var firebaseConfig = {
//   apiKey: "AIzaSyADRRssK-O56yaEl4_wRI1JSNW4gHvujAY",
//   authDomain: "login-vue-201dd.firebaseapp.com",
//   databaseURL: "https://login-vue-201dd.firebaseio.com",
//   projectId: "login-vue-201dd",
//   storageBucket: "login-vue-201dd.appspot.com",
//   messagingSenderId: "220210300628",
//   appId: "1:220210300628:web:62f64fe2e788dbd14fdd41"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC1v0BLgPoCH7B81mXblHNsIrk64PLIHaM",
  authDomain: "vue-crud-fcb90.firebaseapp.com",
  databaseURL: "https://vue-crud-fcb90.firebaseio.com",
  projectId: "vue-crud-fcb90",
  storageBucket: "vue-crud-fcb90.appspot.com",
  messagingSenderId: "259205742782",
  appId: "1:259205742782:web:0d0cb3d39a797b698a9eef"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig)

const firebaseApp = firebase.initializeApp(firebaseConfig)

// firebaseApp.firestore().settings({timestampsInSnapshots:true})

export default firebaseApp.firestore();






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

