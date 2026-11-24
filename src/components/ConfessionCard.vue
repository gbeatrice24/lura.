<template>
  <div
    :class="[
      'w-full rounded-[28px] from-white/50 to-100%',
      'bg-white/60 text-darkgreen1 p-6 flex flex-col backdrop-blur-md',
      'cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(255,255,255,0.7)]',
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
        @click.stop="handleEcho"
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
  _id?: string;
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

const props = defineProps<{
  post: Post;
}>();

function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const handleEcho = async () => {
  const token = localStorage.getItem("lura_token");

  if (!token) {
    alert("You have to log in to send an echo!");
    return;
  }

  console.log("token from frontend:", `Bearer ${token}`);

  try {
    const response = await fetch(
      `http://localhost:3000/api/posts/${props.post._id}/echo`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok) {
      // ide vmit
      alert("echo successfull <3");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error("Echo error:", error);
  }
};
</script>
