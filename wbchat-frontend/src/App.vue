<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Vheader from '@/components/vheader.vue';
import VInputSearch from '@/components/vInputSearch.vue';
import Test from '@/components/test.vue';

</script>

<template>
  <div class="bg-gradient-to-r from-sky-500/10 to-violet-500 min-h-screen">
   <Vheader />
   <!-- <Test /> -->
   <VInputSearch />
   <router-view />   
  </div>
</template>

