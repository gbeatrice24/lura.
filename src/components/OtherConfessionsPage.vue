<template>
  <div
    class="min-h-screen flex flex-col items-center bg-pastelgreen text-white"
  >
    <div
      class="space-y-15 opacity-0 transition-opacity duration-2000"
      :class="{ 'opacity-100': loaded }"
    >
      <h1 class="text-[96px] font-bold pt-20">lura.</h1>
    </div>

    <p v-if="errorMessage" class="mt-4 text-red-100">{{ errorMessage }}</p>

    <div
      class="columns-1 sm:columns-2 lg:columns-3 xl:columns-5 gap-6 w-full mx-auto px-6 pb-12"
    >
      <ConfessionCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        class="mb-6 break-inside-avoid"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ConfessionCard from "./ConfessionCard.vue";

const loaded = ref(false);
const errorMessage = ref("");
const posts = ref<any[]>([]);
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function getPosts() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    posts.value = await response.json();
  } catch {
    errorMessage.value = "Error while getting posts.";
  }
}

onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true;
  });

  getPosts();
});
</script>
