<template>
  <div
    class="w-[250px] rounded-[28px] bg-white text-darkgreen1 p-6 min-h-[200px] flex flex-col justify-between"
  >
    <p
      class="text-center text-sm leading-relaxed flex-1 flex items-center justify-center"
    >
      {{ post.content }}
    </p>

    <div
      v-if="post.primaryEmotion"
      class="mt-4 flex items-center justify-center gap-2"
    >
      <span
        class="inline-block bg-pastelgreen text-white text-xs px-3 py-1 rounded-full"
      >
        {{ post.primaryEmotion }}
      </span>
    </div>

    <p v-if="post.createdAt" class="mt-3 text-center text-xs text-gray-500">
      {{ formatDate(post.createdAt) }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Emotion {
  label: string;
  score: number;
}

interface Post {
  id?: string | number;
  content: string;
  embedding: number[];
  emotions?: Emotion[];
  primaryEmotion?: string;
  clusterId?: number | null;
  createdAt?: string | Date;
}

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
