<template>
<div>
  <div v-show="loading" class=" bg-teal-500 rounded-2xl p-2 shadow-md hover:scale-125 duration-300 my-10 mx-auto w-52 h-12 rounded-2xl text-center pt-2">
      <button>
         Đăng nhập
      </button>
  </div>
  <div v-show="!loading" class=" bg-teal-500/50 rounded-2xl p-2 shadow-md duration-300 my-10 mx-auto w-52 h-12 rounded-2xl text-center pt-2">
        <i class="fa-solid fa-spinner animate-spin"></i>
         Đăng nhập
  </div>
  <div>
      <button type="button" class="bg-indigo-500 ..." disabled>
  <svg class="animate-spin h-5 w-5 mr-3 ..." >
    <!-- ... -->
  </svg>
  Processing...
</button>
  </div>
  <div>
    
  </div>
  </div>
</template>

<script>
export default {
    data (){
        return {
            loading: true,
    }
    }

}
</script>

<style>

</style>