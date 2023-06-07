<script setup>
import {ref} from 'vue'
import{ useRouter} from 'vue-router'
import store from '../../store';
import axios from 'axios';

const router = useRouter();

const password = ref('');
const firstname = ref('');
const lastname = ref('');
const phone = ref('');
const email = ref('');
const studies = ref('');
const experience = ref('');
const persistent = ref(false);
const showMessage = ref(false);
const showloading = ref(false);
const message = ref('')

const token = store.getters.getToken;
const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}


function generatePassword(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function handleGenerate(){
    password.value = generatePassword(12);
}
function checkfield(){
    if(email.value === '' || firstname.value === '' || lastname.value === '' || phone.value === '' || password.value  === '' || experience.value === '' || studies.value === ''){
        return false;
    }
    else return true ;
}


function handleRegister(){
    
    if(!checkfield()){
        showMessage.value = true;
        message.value = "Complete all the fields"
        return;
    }
    
    let body ={
        email:email.value,
        firstname:firstname.value,
        lastname:lastname.value,
        phoneNumber:phone.value,
        password:password.value,
        experience:experience.value,
        studies:studies.value
    }
    showMessage.value= false;
    showloading.value = true;
    axios.post('/api/auth/register',body,config).then(()=>{
        persistent.value= true;
        showloading.value = false;
    }).catch((error)=>{
        message.value = error.response.data;
        showMessage.value = true
        showloading.value = false;
    })

}

function handlePopupClick(){
    router.push('/home');
}

</script>

<template>
    <div class="q-pa-sm example-row-variable-width">
        <div class="row justify-center text-primary">
            <div class="col-12 q-pa-md col-md-3">
                <h5>Register your employee</h5>
            </div>
            <div class="col-12 q-pa-md col-md-3">
                <h5>The data will be sent via email.</h5>
            </div>    
        </div>
        <div class="row justify-center text-primary">
           
        </div>
        <div class="row justify-center">
            <div class="col-12 q-pa-md col-md-3">
                <q-input
                    v-model="firstname" 
                    label="Firstname" 
                    filled 
                />
            </div>
            <div class="col-12 q-pa-md col-md-3">
                <q-input 
                    v-model="lastname" 
                    label="Lastname" 
                    filled 
                />
            </div>         
        </div>
        <div class="row justify-center">
            <div class="col-12 q-pa-md col-md-3">
                <q-input
                    filled
                    v-model="phone"
                    label="Phone Number"
                    mask="07#-### - ####"
                />
            </div>
            <div class="col-12 q-pa-md col-md-3">
                <q-input 
                    v-model ="email" 
                    label="Email" 
                    filled 
                />
            </div>
        </div>
        <div class="row justify-center">
            <div class="col-12 q-pa-md col-md-3">
                <q-input 
                    v-model="password" 
                    label="Password"
                    readonly
                    filled>
                </q-input>
            </div>
            <div class="col-12 q-pa-lg col-md-1">
                <q-btn 
                @click="handleGenerate" 
                round color="primary" 
                icon="autorenew"  
                size="0.75rem" />
            </div>
        </div>
        <div class="row justify-center">
            <div class="col-12 q-pa-md col-md-3">
                <q-input
                    v-model="experience"
                    hint="Experience"
                    filled
                    autogrow
                    :rules="[val=> val.length <=200 || 'Please use maxim 200 characters']"
                />
            </div>
            <div class="col-12 q-pa-md col-md-3">
                <q-input
                v-model="studies"
                :rules="[val=> val.length <=200 || 'Please use maxim 200 characters']"
                    hint="Studies"
                    filled
                    autogrow
                />
            </div>
        </div>
        <div class="row justify-center">
           
            <div class="col-12 q-pa-md col-md-1">
                <q-btn @click="handleRegister" class="bg-primary text-white" label="Register"></q-btn>    
            </div>
            <div class="col-12 q-pa-md col-md-1" v-if="showloading">
                <q-spinner
                    color="primary"
                     size="3em"
                />
            </div>
        </div>
        <div class="row justify-center" v-if="showMessage">
            <div class="col-3 col-md-auto q-mt-md text-red-10" >
                <p > <q-icon size="sm" name="warning"/>{{ message }}</p>
            </div>
        </div>
        <q-dialog v-model="persistent" persistent>
        <q-card class="bg-primary text-white" style="width: 300px">
            <q-card-section>
            <div class="text-h6">Your Employee was registered with success </div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-primary">
            <q-btn @click="handlePopupClick" flat label="OK" v-close-popup />
            </q-card-actions>
        </q-card>
        </q-dialog>
    </div>
    
</template>