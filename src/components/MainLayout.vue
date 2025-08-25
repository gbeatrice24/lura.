<template>
    <div class="min-h-screen bg-pastelgreen text-white">
        <div class="min-h-screen flex flex-col items-center space-y-15 opacity-0 transition-opacity duration-2000"
            :class="{ 'opacity-100': loaded }">
            <h1 class="text-[150px] font-bold pt-20">lura.</h1>
            <h3 class="text-[36px] italic font-light">what would you say if no one knew it was you?</h3>
            <button class="w-[322px] h-[75px] bg-white text-darkgreen1 text-[28px] font-semibold rounded-full">write a
                confession</button>
            <div class="flex flex-col items-center justify-center mt-auto pb-30 space-y-7">
                <h3 class=" text-[32px] italic font-light">see todays confessions.</h3>
                <button @click="goToOthers">
                    <img src="../assets/ArrowDown.svg" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loaded = ref(false)

onMounted(() => {
    requestAnimationFrame(() => {
        loaded.value = true
    })
})

function goToOthers() {
    console.log("others pressed")
    router.push('/others')
}
</script>