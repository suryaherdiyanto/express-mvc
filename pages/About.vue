<script setup lang="ts">
import { onMounted } from 'vue';
import TheHeader from './components/TheHeader.vue';

onMounted(() => {
    console.log('Mounted');
})
</script>
<template>
    <div class="h-screen">
        <TheHeader />
        <div class="container mx-auto flex flex-col justify-center h-3/4">
            <h1 class="text-2xl font-semibold text-center">About Page</h1>
        </div>
    </div>
</template>