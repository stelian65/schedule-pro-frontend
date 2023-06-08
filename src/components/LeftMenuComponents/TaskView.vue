<script setup>
import {ref, onBeforeMount} from 'vue'
import axios from 'axios';
import store from '../../store';
import {useRouter} from 'vue-router';



const router =useRouter();
const props = defineProps({
    id:Number
})

const readonly = ref(true);
const persistent =ref(false);
const token = store.getters.getToken;
const task = ref(null);
const title = ref('');
const dueDate = ref('');
const description =ref('');
const status =ref('');
const userAssign = ref('');
const totalHours = ref(0);


const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}


onBeforeMount(async () => {
  try {
   await axios.get("/api/task/by?id="+props.id,config).then((response) =>{
        task.value = response.data;
        title.value = task.value.title;
        dueDate.value =task.value.dueDate;
        status.value = task.value.taskStatus;
        description.value = task.value.description;
        userAssign.value = task.value.userAssign;
        totalHours.value =task.value.totalHours
        console.log(task.value);
        })
  } catch (error) {
   await router.push("/home");
  }
});



function handleClickDelete(){
    persistent.value = true;

}

async function handleYesClick(){
  await axios.delete("/api/task/delete?id="+task.value.id,config);
   router.push("/home");
}



</script>


<template>
    <div class="q-pa-md">
        <q-card class="bg-primary text-white"  style="width: 100%;">
        <q-card-section class="text-h5 text-end">

            <div class="row item-center justify-between q-pa-md no-wrap">
                <div class="col-4 q-ma-md ">
                  <strong>Title: </strong>  {{ title }}
                </div>
                <div  class="col-  jutify-end">
                    <q-btn round flat icon="edit"/>
                    <q-btn @click="handleClickDelete" round flat icon="delete"/>
                </div>
            </div>
        </q-card-section>
        <q-separator size="3px"/>
        <q-card-section class="text-h6 justify-end">
            <div clas="row item-center q-pa-md no-wrap">
                <div class="col-4">
                    <strong>Due Date : </strong>{{ dueDate }}
                </div>
                <br/>
                <div class="col-2">
                   <strong> Status: </strong>{{ status }}
                </div>
            </div>
        </q-card-section>
        <q-card-section class="text-h6 justify-end">
            <div clas="row item-center q-pa-md no-wrap">
                <div class="col-4">
                    <strong>Due Date : </strong>{{ dueDate }}
                </div>
                <br/>
                <div v-if="userAssign!== null" class="col-4">
                    <strong>User assigned: </strong>{{ userAssign }}
                </div>
                <div v-else class="col-4">
                    <strong>User assigned: </strong> Unassigned
                </div>
                <br/>
                <div class="col-4">
                    <strong>Total worked hours : </strong>{{ totalHours }}
                </div>
            </div>
        </q-card-section>
        
        <q-card-section>
            <div class="col-4 text-h6">
                    Description:
            </div>
            <q-separator/>
            <div class="q-pa-lg bg-white text-black" style="min-height: 150px;">
               {{ description }}
            </div>
        </q-card-section>
        </q-card>
        <q-dialog v-model="persistent" persistent>
        <q-card class="bg-primary text-white" style="width: 300px">
            <q-card-section>
            <div class="text-h6 text-center">Are you sure you want to delete this task?</div>
            </q-card-section>
            <q-card-actions align="center" class="bg-white text-primary">
            <q-btn flat label="no" v-close-popup />
            <q-btn @click="handleYesClick" flat label="Yes" v-close-popup />
            </q-card-actions>
        </q-card>
        </q-dialog>
    </div>
</template>
