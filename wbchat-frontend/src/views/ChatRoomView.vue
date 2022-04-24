<template>
  <div class="max-w-3xl min-w-max mx-auto my-10">
    <div class="grid grid-cols-12">
      <!-- ds user -->
      <div class="col-span-3">
        <div class="bg-purple-600/50 rounded-md my-2">
          <p class="text-center text-xl">tất cả</p>
        </div>
        <VListuser :users = "users" @select= "onSelectUser" />

      </div>
      <!-- noi dung chat -->
      <div class="col-span-6" >
        <VMsgPanel 
          v-if = "selectedUser"
          :user = "selectedUser"
          @input = "onMessage"
        />
      </div>
      <!-- ds yêu thich -->
      <div class="col-span-3">
        <div class="bg-purple-600/50 rounded-md my-2">
          <p class="text-center text-xl">Yêu thích</p>
        </div>


      </div>
    </div>
  </div>
</template>

<script setup>


import socket from "../socket"
import {ref, onMounted, onUnmounted} from "vue"
import VListuser from "@/components/vList_user.vue";
import VMsgPanel from "@/components/vMsgPanel.vue";

const users = ref([]);
const selectedUser = ref();

function onMessage(content){
  console.log(content);
  if(content){
    if (selectedUser.value) {
      socket.emit("private message", {
        content,
        to: selectedUser.value.userID_io,
      });
      selectedUser.value.messages.push({
        content,
        fromSelf: true,
      });
    }
  }
  
}

function onSelectUser(user) {
      selectedUser.value = user;
      user.hasNewMessages = false;
}


onMounted(() => {

  // kiểm tra xem bản thân có kết nối chưa
  socket.on("connect", () =>{
    users.value.forEach((user) => {
      if(user.self){
        user.connected = false;
      }
    });
  });

  //khi ngắt kết nối
  socket.on("disconnect", () => {
    users.value.forEach((user) => {
      if (user.self) {
        user.connected = false;
      }
    });
  });

  // lấy tất cả users
  socket.on("GetAllUser", (data) => {
    data.forEach((user) => {
      user.self = user.userID === socket.id;
      initReactiveProperties(user);
    });

    // put the current user first, and then sort by username
    users.value = data.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.name < b.name) return -1;
      return a.name > b.name ? 1 : 0;
    });
  });

  // khi có người khác kết nối vào sẽ tự thêm vào ds
  socket.on("user connected", (user) => {
    initReactiveProperties(user);
    users.value.push(user);
  });

    
  // khi có người khác ngắt kết nối
  socket.on("user disconnected", (id) => {
    for (let i = 0; i < users.value.length; i++) {
      const user = users.value[i];
      if (user.userID_io === id) {
        user.connected = false;
        break;
      }
    }
  });

  // nhận nhắn tin
  socket.on("private message", ({ content, from }) => {
    for (let i = 0; i < users.value.length; i++) {
      const user = users.value[i];
      if (user.userID_io === from) {
        user.messages.push({
          content,
          fromSelf: false,
        });
        if (user !== selectedUser.value) {
          user.hasNewMessages = true;
        }
        break;
      }
    }
  });


  const initReactiveProperties = (user) => {
      user.connected = true;
      user.messages = [];
      user.hasNewMessages = false;
    };

})

onUnmounted(() =>{
  socket.off("connect");
  socket.off("disconnect");
  socket.off("GetAllUser");
  socket.off("user connected");
  socket.off("user disconnected");
  socket.off("private message");
})
</script>

<style>

</style>