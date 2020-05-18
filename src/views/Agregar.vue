<template>
    <div>
        <h1>Agregar tarea</h1>
        <form 
            @submit.prevent="agregarTarea($v.nombre.$model)" 
            class="form-inline">

             <div class="input-group-prepend">
                  <span class="input-group-text">Agregar</span>
                <input type="text"  class="form-control" v-model="$v.nombre.$model">
            </div>
            <button class="btn btn-primary ml-2" 
                    type="submit"
                    :disabled="$v.$invalid || carga"
                    >
                    Agregar
            </button>
        </form>
         <small class="text-danger d-block" v-if="!$v.nombre.required">
                Campo requerido
         </small>
         <small class="text-danger d-block" v-if="!$v.nombre.minLength">
                Mínimo 5 carácteres
         </small>
          <!--  {{$v.nombre}}
          {{$v}} -->
     </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'
export default {
    name: 'Agregar',
    data(){
        return {
            nombre: ''
        }
    },
    methods:{
        ...mapActions(['agregarTarea'])
    },
     validations: {
         nombre:{required, minLength:minLength(5)}
     },
     computed:{
         // evitar que se dupliquen la carga
         ...mapState(['carga'])
     }
}
</script>