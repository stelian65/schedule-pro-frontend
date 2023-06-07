<script setup>
import { ref } from 'vue';
import axios from 'axios';
import store from '../store';
import { useRouter} from 'vue-router'


const username = ref('');
const password = ref('')
const buttonRef = ref(HTMLButtonElement);
const userWrong= ref(false);
const router = useRouter();

 async function handleLogIn(){
    var token;
    var user ;
    await axios.post("/api/auth/authenticate", {
    email: username.value,
    password: password.value,
    }).then((response) => {
    token =response.data.access_token;
    user = response.data.user;
    store.dispatch('login', { token, user });
    router.push({ path: '/home' });
    }).catch( (error) =>{
        console.log(error);
        userWrong.value = true
        password.value=''
    })


   
}
    
</script>

<template>
    <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        
        <q-card class="q-pa-md shadow-2 my_card" bordered>
            <q-card-section class="text-center">
            <div><q-img src="src\assets\logo.png" spinner-color="white" style="height: fit-content; "/></div>
          </q-card-section>
          <q-card-section>
            <q-input dense outlined v-model="username" label="Username">
                <template v-slot:prepend>
                <q-icon name="person" size="sm"/>
                </template>
            </q-input>
            <q-input dense outlined class="q-mt-md" v-model="password" type="password" label="Password" @focus="userWrong=false">
                <template v-slot:prepend>
                    <q-icon name="lock" size="sm"/>
                </template>
            </q-input>
          </q-card-section>
          <q-card-section>
            <q-btn ref="buttonRef" @click="handleLogIn()" style="
            border-radius: 8px;" color="indigo-12" rounded size="md" label="Sign in"   no-caps class="full-width" ></q-btn>
          </q-card-section>
           <q-card-section class="text-center q-pt-none q-pb-none" v-if="userWrong">
           <div class="text-red-10 " >
            <p > <q-icon size="sm" name="warning"/>Username or password are wrong </p>
            </div>
           </q-card-section>
        </q-card>
        
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-card {
  width: 460px;
}
</style>