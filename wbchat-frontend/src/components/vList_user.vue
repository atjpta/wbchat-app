<template>
  <div id="list" class="overflow-y-auto overflow-x-hidden bg-fuchsia-100/20 min-h-[650px] max-h-[650px] rounded-xl ">
    <div  
      v-for="user in users"
      :key="user.id"
      @click="click(user)"
    >
      <!-- 1 user  -->
      <div v-if="!self(user.id)">
      <div :class="[chon(user.id) ? 'border-4 border-black rounded-lg':'']">
        <div :class="[!user ? 'opacity-40': '']" class="cursor-pointer group flex items-center rounded-xl duration-300 hover:scale-125 hover:bg-gray-800/30 hover:text-blue-800 ">
          <img class="m-2 shrink-2 h-12 w-12 rounded-full" src="https://mondaycareer.com/wp-content/uploads/2020/11/anime-l%C3%A0-g%C3%AC-vampire.jpg" alt="" />
          <div class="ltr:ml-3 rtl:mr-3">
            <p class="truncate w-32 text-xl font-medium">{{user.name}}</p>
            <p class="text-sm font-medium">{{user ? "Online" : "Offline"}}</p>
          </div>  
        </div>
      </div>
      </div>
      
    </div>

    

  </div>
</template>

<script setup>
import { array } from "yup/lib/locale";
import { useStore } from "@/stores/store";
import {ref} from 'vue';
const Store = useStore();

const select = ref();

const emit = defineEmits(['select'])

function chon (id){
  if(select.value)
  {
    if(select.value.id == id){
      return true;
    }
  }
  return false
}

function click(user){
    emit('select', user);
    select.value = user;
    Store.recieveMessage();
    
}

function self(id) {
  if(id == Store.user.id)
    return true;
  else false
}


defineProps({
  users: array,
})


</script>

<style>

</style>