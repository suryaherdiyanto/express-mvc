<script setup lang="ts">
import { onMounted } from 'vue';
import TheHeader from './components/TheHeader.vue';
import { Link } from "@inertiajs/vue3";

onMounted(() => {
    console.log('Mounted');
})
</script>
<template>
    <div class="h-screen">
        <TheHeader />
        <div class="container mx-auto flex flex-col justify-center h-3/4">
            <h1 class="text-2xl font-semibold text-center">Hello 2</h1>
            <Link href="/about">Go to About</Link>
        </div>
    </div>
</template>