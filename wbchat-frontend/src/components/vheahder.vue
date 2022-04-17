<template>
  <div class="h-16 bg-gray-100/30 text-xl">
      <div class="flex justify-between p-4">
            <!-- bên trái -->
            <div class="">
                <h1> WBCHAT</h1>
            </div>
            <!-- giữa -->
            <div class="flex pl-28"> 
                <div class="px-6 ">
                   <router-link to="/">
                        <button>
                            <i class="fa-solid fa-house"></i>
                            Trang chủ
                        </button>
                   </router-link>
                </div>
                <div class="px-6">
                    <router-link to="/">
                        <button>
                            <i class="fa-solid fa-circle-question"></i>
                            Giúp đỡ
                        </button>
                   </router-link>
                </div>
                <div class="px-6">
                    <router-link to="/">
                        <button>
                            <i class="fa-solid fa-phone"></i>
                            Liên hệ
                        </button>
                   </router-link>
                </div>
            </div>
            <!-- bên phải -->
            <div class="flex"> 
                <div class="pr-3 border-r-2">
                    <router-link to="/login" class="bg-teal-500/50 rounded-lg p-2 shadow-md"><button>Đăng nhập</button></router-link>
                </div>
                <div class="pl-3">
                    <router-link to="/login" class="bg-teal-500/50 rounded-lg p-2 shadow-md">Đăng kí</router-link>
                </div>
            </div>

      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>