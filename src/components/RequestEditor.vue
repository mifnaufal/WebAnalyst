<script setup lang="ts">
import { ref } from 'vue';
import { parseRawRequest, type ParsedRequest } from '../utils/requestParser';

const rawRequestInput = ref('');
const errorMsg = ref<string | null>(null);

// Definisikan event yang akan dikirim ke parent
const emit = defineEmits<{
  (e: 'send-request', payload: ParsedRequest): void
}>();

function handleSendRequest() {
    errorMsg.value = null;
    const parsed = parseRawRequest(rawRequestInput.value);

    if (!parsed) {
        errorMsg.value = '⚠️ Format Request Tidak Valid. Pastikan ada Method, Path, dan Header Host.';
        return;
    }

    // Kirim data yang sudah di-parse ke parent (Home.vue)
    emit('send-request', parsed);
}
</script>

<template>
  <div class="p-4 flex flex-col h-full bg-gray-900">
    <h2 class="text-lg font-semibold mb-3 text-white">✍️ Request HTTP (Raw)</h2>
    
    <div v-if="errorMsg" class="bg-red-900 text-red-300 p-2 text-sm mb-3 rounded">
        {{ errorMsg }}
    </div>

    <textarea 
      v-model="rawRequestInput"
      class="flex-grow p-4 font-mono text-sm bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 resize-none placeholder-gray-400"
      placeholder="GET /users/1 HTTP/1.1&#10;Host: api.target.com&#10;..."
    ></textarea>

    <button 
        @click="handleSendRequest"
        :disabled="!rawRequestInput.trim()"
        class="mt-4 p-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded disabled:bg-blue-800 disabled:opacity-50 transition duration-150"
    >
      ⚡ Kirim Request & Analisis
    </button>
  </div>
</template>