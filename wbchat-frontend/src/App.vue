<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Vheader from '@/components/vheader.vue';

</script>

<template>
  <div class=" min-h-screen" style=" background-repeat: unset; background-image: url(https://get.wallhere.com/photo/sunlight-anime-planet-water-reflection-sky-stars-clouds-Earth-blue-moonlight-horizon-atmosphere-cloud-ocean-wave-computer-wallpaper-atmosphere-of-earth-outer-space-wind-wave-meteorological-phenomenon-208522.jpg)">
   <Vheader />
   <router-view />   
  </div>
</template>

