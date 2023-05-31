<script setup>
import {ref} from 'vue';

const date= ref(null);
const hours=ref(null)
const task = ref(null);
let options = ['op1','op2','op3']



</script>

<template>

    <div class="q-pa-md  example-row-equal-width">
        <div class="row">
      <div class="col q-ma-sm">
        <q-input  v-model="date"  filled type="date" hint="From" />
      </div>
      <div class="col q-ma-sm">
        <q-input
      v-model.number="hours"
      hint="hours"
      mask="##"
      label="Record time"
    />
      </div>
    </div>
    <div class="row text-center">
        <div class="col q-ma-sm">
            <q-select
            filled
            v-model="task"
        :options="options"
        label="Task"
        style="width: 250px"
      />
        </div>
    </div>
    <div class="row text-center">
        <div class="col q-ma-sm">
            <q-btn label="Submit"></q-btn>
        </div>
    </div>
   
    </div>
</template>

<style scoped>
</style>