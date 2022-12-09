<template>
<div>
  <VInputSearch />
  <div class="mx-auto w-4/5 ">
    <div class="flex  justify-center">
      <!-- ds user -->
      <div class="">
        <div class="bg-primary text-center rounded-xl m-5">
          <p class="">tất cả</p>
        </div>
        <VListuser :users = "Store.findUsers" @select= "onSelectUser" />
      </div>
      <!-- noi dung chat -->
      <div class="">
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

onUnmounted(() =>{
		Store.socket.off("msg-recieve");
})
</script>

<style>

</style>