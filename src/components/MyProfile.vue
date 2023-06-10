<template>
    <q-page padding>
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h5 text-white">Informații personale</div>
  
          <div class="text-white">Nume: {{ user.lastName }}</div>
          <div class="text-white">Prenume: {{ user.firstName }}</div>
          <div class="text-white">Studii: {{ user.education }}</div>
          <div class="text-white">Experiența: {{ user.experience }} ani</div>
          <div class="text-white">Email: {{ user.email }}</div>
          <div class="text-white">Număr de telefon: {{ user.phoneNumber }}</div>
        </q-card-section>
      </q-card>
      <q-expansion-item icon="add" label="Tasks" class="my-card text-white">
    <q-list>
    <q-item v-for="task in user.tasks" :key="task.id" class="task-list-item">
      <q-item-section>
        <q-item-label class="text-h5 text-white">{{ task.name }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-white">Status: {{ task.status }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label class="text-white">Due date: {{ task.dueDate }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</q-expansion-item>




      <div class="months-container">
        <q-card class="my-card" v-for="(month, index) in months" :key="index">
          <q-card-section>
            <div class="text-h5 text-white">{{ month.name }}</div>
  
            <div class="text-h6 text-white">Ore lucrate: {{ month.workedHours }} / {{ month.totalHours }}</div>
            <q-circular-progress :value="Math.round(calculateProgress(month.workedHours, month.totalHours))" :max-value="month.totalHours" color="white" show-value size="80px" class="q-ma-md"/>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const user = ref({
    firstName: 'John',
    lastName: 'Doe',
    education: 'Master în Informatică',
    experience: 5,
    email: 'john.doe@example.com',
    phoneNumber: '0123456789',
    tasks: [
      { id: 1, name: 'Creare pagină de profil', status: 'Finalizat', dueDate: '2023-06-15' },
      { id: 2, name: 'Dezvoltare API', status: 'În progres', dueDate: '2023-06-30' }
    ]
  });
  
  const months = ref([
    { name: 'Ianuarie', workedHours: 120, totalHours: 168 },
    { name: 'Februarie', workedHours: 100, totalHours: 160 },
    { name: 'Martie', workedHours: 130, totalHours: 176 },
    { name: 'Aprilie', workedHours: 110, totalHours: 168 },
    { name: 'Mai', workedHours: 120, totalHours: 168 },
    { name: 'Mai', workedHours: 120, totalHours: 168 },
    { name: 'Mai', workedHours: 120, totalHours: 168 },
    { name: 'Mai', workedHours: 120, totalHours: 168 },
    { name: 'Mai', workedHours: 120, totalHours: 168 },
    { name: 'Mai', workedHours: 120, totalHours: 168 },
    { name: 'Mai', workedHours: 120, totalHours: 168 },
    { name: 'Mai', workedHours: 120, totalHours: 168 },
    // Restul lunilor...
  ]);
  
  const completedTasksCount = ref(user.value.tasks.filter(task => task.status === 'Finalizat').length);
  const totalTasksCount = ref(user.value.tasks.length);
  
  const calculateProgress = (workedHours, totalHours) => (workedHours / totalHours) * 100;
  </script>
  
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
  