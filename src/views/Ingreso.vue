<template>
    <div>
        <h1>Ingreso</h1>
        <hr>
        <form @submit.prevent="ingresoUsuario({  email:$v.email.$model,  pass:$v.pass.$model})">
            <input type="email"  v-model="$v.email.$model" class="form-control my-2" placeholder="Ingrese un email">
            <small class="text-danger" v-if="!$v.email.required">Campo requerido</small>
            <small class="text-danger" v-if="!$v.email.email">Email no válido</small>


            <input type="password" v-model="$v.pass.$model" class="form-control my-2" placeholder="Ingrese una contraseña">
            <small class="text-danger" v-if="!$v.pass.required">Campo requerido</small>
            <small class="text-danger" v-if="!$v.pass.minLength">La contraseña debe tener minimo 6 carácteres</small>

            <button type="submit" 
                    class="btn btn-success btn-block mt-2"
                    :disabled="$v.$invalid"
                    >
                    Acceder
            </button>

        </form>
         <p v-if="error" class="text-center text-danger">Usuario o Contraseña Incorrecta</p>
       <!-- <p v-if="error === 'auth/user-not-found'" class="text-center text-danger">Usuario Incorrecto</p>
        <p v-if="error === 'auth/wrong-password'" class="text-center text-danger">Contraseña Incorrecta</p> -->
        
        <!--{{$v.email}}-->
        <br>
        <!-- {{$v.pass}} -->
    </div>
</template>

<script>
// Utilizamos  el mapActions
import { mapActions, mapState } from "vuex";
import { required, minLength, email} from 'vuelidate/lib/validators'

export default {
    name: 'Ingreso',
    data(){
        return{
            // relacionamos campos del formulario
            email: '',
            pass: ''

        }
    },
    methods:{
        ...mapActions(['ingresoUsuario'])
    },
    computed:{
        ...mapState(['error'])
    },
    validations:{
        email:{required, email},
        pass:{required, minLength:minLength(6)}
    }
}
</script>