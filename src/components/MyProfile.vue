
<script setup>
import { ref,onBeforeMount } from 'vue';
import store from '../store';
import axios from 'axios';
const token = store.getters.getToken;
const userId = store.getters.getUser.id;

const firstName = ref('')
const lastName = ref('')
const experience = ref('')
const email = ref('');
const phoneNumber = ref('')
const studies = ref('')
const requests = ref([]);
const tasks = ref([]);
const worked = ref([]);
const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}

onBeforeMount(async () => {
  if (!userId || !token) {
    return;
  }
  try {
   await axios.get("/api/user/profile?userId="+userId,config).then((response) =>{
          let data = response.data;
          firstName.value = data.firstname;
          lastName.value = data.lastname;
          experience.value = data.experience;
          phoneNumber.value = data.phoneNumber;
          studies.value = data.studies;
          email.value = data.email;
          requests.value = data.request;
          tasks.value = data.tasks
          worked.value = data.worked;
          console.log(worked);
        });
  } catch (error) {
    console.log(error);
  }
});



const calculateProgress = (workedHours, totalHours) => (workedHours / totalHours) * 100;
</script>

<template>
    <q-page padding>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5 text-white">Personal Information</div>
  
          <div class="text-white">First Name: {{ firstName}}</div>
          <div class="text-white">Last Name: {{ lastName }}</div>
          <div class="text-white">Studies: {{ studies }}</div>
          <div class="text-white">Experience: {{ experience }} ani</div>
          <div class="text-white">Email: {{ email }}</div>
          <div class="text-white">Phone Number: {{ phoneNumber }}</div>
        </q-card-section>
      </q-card>
      <q-expansion-item icon="add" label="Tasks" class="my-card text-white">
    <q-list>
    <q-item v-for="(task,index) in tasks" :key="index" class="task-list-item">
      <q-item-section>
        <q-item-label class="text-h5 text-white">{{ task.title }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-white">Status: {{ task.status }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-white">Due date:{{ task.dueDate }} </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</q-expansion-item>




      <div class="months-container">
        <q-card class="my-card" v-for="(work, index) in worked" :key="index">
          <q-card-section>
            <div class="text-h5 text-white">{{ work.month }}</div>
  
            <div class="text-h6 text-white">Worked hours: {{ work.hours }} / 160</div>
            <q-circular-progress :value="Math.round(calculateProgress(work.hours, work.totalHours))" :max-value="work.totalHours" color="white" show-value size="80px" class="q-ma-md"/>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </template>
  
 
  <style scoped>
  .my-card {
    background-color: #1976d2; /* Culore primary */
    color: white;
    margin: 20px;
  }
  
  .months-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  </style>
  