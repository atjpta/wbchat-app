<template>
  <div class=" m-24">
    
    <p class="text-5xl text-center my-24">
      <b>
        Chào mừng tới WBCHAT
      </b>
    </p>

    <div class="grid grid-cols-12 justify-between bg-sky-500/50 rounded-3xl h-[450px] my-32">
      <!-- bên trái -->
      <div class="text-left col-span-6 m-20">
        <!-- tiêu đề -->
        <div class="text-3xl pb-10 ">
          WBCHAT
        </div>
        <!-- nội dung -->
        <div class="text-xl w-400 mt-12">
          Nơi chúng ta có thể tán gẫu, tâm sự thoải mái với nhau
        </div>

          <div class="my-20  p-3 text-2xl text-center shadow-violet-700 shadow-md w-72 h-16 rounded-3xl hover:text-blue-900 hover:scale-125 duration-300">
            <router-link to="/login" class=""><button>Đăng nhập ngay</button></router-link>
          </div>

      </div>
      <!-- bên phải -->
      <div class="col-span-6">
        <img class=" w-[850px] h-[450px]" src="https://scontent.fsgn7-1.fna.fbcdn.net/v/t1.15752-9/257596259_897892470855788_6265736314467085893_n.png?stp=dst-png_s2048x2048&_nc_cat=108&ccb=1-5&_nc_sid=ae9488&_nc_ohc=FEXmzxaJsqgAX_CoZ0j&_nc_ht=scontent.fsgn7-1.fna&oh=03_AVI-9-usblK63qWsR5Oxcd62fWAU8eITJe-jDeD2-zMDQQ&oe=62929296">
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