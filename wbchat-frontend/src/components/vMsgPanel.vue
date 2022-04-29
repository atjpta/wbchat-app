<template>
  <div class=" mt-2  ">
    
    <!-- phần header -->
    <div class="group flex items-center justify-between rounded-xl bg-gradient-to-l from-sky-500/10 to-teal-500">
        <div :class="[!user ? 'opacity-40': '']" class="flex">
            <img class="m-2 shrink-2 h-12 w-12 rounded-full" src="https://mondaycareer.com/wp-content/uploads/2020/11/anime-l%C3%A0-g%C3%AC-vampire.jpg" alt="" />
            <div class="ltr:ml-3 rtl:mr-3">
                <p class="truncate w-32 text-xl font-medium">{{user.name}}</p>
                <p class="text-sm font-medium">{{user ? "Online" : "Offline"}}</p>
            </div>  
        </div>
      <div class="pr-10 scale-150">
          <i class="fa-solid fa-heart hover:text-rose-600 hover:scale-150 duration-300 cursor-pointer " ></i>
      </div>
    </div>

    <!-- phần nội dung chat -->
    <div id="chat" class=" overflow-auto max-h-[585px] min-h-[585px] bg-gradient-to-r from-sky-500 to-sky-50/70">
      <ul class="">
        <li
          v-for="(message, index) in Store.setMessages"
          :key="index"
        >
            <div :class="[message.fromSelf ? 'flex justify-end': 'flex']">
                  <div class="bg-red-50/50 rounded-xl p-2 mx-4 mt-2 order-last">
                      {{message.message}}
                  </div>
            </div>
          
          
        </li>
      </ul>

    </div>

    <!-- phần nhập tin nhắn -->
    <div class="bg-gradient-to-r from-sky-500/30 to-sky-50/70 pt-3">
        <div>
            
            <form @submit.prevent="sendInput">
                <input v-model="input" placeholder="Your message..."/>
                <button>Send</button>
            </form>

        </div>
        
    </div>

  </div>
</template>

<script setup>
import {onMounted, onUpdated, ref} from 'vue';
import { useStore } from "@/stores/store";

const Store = useStore();

defineProps({
  user: {},
})

const input = ref();

const emit = defineEmits(['input'])

function sendInput(){
  if(input.value){
    emit('input', input.value);
    Store.msg = input.value;
    input.value = "";
    Store.sendMessage();
  }
    
}


onMounted(() => {
  var container = document.getElementById("chat");
  container.scrollTop = container.scrollHeight;

})

onUpdated(() => {
  var container = document.getElementById("chat");
  container.scrollTop = container.scrollHeight;

})
</script>

<style>

</style>