<template>
    <div class="min-h-screen bg-pastelgreen text-white">
        <div class="min-h-screen flex flex-col items-center space-y-15 opacity-0 transition-opacity duration-2000"
            :class="{ 'opacity-100': loaded }">
            <h1 class="text-[96px] font-bold pt-20">lura.</h1>

        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
const loaded = ref(false)

onMounted(() => {
    requestAnimationFrame(() => {
        loaded.value = true
    })
})
</script>