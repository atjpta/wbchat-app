<template>
  <div>
    <div v-if="user">
      <div class="w-full mt-2">
        <!-- phần header -->
        <div
          class="
            group
            flex
            items-center
            justify-between
            rounded-xl
            bg-base-200
          "
        >
          <div :class="[!user.onl ? 'opacity-40' : '']" class="flex">
            <img
              class="m-2 shrink-2 h-12 w-12 rounded-full"
              src="../../public/imgs/avatar.jpg"
              alt=""
            />
            <div class="ltr:ml-3 rtl:mr-3">
              <p class="truncate w-32 text-xl font-medium">{{ user.name }}</p>
              <p class="text-sm font-medium">
                {{ user.onl ? "Online" : "Offline" }}
              </p>
            </div>
          </div>
          <div class="pr-10 scale-150">
            <i
              class="
                fa-solid fa-heart
                hover:text-rose-600 hover:scale-150
                duration-300
                cursor-pointer
              "
            ></i>
          </div>
        </div>

        <!-- phần nội dung chat -->
        <div id="chat" class="overflow-auto max-h-[585px] min-h-[585px]">
          <ul class="">
            <li v-for="(message, index) in Store.setMessages" :key="index">
              <div :class="[message.fromSelf ? 'chat chat-end' : 'chat chat-start']">
                <div class="chat-bubble">
                  {{ message.message }}
                </div>
              </div>
            </li>
          </ul>
        </div>

        <!-- phần nhập tin nhắn -->
        <div class="pb-2">
          <form @submit.prevent="sendInput">
            <div class="grid grid-cols-12">
              <div class="col-span-10 mx-1">
                <input
                  class="w-full h-12 rounded-xl"
                  v-model="input"
                  placeholder=" nhập tin nhắn..."
                />
              </div>
              <div class="col-span-2 mx-1">
                <button
                  class="
                    btn btn-primary btn-outline
                  "
                >
                  <i class="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- khi chưa có chọn user để nói chuyện -->
    <div
      v-if="!user"
      class="
        w-full
        max-h-[585px]
        min-h-[585px]
        flex
        justify-between
        mt-28
        mx-10
      "
    >
      <div></div>
      <div class="">
        <div class="mx-auto">
          <img class="w-96 rounded-2xl" src="../../public/imgs/cuoi.gif" />
        </div>

        <div class="text-2xl text-center mt-5 text-base-200">
          <p>
            Còn chờ gì nữa!!!!
            <br />
            Hãy mau chọn người chat
            <br />
            Để cùng nhau trò chuyện :3
          </p>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, onUnmounted, ref } from "vue";
import { useStore } from "@/stores/store";

const Store = useStore();

defineProps({
  user: {},
});

const input = ref();

const emit = defineEmits(["input"]);

function sendInput() {
  if (input.value) {
    emit("input", input.value);
    Store.msg = input.value;
    input.value = "";
    Store.sendMessage();
  }
}

onMounted(() => {
  var container = document.getElementById("chat");
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
});

onUnmounted(() => {
  Store.socket.off("send-msg");
}),
  onUpdated(() => {
    var container = document.getElementById("chat");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
</script>

<style>
</style>