<script setup>
import { ref, onBeforeMount} from 'vue';
import store from '../../store';
import axios from 'axios';

const token = store.getters.getToken;
const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}
const tasks = ref([])
onBeforeMount(async () => {
  try {
   axios.get('/api/task/all',config).then((response)=>{
    tasks.value = response.data
  })
  } catch (error) {
    console.error(error);
  }
});







</script>

<template>
  <div class="q-pa-md">
    <q-markup-table flat bordered>
      <thead class="bg-primary">
        <tr>
          <th colspan="6">
            <div class="row no-wrap items-center">
              <q-img
                style="width: 70px"
                :ratio="1"
                class="rounded-borders"
                src="src\assets\task.jpeg"
              />

              <div class="text-h4 q-ml-md text-white">Tasks</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left">Title</th>
          <th class="text-right">Status</th>
          <th class="text-right">User assign</th>
          <th class="text-right">Due Date</th>
          <th class="text-right">Total worked hours</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.title">
          <td class="text-left">{{ task.title }}</td>
          <td class="text-right">{{task.taskStatus}}</td>
          <td class="text-right" v-if="task.userAssign !== null" >{{ task.userAssign }}</td>
          <td class="text-right" v-else >No user assigned</td>
          <td class="text-right">{{ task.dueDate }}</td>
          <td class="text-right">{{ task.totalHours }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<style>
</style>