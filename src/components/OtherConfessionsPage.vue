<template>
  <Teleport to="body">
    <div class="fixed top-6 right-6 z-50">
      <div v-if="isLoggedIn" class="flex items-center gap-4">
        <span class="text-white/80 font-medium text-sm">
          Hello, <span class="font-bold text-white">{{ currentUsername }}</span>
        </span>
        <button
          @click="logout"
          class="text-xs bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full backdrop-blur-md transition"
        >
          Logout
        </button>
      </div>

      <button
        v-else
        @click="goToAuth"
        class="text-sm bg-white text-darkgreen font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition shadow-lg"
      >
        Signup
      </button>
    </div>
  </Teleport>
  <div class="min-h-screen flex flex-col items-center text-white">
    <div
      v-if="selectedEmotion"
      class="mb-8 flex items-center gap-4 bg-white/20 px-6 py-2 rounded-full backdrop-blur-md"
    >
      <span class="text-sm font-semibold">
        viewing emotion:
        <span class="uppercase tracking-wider ml-1">{{ selectedEmotion }}</span>
        <button
          @click="clearFilter"
          class="text-xs bg-white text-darkgreen px-3 py-1 rounded-full hover:bg-gray-100 transition"
        >
          cancel
        </button>
      </span>
    </div>

    <p v-if="errorMessage" class="mt-4 text-red-100">{{ errorMessage }}</p>

    <div
      class="columns-1 sm:columns-2 lg:columns-3 xl:columns-5 gap-6 max-w-[1800px] mx-auto px-6 pb-4"
    >
      <ConfessionCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @click="filterByEmotion(post.primaryEmotion)"
        class="mb-6 break-inside-avoid cursor-pointer"
      />
    </div>
    <div
      ref="loadMoreTrigger"
      class="w-full h-20 flex justify-center items-center pb-12"
    >
      <span v-if="isLoading" class="text-white opacity-70 animate-pulse"
        >loading more whispers...</span
      >
      <span v-else-if="!hasMore" class="text-white opacity-50"
        >you've reached the end.</span
      >
      <span v-else class="text-white opacity-50"> scroll down for more </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import ConfessionCard from "./ConfessionCard.vue";
import { useRouter } from "vue-router";

const MOCK_POSTS = [
  {
    id: "mock-1",
    title: "3am thoughts",
    content:
      "I still keep the voicemail you left two years ago just so I don't forget what your laugh sounds like.",
    primaryEmotion: "sadness",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-2",
    title: "Small win",
    content:
      "I finally set a boundary with my family today and didn't apologize for it. My hands were shaking the whole time, but I feel ten pounds lighter.",
    primaryEmotion: "joy",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-3",
    title: "Imposter",
    content:
      "Everyone thinks I have my life together because I'm quiet, but I'm mostly just terrified of making the wrong move.",
    primaryEmotion: "fear",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-4",
    title: "Starting over",
    content:
      "Booked a one-way ticket to a city where I know zero people. First time in years I actually can't wait for Monday.",
    primaryEmotion: "excitement",
    createdAt: new Date().toISOString(),
  },
  {
    id: "mock-5",
    title: "Unspoken",
    content:
      "I forgave you so I could move on, not because what you did was okay.",
    primaryEmotion: "anger",
    createdAt: new Date().toISOString(),
  },
];

const router = useRouter();

const loaded = ref(false);
const errorMessage = ref("");
const posts = ref<any[]>([]);
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const page = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);
const selectedEmotion = ref<string | null>(null); // current filter tracker

const loadMoreTrigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
const FETCH_LIMIT = 10;

const isLoggedIn = ref(false);
const currentUsername = ref("");

async function getPosts() {
  if (isLoading.value || !hasMore.value) return;

  isLoading.value = true;

  try {
    let url = `${apiBaseUrl}/api/posts?page=${page.value}&limit=${FETCH_LIMIT}`;
    if (selectedEmotion.value) {
      url += `&emotion=${selectedEmotion.value}`;
    }

    // JUST CHANGE THIS ONE LINE:
    const response = await fetch(url);

    if (!response.ok) throw new Error("Failed to fetch");

    const newPosts = await response.json();

    if (newPosts.length < FETCH_LIMIT) {
      hasMore.value = false;
    }

    posts.value.push(...newPosts);
    page.value++;
  } catch (error) {
    console.error("Error loading posts:", error);
    posts.value = MOCK_POSTS;
    hasMore.value = false;
  } finally {
    isLoading.value = false;
  }
}

function filterByEmotion(emotion: string) {
  if (selectedEmotion.value === emotion) return;

  selectedEmotion.value = emotion;

  posts.value = [];
  page.value = 1;
  hasMore.value = true;

  getPosts();
}

function clearFilter() {
  selectedEmotion.value = null;
  posts.value = [];
  page.value = 1;
  hasMore.value = true;
  getPosts();
}

onMounted(() => {
  requestAnimationFrame(() => {
    loaded.value = true;
  });

  getPosts();

  observer = new IntersectionObserver(
    (entries) => {
      // If the invisible div intersects with the bottom of the screen, load more!
      if (entries[0].isIntersecting) {
        getPosts();
      }
    },
    {
      rootMargin: "100px", // Starts loading 100px before the user actually hits the bottom for a smoother experience
    },
  );

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value);
  }

  const token = localStorage.getItem("lura_token");
  const username = localStorage.getItem("lura_username");

  if (token && username) {
    isLoggedIn.value = true;
    currentUsername.value = username;
  }
});

const goToAuth = () => {
  router.push("/auth");
};

const logout = () => {
  localStorage.removeItem("lura_token");
  localStorage.removeItem("lura_username");
  isLoggedIn.value = false;
  currentUsername.value = "";
};

onUnmounted(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value);
  }
});
</script>
