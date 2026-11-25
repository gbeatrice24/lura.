<template>
  <div class="relative min-h-screen bg-[#070b09] text-white overflow-x-clip">
    <div
      class="absolute inset-0 z-0 select-none blur-[40px] md:blur-[70px] opacity-30 pointer-events-none overflow-hidden"
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

    <header
      class="fixed top-0 inset-x-0 h-20 z-40 bg-[#070b09]/70 backdrop-blur-md border-b border-gray-800 transition-all duration-500"
      :class="
        isScrolled
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-full pointer-events-none'
      "
    ></header>

    <h1
      @click="scrollToTop"
      class="fixed left-6 z-50 text-[100px] font-bold leading-none origin-top-left will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      :class="
        isScrolled
          ? 'top-5 translate-x-0 translate-y-0 scale-[0.36] cursor-pointer'
          : 'top-22  translate-x-[calc(50vw-50%-1.5rem)] translate-y-[60px] scale-100'
      "
    >
      lura.
    </h1>
    <div
      class="relative z-10 flex flex-col items-center pt-[380px] space-y-15 opacity-0 transition-opacity duration-2000"
      :class="{ 'opacity-100': loaded }"
    >
      <h3 class="text-[36px] italic font-light">
        what would you say if no one knew it was you?
      </h3>
      <p class="w-150 text-gray-400">
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
              class="w-[7px] aspect-square rounded-full bg-anger shadow-[0_0_5px_1px_var(--color-anger)]"
            ></div>
            anger
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-fear shadow-[0_0_5px_1px_var(--color-fear)]"
            ></div>
            fear
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-sadness shadow-[0_0_5px_1px_var(--color-sadness)]"
            ></div>
            sadness
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-surprise shadow-[0_0_5px_1px_var(--color-surprise)]"
            ></div>
            surprise
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-disgust shadow-[0_0_5px_1px_var(--color-disgust)]"
            ></div>
            disgust
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-excitement shadow-[0_0_5px_1px_var(--color-excitement)]"
            ></div>
            excitement
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-[7px] aspect-square rounded-full bg-neutral shadow-[0_0_5px_1px_var(--color-neutral)]"
            ></div>
            neutral
          </div>
        </div>
      </section>

      <div
        class="flex flex-col items-center justify-center mt-auto pb-30 space-y-7"
      >
        <h3 class="text-[20px] italic font-light">see todays confessions</h3>
        <button
          @click="goToOthers"
          class="cursor-pointer gentle-jump transition-all duration-500 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.75)]"
        >
          <img src="../assets/ArrowDown.svg" class="w-6 h-auto pastelgreen" />
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
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import OtherConfessionsPage from "./OtherConfessionsPage.vue";
import VueScrollTo from "vue-scrollto";

const router = useRouter();

const loaded = ref(false);
const isScrolled = ref(false);
const confessionsSection = ref<HTMLElement | null>(null);
let sectionObserver: IntersectionObserver | null = null;

onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true;
  });

  sectionObserver = new IntersectionObserver(
    (entries) => {
      isScrolled.value = entries[0].isIntersecting;
    },
    { threshold: 0, rootMargin: "0px 0px 100px 0px" },
  );

  if (confessionsSection.value) {
    sectionObserver.observe(confessionsSection.value);
  }
});

onUnmounted(() => {
  sectionObserver?.disconnect();
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

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
