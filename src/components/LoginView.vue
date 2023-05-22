<script setup>
import { ref } from 'vue'
import LoginInput from './Buttons/LoginInput.vue'
const footer = ref(false);
function footerHandler(){
    footer.value = false;
}
</script>

<template>
   <q-layout view="hHh lpR fFf">
    <div class ="inputs-container">
        <LoginInput
        icon="person"
        label="Username"
        type="text"
        />
        <LoginInput
        icon="key"
        label="Password"
        type="password"
        />
    </div>
    <q-footer elevated class="bg-grey-8 text-white" v-if="footer">
        <q-banner inline-actions class="text-white bg-red">
            Your credentials are wrong ! Please Try Again !
            <template v-slot:action>           
                <q-btn  round color="red" icon="close" @click="footerHandler"/>
            </template>
        </q-banner>
        </q-footer>
    </q-layout>
</template>

<style scoped>
.inputs-container{
    display: grid;
    max-width: 100%;
    max-height: 100%;
    justify-content: center;
}
    
</style>