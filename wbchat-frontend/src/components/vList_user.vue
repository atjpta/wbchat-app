<template>
  <div id="list" class="overflow-y-auto overflow-x-hidden bg-fuchsia-100/20 min-h-[650px] max-h-[650px] rounded-xl ">
    <div  
      v-for="user in users"
      :key="user.id"
      @click="click(user)"
    >
      <div :class="[chon(user.id) ? 'bg-purple-500/30 rounded-lg':'']">
        <div :class="[!user.onl ? 'opacity-40 border-r-8': 'border-r-8 border-emerald-500']" class="cursor-pointer group flex items-center rounded-xl duration-300 hover:scale-125 hover:bg-gray-800/30 hover:text-blue-800 ">
          <img class="m-2 shrink-2 h-12 w-12 rounded-full" src="../../public/imgs/avatar.jpg" alt="" />
          <div class="ltr:ml-3 rtl:mr-3">
            <p class="truncate w-32 text-xl font-medium">{{user.name}}</p>
            <p class="text-sm font-medium">{{user.onl ? "Online" : "Offline"}}</p>
          </div>  
        </div>
      </div>
      
    </div>

    

  </div>
</template>

<script setup>
import { array } from "yup/lib/locale";
import { useStore } from "@/stores/store";
import {ref, onMounted} from 'vue';
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
  if(Store.user){
    if(id == Store.user.id)
    return true;
  else false
  }
  
}


defineProps({
  users: array,
})

onMounted(() => {
  Store.getAllUser();
  Store.socketConnet();
  Store.recieveMessage();
  Store.socketRecieveMessage();
  Store.socketOnl();
  Store.userOff();
  Store.userOnl();
  Store.socketRefresh();
  
})

</script>

<style>

</style>