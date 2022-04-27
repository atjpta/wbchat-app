<template>
  <div id="list" class="overflow-y-auto overflow-x-hidden bg-fuchsia-100/20 min-h-[650px] max-h-[650px] rounded-xl ">
    
    <div  
      v-for="user in users"
      :key="user.user.id_user"
      @click="$emit('select', user)"
    >
      <!-- 1 user.user  -->
      <div :class="[!user.connected ? 'opacity-40': '']" class="cursor-pointer group flex items-center rounded-xl duration-300 hover:scale-125 hover:bg-gray-800/30 hover:text-blue-800 ">
        <img class="m-2 shrink-2 h-12 w-12 rounded-full" src="https://mondaycareer.com/wp-content/uploads/2020/11/anime-l%C3%A0-g%C3%AC-vampire.jpg" alt="" />
        <div class="ltr:ml-3 rtl:mr-3">
          <p class="truncate w-32 text-xl font-medium">{{user.user.name}}</p>
          <p class="text-sm font-medium">{{user.connected ? "Online" : "Offline"}}</p>
        </div>  
      </div>
      
    </div>

    

  </div>
</template>

<script setup>
import { array } from "yup/lib/locale";

defineProps({
  users: array,
})


</script>

<style>

</style>