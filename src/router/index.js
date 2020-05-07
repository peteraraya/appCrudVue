import Vue from 'vue'
import VueRouter from 'vue-router'
var firebase = require("firebase/app");

Vue.use(VueRouter)

  const routes = [
    {
      path: '/registro',
      name: 'registro',
      component: () => import(/* webpackChunkName: "registro" */ '../views/Registro.vue')
    },
    {
      path: '/',
      name: 'inicio',
      component: () => import(/* webpackChunkName: "inicio" */ '../views/Inicio.vue'),
      // ruta protegida
      meta: { requiresAuth:true}
    },
    {
      path: '/ingreso',
      name: 'ingreso',
      component: () => import(/* webpackChunkName: "ingreso" */ '../views/Ingreso.vue')
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from, next)=>{
  // si nuestra ruta detecta una autentificación devuelve un true
  const rutaProtegida = to.matched.some(record => record.meta.requiresAuth);
  const user = firebase.auth().currentUser;

  if (rutaProtegida === true && user === null) {
      next({ name: 'ingreso'}) // si ruta esta protegida se redirecciona a ingreso
  }else{
    next() // todas las rutas que no tengan metas
  }
})

export default router
