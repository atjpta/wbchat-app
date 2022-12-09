
<template>
    <div class="flex justify-center mt-10 ">
        <div class="mx-3">
            <input
            type="text"
            class="rounded-lg p-3 shadow-md w-60"
            placeholder="nhập tên cần tìm"
            v-model="Store.keyFind"
            @input="Store.find"
            @keyup.enter="submit"
            />
        </div>

        <div class="">
            <button class="btn btn-primary btn-outline" type="button" @click="submit">
                <i class="fas fa-search"></i> Tim kiếm
            </button>
        </div>
    </div>
</template>



<script setup>
import { useStore } from "@/stores/store";

const Store = useStore();

</script>
