<template>
  <div>
    <h1>Lista de Tareas</h1>
    <!-- {{carga}} -->
    <router-link to="/agregar">
      <button class="btn btn-success btn-block shadow">Agregar</button>
    </router-link>

    <div v-if="carga" class="text-center mt-5">
      <h3>Cargando Contenido... </h3> 
      <pulse-loader :loading="carga"></pulse-loader>
    </div>

    <form @submit.prevent="buscador(texto)">
      <input placeholder="Buscar tarea..." 
            class="form-control mt-4"
            v-model="texto"
            v-on:keyup="buscador(texto)"
            >
    </form>

    <ul class="list-group mt-2" v-if="!carga">
      <li v-for=" (item, index) in arrayFiltrado" :key="index" class="list-group-item">
        <div class="float-left">
         <!-- <i>{{item.id}}</i> -->
        </div>
        <span>
          <strong>{{ item.nombre }}</strong>
        </span>

        <div class="float-right">
          <router-link
            :to="{name: 'Editar', params: { id: item.id } }"
            class="btn btn-info shadow ml-2 mr-2"
          >Editar</router-link>

          <button @click="eliminarTarea(item.id)" class="btn btn-danger shadow">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// importamos librería spinner

import { mapActions, mapState, mapGetters } from "vuex";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: "Inicio",
  data(){
    return {
      texto:''
    }
  },
  computed: {
    ...mapState(["usuario", "tareas", "carga"]),
    ...mapGetters(['arrayFiltrado'])
  },
  methods: {
    ...mapActions(["getTareas", "eliminarTarea" ,"buscador"])
  },
  created() {
    this.getTareas();
  },
    components: {
    PulseLoader
  }
};
</script>

