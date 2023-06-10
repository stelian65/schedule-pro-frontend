<script setup>
import { ref, onBeforeMount , computed , provide} from 'vue';
import { useRouter } from 'vue-router';
import store from '../../store';
import axios from 'axios';

const router = useRouter();
const token = store.getters.getToken;
const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}
const tasks = ref([])
const selectedTask = ref(null);
const currentPage = ref(1);
const itemsPerPage =10;

onBeforeMount(async () => {
  try {
   axios.get('/api/task/all',config).then((response)=>{
    tasks.value = response.data
  })
  } catch (error) {
    console.error(error);
  }
});

const maxPage = computed(() => Math.ceil(tasks.value.length / itemsPerPage));

const paginatedTasks = computed( () => {
  const start = (currentPage.value -1 ) * itemsPerPage
  const end = start + itemsPerPage;
  return tasks.value.slice(start,end)

})

const notificationCount = ref(10)
 

  function handleClick(task){
  selectedTask.value = task;
  router.push({
    name:'Task',
    params:{id:task.id}
  })
  }


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
          <th class="text-left text-white ">Title</th>
          <th class="text-right text-white">Status</th>
          <th class="text-right text-white">User assign</th>
          <th class="text-right text-white">Due Date</th>
          <th class="text-right text-white">Total worked hours</th>

        </tr>
      </thead>
      <tbody>
        <tr 
        v-for="task in paginatedTasks" :key="task.title"
        @click="handleClick(task)"
        >
          <td class="text-left">{{ task.title }}</td>
          <td class="text-right">{{task.taskStatus}}</td>
          <td class="text-right" v-if="task.userAssign !== null" >{{ task.userAssign }}</td>
          <td class="text-right" v-else >No user assigned</td>
          <td class="text-right">{{ task.dueDate }}</td>
          <td class="text-right">{{ task.totalHours }}</td>
        </tr>  
      </tbody>  
    </q-markup-table>
    <div>
      <q-pagination class="pagination q-pa-sm" v-model="currentPage" :max="maxPage"></q-pagination>
    </div> 
  </div>
</template>

<style>
.pagination{
  justify-content: center;
}

.inbox-button {
  position: relative;
}

.notification {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
</style>