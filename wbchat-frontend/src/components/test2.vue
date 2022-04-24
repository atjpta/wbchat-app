<template>

<div>
    <button @click="socket.connectSocket()">
        kết nối
    </button>
</div>
  
</template>

<script setup>

import { useStore } from '../stores/store';

const socket = useStore();

</script>

<style>

</style>