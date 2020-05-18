<template>
    <div>
        <!-- {{tarea.id}}-->  
        
        <h1>Editar  <small> {{tarea.nombre}}</small></h1>
        <form @submit.prevent="editarTarea(tarea)" class="form-inline">
                  <div class="input-group-prepend">
                        <span class="input-group-text">Editar</span>
                <input type="text" class="form-control" v-model="$v.tarea.nombre.$model">        
            </div>
          <button type="submit" 
                  class="btn btn-info ml-2"
                  :disabled="$v.tarea.$invalid"
                  >
                  Editar</button>
        </form>
        <small class="text-danger" 
            v-if="!$v.tarea.nombre.required">
               Campo requerido</small>
        <!-- {{$v.tarea.nombre}} -->
    </div>
</template>

<script>
import  {mapActions, mapState} from 'vuex'
import { required} from 'vuelidate/lib/validators'
export default {
    name:'Editar',
    data(){
        return{
            id: this.$route.params.id
        }
    },
    created(){
        // ejecutamos el mapActions
        this.getTarea(this.id)

    },
    methods:{
         ...mapActions(['getTarea','editarTarea'])
    },
    computed:{
        ...mapState(['tarea'])
    },
    validations:{
         tarea:{
             //accedemos a su propiedad
             nombre:{required}
         }
    }
}
</script>