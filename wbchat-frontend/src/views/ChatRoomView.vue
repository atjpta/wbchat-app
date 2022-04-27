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
      <div class="col-span-6 "  >
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


import {ref, onMounted, onUnmounted} from "vue"
import VListuser from "@/components/vList_user.vue";
import VMsgPanel from "@/components/vMsgPanel.vue";
import { useStore } from "@/stores/store";
const users = ref([]);
const selectedUser = ref();

const Store = useStore();

function onMessage(content){
  console.log(content);
  if(content){
    if (selectedUser.value) {
      Store.socket.emit("private message", {
        content,
        to: selectedUser.value.userID,
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
  const sessionID = localStorage.getItem("sessionID");

  if (sessionID) {
      Store.socket.auth = { 
        user: Store.user,
        sessionID: sessionID,
      };
      Store.socket.connect();
    }
  
    Store.socket.on("session", ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      Store.socket.auth = { sessionID };
      // store it in the localStorage
      localStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      Store.socket.userID = userID;
    });
     
  // kiểm tra xem bản thân có kết nối chưa
  Store.socket.on("connect", () =>{
    users.value.forEach((user) => {
      if(user.self){
        user.connected = false;
      }
    });
  });

  //khi ngắt kết nối
  Store.socket.on("disconnect", () => {
    users.value.forEach((user) => {
      if (user.self) {
        user.connected = false;
      }
    });
  });

  // lấy tất cả users
  Store.socket.on("GetAllUser", (data) => {
    users.value = data;
    data.forEach((user) => {
      user.messages.forEach((message) => {
          message.fromSelf = message.from === Store.socket.userID;
      });
      user.self = user.userID === Store.socket.userID;

      for (let i = 0; i < users.value.length; i++) {
          const existingUser = users.value[i];
          if (existingUser.userID === user.userID) {
            existingUser.connected = user.connected;
            existingUser.messages = user.messages;
            return;
          }
        }
        // initReactiveProperties(user);
        // users.value.push(user);
    });


    // put the current user first, and then sort by username
    users.value.sort((a, b) => {
      if (a.self) return -1;
      if (b.self) return 1;
      if (a.name < b.name) return -1;
      return a.name > b.name ? 1 : 0;
    });

      console.log(users.value);

  });

  // khi có người khác kết nối vào sẽ tự thêm vào ds
  Store.socket.on("user connected", (data) => {
    for (let i = 0; i < users.value.length; i++) {
      const existingUser = users.value[i];
      if (existingUser.userID === data.userID) {
        existingUser.connected = true;
        return;
      }
    }

    initReactiveProperties(data);
    users.value.push(data);
  });

    
  // khi có người khác ngắt kết nối
  Store.socket.on("user disconnected", (id) => {
    for (let i = 0; i < users.value.length; i++) {
      const user = users.value[i];
      if (user.userID === id) {
        user.connected = false;
        break;
      }
    }
  });

  // nhận nhắn tin
  Store.socket.on("private message", ({ content, from, to }) => {
      for (let i = 0; i < users.value.length; i++) {
        const user = users.value[i];
        const fromSelf = Store.socket.userID === from;
        if (user.userID === (fromSelf ? to : from)) {
          user.messages.push({
            content,
            fromSelf,
          });
        if (user !== selectedUser.value) {
          user.hasNewMessages = true;
        }
        break;
      }
    }
  });


  const initReactiveProperties = (user) => {
      user.messages = [];
      user.hasNewMessages = false;
    };

})

onUnmounted(() =>{
  Store.socket.off("connect");
  Store.socket.off("disconnect");
  Store.socket.off("GetAllUser");
  Store.socket.off("user connected");
  Store.socket.off("user disconnected");
  Store.socket.off("private message");
})
</script>

<style>

</style>