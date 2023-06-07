<script setup>
import store from '../store';
defineEmits(['logout','my-profile','my-stats'])

const user = store.getters.getUser
const label = user.firstname + ' ' + user.lastname;

</script>


<template>
<q-btn flat @click="drawer = !drawer" round dense >
    <q-icon name="person"/>
    {{ label }}
    <q-menu 
    anchor="bottom middle" 
    self="top right" 
    transition-show="flip-right"
    transition-hide="flip-left">
    <q-list  style="min-width: 150px" class="text-center">
        <q-item clickable>
            <q-item-section>My Profile</q-item-section>
        </q-item>       
        <q-separator/>
        <q-item clickable @click="$emit('logout')" >
            <q-item-section>Logout</q-item-section>
        </q-item>
    </q-list>
            
    </q-menu>
</q-btn>


</template>


<style scoped>

</style>