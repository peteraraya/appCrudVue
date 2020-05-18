<template>
<div>
    <h1>Registro de usuarios</h1>
    <hr>
    <form @submit.prevent="crearUsuario({email:$v.email.$model, pass: $v.pass1.$model})">

        <input  type="email"    v-model="$v.email.$model" class="form-control my-2" >
         <small class="text-danger" v-if="!$v.email.required">Campo requerido</small>
         <small class="text-danger" v-if="!$v.email.email">Email no válido</small>

        <input  type="password" v-model="$v.pass1.$model" class="form-control my-2" >
        <small class="text-danger" v-if="!$v.pass1.minLength">La contraseña debe tener minimo 6 carácteres</small>

        <input  type="password" v-model="$v.pass2.$model" class="form-control my-2" >
        <small class="text-danger" v-if="!$v.pass2.sameAs">Las contraseñas deben ser iguales</small>

        <button type="submit" 
                :disabled="!desactivar" 
                class="btn btn-info btn-block" >
                Crear Usuario
        </button>

    </form>
     <p v-if="error === 'auth/email-already-in-use'" class="text-center text-danger">Email ya registrado</p>
</div>
</template>

<script>

// Trabajremos con map
import { mapActions, mapState } from "vuex";
import { required, minLength, email, sameAs} from 'vuelidate/lib/validators'

export default {
    name: 'Registro',
    data(){
        return{
            email: '',
            pass1: '',
            pass2: ''
        }
    },
    methods:{
        ...mapActions(['crearUsuario'])
    },
    computed:{
        ...mapState(['error']),
        desactivar(){         
                //vamos a retornar un verdadero o falso y utilizaremos disbled 
               return  this.pass1 === this.pass2 && this.pass1 != ''// esta realiza la comprobación  
        }
    },
    validations:{
        email:{required, email},
        pass1:{minLength:minLength(6)},
        pass2:{ sameAs:sameAs('pass1')}
    }
}
</script>