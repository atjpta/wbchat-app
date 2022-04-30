<template>
  <div class="h-16 bg-gray-100/30 text-xl">
      <div class="flex justify-between p-4">
            <!-- bên trái -->
            <div class="hover:text-teal-500 hover:scale-125 duration-300">
                <h1> WBCHAT</h1>
            </div>
            <!-- giữa -->
            <div class="flex pl-28"> 
                <div class="px-6 hover:text-teal-500 hover:scale-125 duration-300 ">
                   <router-link to="/chatroom">
                        <button>
                            <i class="fa-solid fa-house"></i>
                            Trang chủ
                        </button>
                   </router-link>
                </div>
                <div class="px-6 hover:text-teal-500 hover:scale-125 duration-300">
                    <router-link to="/trang2">
                        <button>
                            <i class="fa-solid fa-circle-question"></i>
                            Giúp đỡ
                        </button>
                   </router-link>
                </div>
                <div class="px-6 hover:text-teal-500 hover:scale-125 duration-300 ">
                    <router-link to="/">
                        <button>
                            <i class="fa-solid fa-phone"></i>
                            Liên hệ
                        </button>
                   </router-link>
                </div>
            </div>
            <!-- bên phải -->
            <div v-if="!currentUser" class="flex"> 
                <div class="pr-3 hover:text-teal-500 hover:scale-125 duration-300">
                    <router-link to="/login" class=""><button>Đăng nhập</button></router-link>
                </div>
                <div class="border-r-2"></div>

                <div class="px-3 hover:text-teal-500 hover:scale-125 duration-300">
                    <router-link to="/login" class="">Đăng kí</router-link>
                </div>
            </div>

            <div v-if="currentUser" class="flex"> 
                <div class="pr-3 hover:text-teal-500 hover:scale-125 duration-300">
                    <router-link to="/profile" class=""><button>{{ currentUser.name }}</button></router-link>
                </div> 
                <div class="border-r-2"></div>
                <div class="px-3 hover:text-teal-500 hover:scale-125 duration-300">
                    <button @click.prevent="handleLogout" > Đăng xuất </button>
                </div>
            </div>

      </div>
  </div>
</template>

<script>

import { mapState, mapActions } from "pinia";
import { useStore } from "@/stores/store";

export default {
	computed: {
		...mapState(useStore, {
			currentUser: "user",
		}),
	},
	methods: {
		...mapActions(useStore, ["logout", "loadAuthState"]),

		handleLogout() {
			this.logout();
			this.$router.push({ name: "login" });
		},
	},
	created() {
		this.loadAuthState();
	},
};
</script>

<style>

</style>