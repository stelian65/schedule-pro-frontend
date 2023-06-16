
<script setup>
import { ref, computed,onBeforeMount } from 'vue';
import axios from 'axios';
import store from '../store';


const token = store.getters.getToken;
const userId = store.getters.getUser.id;

const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}
const messages = ref([]);
const showNoMessages = ref(false);

onBeforeMount(async () => {
  try {
   await axios.get('/api/inbox?userId='+userId,config).then((response)=>{
    messages.value = response.data;
    if(messages.value.length === 0){
        showNoMessages.value = true;
    } else{
        showNoMessages.value = false;
    }
  })
  } catch (error) {
    console.error(error);
  }
});

const show = ref(false);
const showConfirmDelete = ref(false);


const unreadMessages = computed(() => {
    if(messages.value== null){
        return 0 ;
    }
    return messages.value.filter(message => !message.shown);
   
});

const markAllAsRead =async () => {
  await axios.put('/api/inbox/read?userId='+userId,config).catch((error)=> console.log(error))
  messages.value = messages.value.map(m => ({...m, shown: true}));
};

const deleteMessage = async (index,id) => {
    await axios.delete('/api/inbox?messageId='+id,config);
    messages.value.splice(index, 1);
};

const deleteAll = async () => {
  messages.value = [];
  await axios.delete('/api/inbox/all?userId='+userId,config);
  showConfirmDelete.value = false;
};

const confirmDeleteAll = () => {
  showConfirmDelete.value = true;
};
</script>



<template>
    <div class="q-pa-md">
      <q-btn round dense flat @click="show = !show">
        <q-badge color="negative" floating floating-icon="fiber_manual_record" :label="unreadMessages.length" align="bottom right" />
        <q-icon name="email" />
      </q-btn>
  
      <q-dialog v-model="show">
        <q-card style="width: 400px">
          <q-card-section class="row items-center justify-between">
            <div class="text-h6">Messages</div>
            <div>
              <q-btn flat round dense icon="done_all" @click="markAllAsRead">
                <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">
                  Mark all as read
                </q-tooltip>
              </q-btn>
              <q-btn flat round dense icon="delete" @click="confirmDeleteAll">
                <q-tooltip anchor="bottom middle" self="top middle" :offset="[0, 20]">
                  Delete all
                </q-tooltip>
              </q-btn>
            </div>
          </q-card-section>
          <q-card-section style="max-height: 300px; overflow-y: auto;">
            <q-list bordered separator>
              <q-item v-for="(message,index) in messages" :key="index">
                <q-item-section>
                  <p>{{message.message}}</p>
                </q-item-section>
                <q-item-section side>
                  <q-btn flat round dense icon="delete" class="bg-primary text-white" @click="deleteMessage(index,message.id)" />
                </q-item-section>
              </q-item>
              <q-item v-if ="showNoMessages" class="text-center">
                <q-item-section>
                    <p>No messages</p>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
  
      <q-dialog v-model="showConfirmDelete">
        <q-card>
          <q-card-section>
            <div class="text-h6">Are you sure you want to delete all messages?</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn class="bg-primary" label="Delete" @click="deleteAll" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
