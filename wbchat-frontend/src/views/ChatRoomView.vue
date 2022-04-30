<template>
<div>
  <VInputSearch />
  <div class="min-w-max mx-3.5 my-10">
    <div class="grid grid-cols-12">
      <!-- ds user -->
      <div class="col-span-3">
        <div class="bg-purple-600/50 rounded-md my-2">
          <p class="text-center text-xl">tất cả</p>
        </div>
        <VListuser :users = "Store.findUsers" @select= "onSelectUser" />
      </div>
      <!-- noi dung chat -->
      <div class="col-span-9 "  >
        <VMsgPanel 
          :user = "selectedUser"
        />
      </div>
     
    </div>
  </div>
</div>
</template>

<script setup>


import {ref, onMounted, onUnmounted, onUpdated} from "vue"
import VListuser from "@/components/vList_user.vue";
import VMsgPanel from "@/components/vMsgPanel.vue";
import { useStore } from "@/stores/store";
import VInputSearch from "../components/vInputSearch.vue";

const users = ref([]);
const selectedUser = ref();
const Store = useStore();

function onSelectUser(user) {
      selectedUser.value = user;
      Store.selectUser = selectedUser.value
}

onMounted(() => {
  
})

onUnmounted(() =>{
		Store.socket.off("msg-recieve");
})
</script>

<style>

</style>