<template>
  <div
    :class="[
      'w-[270px] rounded-[28px] from-white/50 to-100%',
      'text-darkgreen1 p-6 min-h-[200px] flex flex-col justify-between backdrop-blur-md',
      getGradientClass(post.primaryEmotion),
      randomDirection,
    ]"
  >
    <h2 class="text-lg leading-relaxed flex-1">{{ post.title }}</h2>

    <p class="text-left text-sm leading-relaxed flex-1 flex pb-5 pt-4">
      {{ post.content }}
    </p>

    <div class="mt-3 flex items-center justify-between gap-2">
      <p v-if="post.createdAt" class="text-center text-xs text-gray-500">
        {{ formatDate(post.createdAt) }}
      </p>

      <button
        class="bg-white shadow-[0_0_20px_rgba(255,255,255,1)] text-green-950 rounded-2xl w-14 text-[11px] font-semibold p-0.75"
      >
        echo
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Emotion {
  label: string;
  score: number;
}

interface Post {
  title: string;
  id?: string | number;
  content: string;
  embedding: number[];
  emotions?: Emotion[];
  primaryEmotion?: string;
  clusterId?: number | null;
  createdAt?: string | Date;
}

const emotionGradients: Record<string, string> = {
  joy: "to-joy/30",
  sadness: "to-sadness/30",
  anger: "to-anger/30",
  fear: "to-fear/30",
  excitement: "to-excitement/30",
  disgust: "to-disgust/30",
  surprise: "to-surprise/30",
  neutral: "to-neutral/30",
};

const gradientDirections = [
  "bg-gradient-to-t",
  "bg-gradient-to-tr",
  "bg-gradient-to-r",
  "bg-gradient-to-br",
  "bg-gradient-to-b",
  "bg-gradient-to-bl",
  "bg-gradient-to-l",
  "bg-gradient-to-tl",
];

const randomDirection =
  gradientDirections[Math.floor(Math.random() * gradientDirections.length)];

const getGradientClass = (emotion?: string) => {
  if (!emotion) return "to-neutral";
  return emotionGradients[emotion.toLowerCase()] || "to-neutral";
};

defineProps<{
  post: Post;
}>();

function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
</script>
