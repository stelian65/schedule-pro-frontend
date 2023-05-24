<script setup>
import { ref } from 'vue';
import axios from 'axios'
import store from '../store'


async function handleLogIn(){
    var token;
    var user ;
    await axios.post("/api/auth/authenticate", {
    username: username.value,
    password: password.value,
    }).then((response) => {
    token =response.data.access_token;
    user = response.data.user;
    store.dispatch('login', { token, user });
    });
  console.log(token);
  console.log(user);
 
}

const username = ref('');
const password = ref('')

</script>

<template>
    <div class ="login-container">
        <div class="image-container">
            <img src="src\assets\logo.png" class="image"/>
        </div>
        <div  class="input-container">
        <q-input color="indigo-12" bg-color="light-blue-1" v-model="username" filled  label="Username" >
            <template v-slot:prepend>
                <q-icon name="person" size="sm"/>
             </template>
        </q-input> 
        <q-input color="indigo-12" bg-color="light-blue-1" v-model="password" type="password" filled  label="Password" >
            <template v-slot:prepend>
                <q-icon name="key" size="sm"/>
             </template>
        </q-input>    
        </div>
        <div class="button-container">
            <q-btn color="primary" @click="handleLogIn" text-color="white" rounded label="Log In" size="100%" padding="15px 35px 15px 35px" width ="100%"/>
        </div>
    </div>
</template>

<style scoped>
.login-container{
    display: grid;
    justify-content: center;
}
.image{
    width: 50%;
}
.input-container{
   padding: 10%;
}

.image-container{
    display: flex;
    justify-content: center;
}

.button-container{
    display: flex;
    justify-content: center;
}
    
</style>