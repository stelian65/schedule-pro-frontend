<script setup>
import{ useRouter} from 'vue-router'
import store from '../store';

const role = store.getters.getUser.role;
const router = useRouter();
 async function handleRecordWorkClick(){
   await router.push('/record-time');
}

async function handleTasksClick(){
   await router.push('/tasks');
}

async function handleRegister(){
  await router.push('/register')
}

async function handleRequest(){
  await router.push('/request')
}

async function handleUsers(){
  await router.push('/users')
}



</script>

<template>
    <q-list separator bordered class="rounded-borders text-blue-10">
        <q-item
        clickable
        v-ripple
        @click="handleRecordWorkClick"
        >
            <q-item-section avatar>
                <q-icon  name="work" />
            </q-item-section>
            <q-item-section>Record working time</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        @click="handleTasksClick"
      >
        <q-item-section avatar>
          <q-icon name="task" />
        </q-item-section>
        <q-item-section>Tasks</q-item-section>
      </q-item> 
      <q-item
        clickable
        v-ripple
        @click="handleRequest"
      >
        <q-item-section avatar>
          <q-icon name='description' />
        </q-item-section>
        <q-item-section>Request for vacation/sick leave</q-item-section>
      </q-item> 
      <q-item
        clickable
        v-ripple
        @click="handleRegister"
        v-if=" role=== 'ADMIN'"
        >
            <q-item-section avatar>
                <q-icon  name="add" />
            </q-item-section>
            <q-item-section>Register an employe</q-item-section>
      </q-item>   
      <q-item
        clickable
        v-ripple
        @click="handleUsers"
        v-if=" role=== 'ADMIN'"
        >
            <q-item-section avatar>
                <q-icon  name="person" />
            </q-item-section>
            <q-item-section>Users</q-item-section>
      </q-item>     
  </q-list>

</template>

<style scoped></style>