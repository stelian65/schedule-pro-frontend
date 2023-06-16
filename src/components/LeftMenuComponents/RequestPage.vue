<script setup>
import { ref } from 'vue';
import store from '../../store';
import axios from 'axios'
import{ useRouter} from 'vue-router';

const router = useRouter();
const token = store.getters.getToken;
const userId = store.getters.getUser.id;

const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}

const fromDate = ref("");
const toDate = ref("");
const requestType = ref(null);
const persistent = ref(false);
const message = ref('');
const showMessage = ref(false);

function validateDates(dateFrom, dateTo) {

    let parts = dateFrom.split("-");
    let from = new Date(parts[0], parts[1] - 1, parts[2]);

    parts = dateTo.split("-");
    let to = new Date(parts[0], parts[1] - 1, parts[2]);


    let diffInMs = Math.abs(to - from);


    let diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    let weekendDays = 0;

    for(let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
        if(d.getDay() === 0 || d.getDay() === 6) {
            weekendDays++;
        }
    }

   
    return (diffInDays -weekendDays) <= 21;
}

 async function handleSubmitClick(){
    if(requestType.value !== 'MEDICAL' && !validateDates(fromDate.value,toDate.value)){
            message.value = "Maxim request for vacation is 21 days "
            showMessage.value = true;
            return;
    }
    if(requestType.value=== null){
        message.value = "Request type is required "
        showMessage.value = true;
        return;
    }
     let body={
        userId:userId,
        from:fromDate.value,
        to:toDate.value,
        type:requestType.value
    }
    await axios.post('/api/request',body,config).then(()=>{
        persistent.value = true;

    }).catch((err) => console.log(err))

}

async function handlePopupClick(){
   await router.push('/home');
}

</script>


<template>
    <div class="q-pa-lg  example-row-variable-width">
        <div class="row justify-center">
            <div class="col-3 q-ma-md">
                <q-input 
                @focus="showMessage = false"
                v-model="fromDate"  
                filled type="date" 
                mask="dd/mm/yyyy"
                hint="From" />
            </div>
            <div class="col-3 q-ma-md">
                <q-input
                @focus="showMessage = false"
                    v-model="toDate"  
                    filled type="date" 
                    hint="To"
                />
            </div>
        </div>
        <div class="row justify-center">
            <div class="col-3 q-ma-md">
                <q-select 
                    @focus="showMessage = false"
                    filled v-model="requestType" 
                    :options="['VACATION', 'MEDICAL']" 
                    label="Type"
                    :rules="[val => !!val || 'Request type is required']"
                 />
            </div>
        </div>
        <div class="row justify-center">
            <div class="col-1 q-ma-md">
                <q-btn 
                    @click="handleSubmitClick"
                    filled 
                    label="submit" 
                    class="bg-primary text-white"
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
            <div class="text-h6">Your request was registered with success </div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-primary">
            <q-btn @click="handlePopupClick" flat label="OK" v-close-popup />
            </q-card-actions>
        </q-card>
        </q-dialog>
    
  </template>