<script setup lang="ts">
defineProps<{
  recommendation: string,
  loading: boolean
}>();
</script>

<template>
  <div class="p-4 bg-gray-700 h-full overflow-auto">
    <h2 class="text-lg font-semibold mb-2 text-white">🤖 Rekomendasi AI</h2>
    
    <div class="p-3 bg-gray-800 text-white text-sm min-h-[50px]">
        <div v-if="loading && recommendation.includes('menganalisis')">
            <p class="text-yellow-400 animate-pulse">{{ recommendation }}</p>
        </div>
        <pre v-else class="whitespace-pre-wrap font-sans">{{ recommendation }}</pre>
    </div>
  </div>
</template>