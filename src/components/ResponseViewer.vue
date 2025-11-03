<script setup lang="ts">
defineProps<{
  response: any | null,
  loading: boolean
}>();

// Helper (Opsional) untuk format JSON
function formatJson(body: string) {
    try {
        return JSON.stringify(JSON.parse(body), null, 2);
    } catch (e) {
        return body; // Kembalikan teks asli jika bukan JSON valid
    }
}
</script>

<template>
  <div class="p-4 flex flex-col h-full bg-gray-800">
    <h2 class="text-lg font-semibold mb-3 text-white">✅ Server Response</h2>
    
    <div v-if="loading" class="flex items-center justify-center h-full text-gray-400">
        <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">...</svg>
        Memuat...
    </div>

    <div v-else-if="response" class="flex-grow p-2 font-mono text-sm bg-gray-900 text-green-400 overflow-auto border border-gray-700">
      <p class="mb-2">Status: <span class="font-bold" :class="response.status_code >= 400 ? 'text-red-400' : 'text-green-400'">{{ response.status_code }}</span></p>
      
      <p class="mt-4 mb-2">Headers:</p>
      <pre class="whitespace-pre-wrap text-white">{{ response.headers }}</pre>
      
      <p class="mt-4 mb-2">Body:</p>
      <pre class="whitespace-pre-wrap text-white">{{ formatJson(response.body) }}</pre>
    </div>
    
    <div v-else class="text-gray-500">Menunggu request...</div>
  </div>
</template>