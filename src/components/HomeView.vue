<script setup>


</script>

<template>
<div id="q-app">
  <div class="q-pa-md">
      <q-layout view="hHh Lpr lff" container style="height: 300px" class="shadow-2 rounded-borders">
        <q-header elevated class="bg-black">
          <q-toolbar>
            <q-btn flat @click="drawer = !drawer" round dense icon="menu" ></q-btn>
            <q-toolbar-title>Header</q-toolbar-title>
          </q-toolbar>
        </q-header>
  
        <q-drawer bordered
          v-model="drawer"
          :width="200"
          :breakpoint="500"
          show-if-above
        >
          <q-scroll-area class="fit">
            <q-list padding class="menu-list">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="inbox" ></q-icon>
                </q-item-section>
  
                <q-item-section>
                  Inbox
                </q-item-section>
              </q-item>
  
              
            </q-list>
          </q-scroll-area>
        </q-drawer>
  
        <q-page-container>
          <q-page padding>
            
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    </div>
</template>

<style scoped>
    .q-card {
  width: 460px;
}
</style>