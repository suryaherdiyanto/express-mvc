<script setup lang="ts">
import { onMounted } from 'vue';
import TheHeader from './components/TheHeader.vue';
import { Head } from '@inertiajs/vue3';

const props = defineProps({ name: String });

onMounted(() => {
    console.log('Mounted');
})
</script>
<template>
    <Head title="Test title" />
    <div class="h-screen">
        <TheHeader />
        <div class="container mx-auto flex flex-col justify-center h-3/4">
            <h1 class="text-2xl font-semibold text-center">About Page: {{ props.name }}</h1>
        </div>
    </div>
</template>