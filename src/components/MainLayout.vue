<template>
  <div class="min-h-screen bg-pastelgreen text-white">
    <div
      class="min-h-screen flex flex-col items-center space-y-15 opacity-0 transition-opacity duration-2000"
      :class="{ 'opacity-100': loaded }"
    >
      <h1 class="text-[150px] font-bold pt-20">lura.</h1>
      <h3 class="text-[36px] italic font-light">
        what would you say if no one knew it was you?
      </h3>
      <button
        @click="goToWritePage"
        class="w-[322px] h-[75px] bg-white text-darkgreen1 text-[28px] font-semibold rounded-full"
      >
        write a confession
      </button>
      <div
        class="flex flex-col items-center justify-center mt-auto pb-30 space-y-7"
      >
        <h3 class="text-[32px] italic font-light">see todays confessions.</h3>
        <button @click="goToOthers">
          <img src="../assets/ArrowDown.svg" />
        </button>
      </div>

      <!-- confessions scroll section -->
      <section
        id="others-confessions-section"
        ref="confessionsSection"
        class="relative min-h-screen transition-all duration-1000 ease-out"
      >
        <OtherConfessionsPage />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import OtherConfessionsPage from "./OtherConfessionsPage.vue";
import VueScrollTo from "vue-scrollto";

const router = useRouter();

const loaded = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true;
  });
});

function goToOthers() {
  VueScrollTo.scrollTo("#others-confessions-section", 1100, {
    easing: [0.22, 1, 0.36, 1],
    offset: 0,
    cancelable: true,
  });
}

function goToWritePage() {
  router.push("/write");
}
</script>
