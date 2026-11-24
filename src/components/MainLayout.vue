<template>
  <div class="bg-[#070b09] text-white">
    <div
      class="absolute inset-0 z-0 select-none blur-[40px] md:blur-[70px] opacity-30"
    >
      <div
        class="absolute top-[7%] left-[0%] w-[clamp(90px,50vw,200px)] aspect-square rounded-full bg-anger"
      ></div>

      <div
        class="absolute top-[7%] right-[5%] w-[clamp(90px,50vw,200px)] aspect-square rounded-full bg-excitement"
      ></div>

      <div
        class="absolute top-[40%] left-[20%] w-[clamp(90px,50vw,200px)] aspect-square rounded-full bg-joy"
      ></div>

      <div
        class="absolute top-[70%] left-[50%] w-[clamp(90px,50vw,200px)] aspect-square rounded-full bg-fear"
      ></div>

      <div
        class="absolute top-[30%] right-[30%] w-[clamp(90px,50vw,200px)] aspect-square rounded-full bg-sadness"
      ></div>

      <div
        class="absolute top-[90%] left-[5%] w-[clamp(90px,50vw,200px)] aspect-square rounded-full bg-disgust"
      ></div>
      <div
        class="absolute top-[80%] left-[80%] w-[clamp(90px,50vw,200px)] aspect-square rounded-full bg-surprise"
      ></div>
    </div>

    <div
      class="flex flex-col z-10 items-center space-y-15 opacity-0 transition-opacity duration-2000"
      :class="{ 'opacity-100': loaded }"
    >
      <h1 class="text-[150px] font-bold pt-20">lura.</h1>
      <h3 class="text-[36px] italic font-light">
        what would you say if no one knew it was you?
      </h3>
      <p class="w-150">
        say the small thing you've been carrying, minus names or profiles,
        without anyone knowing it's you. the cards feel what you feel.
      </p>
      <button
        @click="goToWritePage"
        class="w-[322px] h-[75px] bg-white text-darkgreen1 text-[28px] font-semibold rounded-full"
      >
        write a confession
      </button>

      <!-- colors section-->
      <section>
        <div class="flex items-center gap-5 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-joy shadow-[0_0_5px_1px_var(--color-joy)]"
            ></div>
            joy
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-anger shadow-[0_0_5px_1px_var(--color-joy)]"
            ></div>
            anger
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-fear shadow-[0_0_5px_1px_var(--color-joy)]"
            ></div>
            fear
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-sadness shadow-[0_0_5px_1px_var(--color-joy)]"
            ></div>
            sadness
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-surprise shadow-[0_0_5px_1px_var(--color-joy)]"
            ></div>
            surprise
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-disgust shadow-[0_0_5px_1px_var(--color-joy)]"
            ></div>
            disgust
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-excitement shadow-[0_0_5px_1px_var(--color-joy)]"
            ></div>
            excitement
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-neutral shadow-[0_0_5px_1px_var(--color-joy)]"
            ></div>
            neutral
          </div>
        </div>
      </section>

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
