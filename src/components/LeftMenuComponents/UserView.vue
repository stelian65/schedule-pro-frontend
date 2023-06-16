<script setup>
import { ref, onBeforeMount , computed } from 'vue';
import { useRouter } from 'vue-router';
import store from '../../store';
import axios from 'axios';

const router = useRouter();
const token = store.getters.getToken;
const role = store.getters.getUser.role;
const config = {
    headers:{
            Authorization: 'Bearer ' + token
     }
}
const users = ref([])
const selectedUser = ref(null);
const currentPage = ref(1);
const itemsPerPage =10;

onBeforeMount(async () => {
  try {
   axios.get('/api/user/all',config).then((response)=>{
    users.value = response.data
  })
  } catch (error) {
    console.error(error);
  }
});

const maxPage = computed(() => Math.ceil(users.value.length / itemsPerPage));

const paginatedUsers= computed( () => {
  const start = (currentPage.value -1 ) * itemsPerPage
  const end = start + itemsPerPage;
  return users.value.slice(start,end)

})

 
  function handleClick(user){
    selectedUser.value = user
  router.push({
    name:'UserProfile',
    params:{id:selectedUser.value.id}
  })
  }

  


</script>

<template>
  <div class="q-pa-md">
    <q-markup-table flat bordered>
      <thead class="bg-primary">
        <tr>
          <th colspan="3">
            <div class="row no-wrap items-center">
              <q-img
                style="width: 70px"
                :ratio="1"
                class="rounded-borders"
                src="src\assets\task.jpeg"
              />

              <div class="text-h4 q-ml-md text-white">Users</div>
            </div>
          </th>
        </tr>
        <tr>
          <th class="text-left text-white ">Firstname</th>
          <th class="text-right text-white">Lastname</th>
          <th class="text-right text-white">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr 
        v-for="user in paginatedUsers" :key="user.id"
        @click="handleClick(user)"
        >
          <td class="text-left">{{ user.firstname }}</td>
          <td class="text-right">{{ user.lastname  }}</td>
          <td class="text-right">{{ user.email }}</td>
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