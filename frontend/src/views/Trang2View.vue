<template>
  <div>
      đây là trang thứ 2 của admin mới truy cập dc
      
      <div>
      <button  class="h-50 w-50 m-auto bg-gray-600/50"
            @click="testapi">
          click để test api admin
      </button>
      </div>
  </div>
</template>

<script setup>

import api from "../services/user.service";
import {onMounted} from 'vue'
async function testapi (){
  await api.testadmin();
}




</script>

<style>

</style>