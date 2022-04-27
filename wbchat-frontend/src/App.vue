<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Vheader from '@/components/vheader.vue';
import VInputSearch from '@/components/vInputSearch.vue';

</script>

<template>
  <div class="bg-gradient-to-r from-sky-500/10 to-violet-500 min-h-screen">
   <Vheader />
   <VInputSearch />

   <router-view />   
  </div>
</template>

