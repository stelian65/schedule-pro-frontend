<script setup>
import axios from 'axios';
import {ref} from 'vue';
import store from '../../store';
import{ useRouter} from 'vue-router'

const router = useRouter();
const date= ref(null);
const hours=ref(null)
const task = ref(null);
const options = ref(null);
const persistent = ref(false);
const showMessage = ref(false);
const message = ref("");
const user= store.getters.getUser
const token = store.getters.getToken;
const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}


axios.get('/api/task?username='+store.getters.getUser.username,config).then((response) =>{
     options.value =response.data
} );

function handleSubmit(){
    if(task.value === null||date.value === null || hours.value == null){
        message.value = 'Complete all the fields'
        showMessage.value = true
        return;
    }
    if(hours.value >12){
        message.value = 'Invalid number of hours,maxim 12 hours'
        showMessage.value = true
        return;
    }
    let parts = date.value.split('-');
    let year = Number(parts[0]); 
    let month = Number(parts[1]);
    let day = Number(parts[2]);
    let body ={
        
            userId:user.id,
            taskName:task.value,
            day:day,
            month:month,
            year:year,
            hours:hours.value  
        }
    axios.post('/api/clocking',body,config
    ).then(() =>persistent.value = true).catch(()=>{
        showMessage.value = true;
        message.value = "Something went wrong! Try again later."
    })
    

}

function handlePopupClick(){
    router.push('/home');
}

function handleReset(){
    date.value =null;
    hours.value = null;
    task.value=null;
}



</script>

<template>

    <div class="q-pa-lg  example-row-variable-width">
            <div class="row justify-center">
        <div class="col-3 q-ma-md">
            <q-input @focus="showMessage=false" v-model="date"  filled type="date" hint="From" />
        </div>
        <div class="col-3 q-ma-md">
            <q-input
            @focus="showMessage=false"
        v-model.number="hours"
        hint="hours"
        mask="##"
        label="Record time"
        />
        </div>
        </div>
        <div class="row justify-center">
            <div class="col-3 col-md-3 q-ma-sm text-center">
                <q-select
                @focus="showMessage=false"
                filled
                v-model="task"
            :options="options"
            label="Task"
            :v-model="task"
        />
            </div>
        </div>
        <q-separator/>
        <div class="row justify-center q-pa-lg q-mt-lg">
            <div class="col-2 col-md-2">
                <q-btn @click="handleSubmit" class="bg-primary text-white" label="Submit"></q-btn>
            </div>
            <div class="col-2 col-md-auto ">
                <q-btn @click="handleReset" class="bg-primary text-white" label="Reset"></q-btn>
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
            <div class="text-h6">Your clocking was registered with success </div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-primary">
            <q-btn @click="handlePopupClick" flat label="OK" v-close-popup />
            </q-card-actions>
        </q-card>
        </q-dialog>
   
    </div>
</template>

<style scoped>
</style>