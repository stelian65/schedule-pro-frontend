<script setup>
import{ useRouter} from 'vue-router'

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
      >
        <q-item-section avatar>
          <q-icon name='healing' />
        </q-item-section>
        <q-item-section>Request for sick leave</q-item-section>
      </q-item> 
      <q-item
        clickable
        v-ripple
      >
         <q-item-section avatar>
          <q-icon name="sunny" />
        </q-item-section>
        <q-item-section>Request for vacation</q-item-section>
      </q-item> 
      <q-item
        clickable
        v-ripple
        @click="handleRegister"
        >
            <q-item-section avatar>
                <q-icon  name="add" />
            </q-item-section>
            <q-item-section>Register an employe</q-item-section>
      </q-item>    
  </q-list>

</template>

<style scoped></style>