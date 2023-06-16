<script setup>
import { ref,onBeforeMount } from 'vue';
import store from '../store';
import axios from 'axios';
import { useRouter } from 'vue-router';


const router = useRouter();
const props = defineProps({
    id:Number
})
const token = store.getters.getToken;
const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}

onBeforeMount(async () => {
  try {
   await axios.get("/api/user/editUser?userId="+props.id,config).then((response) =>{
          let data = response.data;
          firstname.value = data.firstname;
          lastname.value = data.lastname;
          experience.value = data.experience;
          phoneNumber.value = data.phoneNumber;
          studies.value = data.studies;
          email.value = data.email;
          role.value = data.role;
        });
  } catch (error) {
    console.log(error);
  }
});
const firstname = ref('');
const lastname = ref('');
const phoneNumber = ref('');
const email = ref('');
const studies = ref('');
const experience = ref('');
const role = ref('');
const showloading = ref(false);
const showMessage = ref(false);
const message = ref('')
const persistent =ref(false)
function checkfield(){
    if(email.value === '' || firstname.value === '' || lastname.value === '' || phoneNumber.value === '' ||  experience.value === '' || studies.value === ''){
        return false;
    }
    else return true ;
}

async function handleSubmit(){
    if(!checkfield()){
        showMessage.value=true;
        message.value='You need to complete all fields'
    }

    const body={
    firstname: firstname.value,
    lastname: lastname.value,
    phoneNumber: phoneNumber.value,
    email: email.value,
    experience: experience.value,
    studies: studies.value,
    role: role.value,
    id: props.id
    }
    showloading.value = true;
    await axios.put('/api/user/edit',body,config).then(()=>{
        showloading.value = false;
        persistent.value =true;
    })

}

async function handlePopupClick(){
   await router.push('/home');
}

</script>

<template>
   <div class="q-pa-sm example-row-variable-width">
        <div class="row justify-center text-primary">
            <div class="col-12 q-pa-md col-md-3">
                <h5>Edit your employee data</h5>
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
                    @focus="showMessage=false"
                />
            </div>
            <div class="col-12 q-pa-md col-md-3">
                <q-input 
                    v-model="lastname" 
                    label="Lastname" 
                    filled 
                    @focus="showMessage=false"
                />
            </div>         
        </div>
        <div class="row justify-center">
            <div class="col-12 q-pa-md col-md-3">
                <q-input
                    filled
                    v-model="phoneNumber"
                    label="Phone Number"
                    mask="07#-### - ####"
                    @focus="showMessage=false"
                />
            </div>
            <div class="col-12 q-pa-md col-md-3">
                <q-input 
                    v-model ="email" 
                    label="Email" 
                    readonly
                    filled 
                    @focus="showMessage=false"
                />
            </div>
        </div>
        <div class="row justify-center">
            <div class="col-12 q-pa-md col-md-3">
                <q-input
                    v-model="experience"
                    hint="Experience"
                    filled
                    autogrow
                    @focus="showMessage=false"
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
                    @focus="showMessage=false"
                />
            </div>
        </div>
        <div class="row justify-center">
            <div class="col-12 q-pa-md col-md-3">
                <q-select
                filled
                :options="['ADMIN','USER']"
                v-model="role"
                @focus="showMessage=false"
                />
            </div>
        </div>
        <div class="row justify-center">
           
            <div class="col-12 q-pa-md col-md-1">
                <q-btn @click="handleSubmit" class="bg-primary text-white" label="Submit"></q-btn>    
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
   </div>
        <q-dialog v-model="persistent" persistent>
        <q-card class="bg-primary text-white" style="width: 300px">
            <q-card-section>
            <div class="text-h6">Your Employee was edited with success </div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-primary">
            <q-btn @click="handlePopupClick" flat label="OK" v-close-popup />
            </q-card-actions>
        </q-card>
        </q-dialog>
</template>