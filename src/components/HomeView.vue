<script setup>
import { logout } from '../utils/logout';
import {ref} from 'vue';
import { useRouter} from 'vue-router';
import  ProfileMenu from '../components/ProfileMenu.vue';
import LeftMenu  from '../components/LeftMenu.vue';
import InboxMessage from './InboxMessage.vue';

const leftDrawerOpen = ref(false)
const router = useRouter();


function toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }

 async function handleLogout(){
  
    await logout();
    router.push('/login');
    
 
}
async function handleMyProfile (){
  await logout();
    router.push('/my-profile');
}


</script>

<template>
<q-layout view="hHh lpR fFf">

<q-header elevated class="bg-primary text-white">
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
    <q-toolbar-title>
    <strong>SCHEDULE PRO</strong>   
    </q-toolbar-title>
    <q-space/>
    <InboxMessage/>
    <ProfileMenu
    @logout="handleLogout"
    @my-profile="handleMyProfile"
    />
  </q-toolbar>
</q-header>

<q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" elevated    :width="200"
        :breakpoint="500"
        bordered
        >
  <LeftMenu/>
</q-drawer>

<q-page-container>
  <router-view />
</q-page-container>

</q-layout>
</template>

<style scoped>
    .q-card {
  width: 460px;
}
</style>