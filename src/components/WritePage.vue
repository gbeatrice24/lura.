<template>
  <div class="min-h-screen bg-pastelgreen text-white">
    <div
      class="min-h-screen flex flex-col items-center px-6 py-12 opacity-0 transition-opacity duration-2000"
      :class="{ 'opacity-100': loaded }"
    >
      <h1 class="text-[96px] font-bold">lura.</h1>
      <h2 class="mt-8 text-[32px] italic font-light text-center">
        write your confession.
      </h2>

      <div class="w-full max-w-2xl mt-10">
        <div
          v-if="dailyPrompt"
          class="mb-8 p-6 bg-white/20 rounded-2xl backdrop-blur-sm text-center border border-white/30"
        >
          <p
            class="text-xs font-bold tracking-widest uppercase opacity-70 mb-2"
          >
            Today's Topic
          </p>
          <p class="text-2xl font-semibold italic text-white leading-relaxed">
            "{{ dailyPrompt }}"
          </p>
        </div>
        <div
          v-else
          class="mb-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm text-center animate-pulse border border-white/10"
        >
          <p class="text-lg opacity-50">loading today's prompt...</p>
        </div>

        <input
          v-model="title"
          type="text"
          placeholder="title your confession..."
          class="w-full h-16 mb-4 rounded-2xl bg-white text-darkgreen1 text-xl px-6 outline-none font-semibold placeholder:font-normal"
        />

        <textarea
          v-model="confession"
          placeholder="type your confession here..."
          class="w-full h-60 rounded-2xl bg-white text-darkgreen1 text-xl p-6 resize-none outline-none"
        />

        <button
          @click="submitConfession"
          class="mt-6 w-full h-[64px] bg-white text-darkgreen1 text-2xl font-semibold rounded-full disabled:opacity-50"
          :disabled="!confession.trim() || isSubmitting"
        >
          {{ isSubmitting ? "submitting..." : "submit confession" }}
        </button>

        <p v-if="errorMessage" class="mt-3 text-center text-red-100">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="mt-3 text-center text-white">
          {{ successMessage }}
        </p>

        <button
          @click="goHome"
          class="mt-4 w-full text-white text-lg underline underline-offset-4"
        >
          back home
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const loaded = ref(false);
const confession = ref("");
const title = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const dailyPrompt = ref("");

onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true;
  });

  fetchDailyPrompt();
});

async function fetchDailyPrompt() {
  try {
    const response = await fetch(`${apiBaseUrl}/api/daily-topic`);
    if (!response.ok) {
      throw new Error("Failed to fetch daily topic");
    }

    const data = await response.json();
    dailyPrompt.value = data.prompt;
  } catch (error) {
    console.error("Error loading daily prompt:", error);
    dailyPrompt.value = "What is on your mind today?";
  }
}

async function submitConfession() {
  const content = confession.value.trim();
  const titleValue = title.value.trim();
  if (!content || !titleValue || isSubmitting.value) {
    return;
  }

  isSubmitting.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await fetch(`${apiBaseUrl}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: titleValue, content: content }),
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    title.value = "";
    confession.value = "";
    successMessage.value = "Confession submitted.";
  } catch {
    errorMessage.value = "Could not submit. Check backend server and endpoint.";
  } finally {
    isSubmitting.value = false;
  }
}

function goHome() {
  router.push("/");
}
</script>
