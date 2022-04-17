<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Vheahder from '@/components/vheahder.vue';
import VInputSearch from './components/vInputSearch.vue';
</script>

<template>
  <div class="bg-gradient-to-r from-sky-500/10 to-violet-500 min-h-screen">
   <Vheahder />
   <VInputSearch />
   <router-view />   
  </div>
</template>

